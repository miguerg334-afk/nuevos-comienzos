import { google } from "googleapis";
import type { Prematricula } from "./form-validation";

const solicitudesHeaders = [
  "ID solicitud",
  "Fecha y hora",
  "Estado",
  "Acudiente",
  "Teléfono",
  "Correo",
  "Cantidad de estudiantes",
  "Último contacto",
  "Observaciones",
];

const estudiantesHeaders = [
  "ID solicitud",
  "N.º estudiante",
  "Nombre completo",
  "Edad",
  "Grado solicitado",
  "Institución de procedencia",
  "Aplica al 10%",
  "Observaciones",
];

const institucionesConDescuento = new Set([
  "liceo cristiano emanuel",
  "colegio gimnasio nueva colombia",
  "institución educativa liceo genios huilenses",
]);

type ServiceAccount = { client_email: string; private_key: string };

function sheetsConfiguration(): { spreadsheetId: string; credentials: ServiceAccount } | null {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  const rawCredentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();

  if (!spreadsheetId || !rawCredentials) return null;

  try {
    const parsed: unknown = JSON.parse(rawCredentials);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid service account JSON");
    const credentials = parsed as Partial<ServiceAccount>;
    if (!credentials.client_email || !credentials.private_key) throw new Error("Incomplete service account JSON");
    return { spreadsheetId, credentials: credentials as ServiceAccount };
  } catch {
    throw new Error("Google Sheets credentials are invalid.");
  }
}

function normalizar(texto: string) {
  return texto.trim().toLocaleLowerCase("es-CO");
}

async function ensureHeaders(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  range: string,
  headers: string[],
) {
  const current = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  if (current.data.values?.[0]?.some(Boolean)) return;
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: { values: [headers] },
  });
}

function insertedRows(updatedRange: string | null | undefined) {
  const rows = [...(updatedRange ?? "").matchAll(/\d+/g)].map(([value]) => Number(value));
  if (rows.length < 2) return null;
  return { startRowIndex: rows[0] - 1, endRowIndex: rows[rows.length - 1] };
}

async function formatInsertedRows(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  ranges: Array<{ sheetTitle: string; updatedRange: string | null | undefined; columns: number }>,
) {
  const metadata = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties(sheetId,title)",
  });
  const sheetIds = new Map(metadata.data.sheets?.map(({ properties }) => [properties?.title, properties?.sheetId]));
  const requests = ranges.flatMap(({ sheetTitle, updatedRange, columns }) => {
    const rows = insertedRows(updatedRange);
    const sheetId = sheetIds.get(sheetTitle);
    if (!rows || sheetId === undefined) return [];
    const range = { sheetId, ...rows, startColumnIndex: 0, endColumnIndex: columns };
    const border = { style: "SOLID" as const, color: { red: 0.82, green: 0.85, blue: 0.84 } };
    return [
      {
        repeatCell: {
          range,
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 1, green: 1, blue: 1 },
              textFormat: { foregroundColor: { red: 0.04, green: 0.12, blue: 0.16 }, bold: false },
            },
          },
          fields: "userEnteredFormat(backgroundColor,textFormat.foregroundColor,textFormat.bold)",
        },
      },
      { updateBorders: { range, top: border, bottom: border, left: border, right: border, innerHorizontal: border, innerVertical: border } },
    ];
  });
  if (requests.length) await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } });
}

/** Writes an operational copy after the applicant's email was accepted. */
export async function appendPrematriculaToSheets(data: Prematricula, emailId: string) {
  const configuration = sheetsConfiguration();
  if (!configuration) {
    console.warn("Google Sheets is not configured; prematrícula was preserved by email.");
    return;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: configuration.credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  await Promise.all([
    ensureHeaders(sheets, configuration.spreadsheetId, "Solicitudes!A1:I1", solicitudesHeaders),
    ensureHeaders(sheets, configuration.spreadsheetId, "Estudiantes!A1:H1", estudiantesHeaders),
  ]);

  const solicitudId = `PRE-${emailId.slice(0, 8).toUpperCase()}`;
  const fecha = new Intl.DateTimeFormat("es-CO", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Bogota",
  }).format(new Date());

  const solicitudAppend = await sheets.spreadsheets.values.append({
    spreadsheetId: configuration.spreadsheetId,
    range: "Solicitudes!A:I",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[
        solicitudId,
        fecha,
        "Nueva",
        data.acudiente.nombre,
        data.acudiente.telefono,
        data.acudiente.email,
        data.estudiantes.length,
        "",
        "",
      ]],
    },
  });

  const estudiantesAppend = await sheets.spreadsheets.values.append({
    spreadsheetId: configuration.spreadsheetId,
    range: "Estudiantes!A:H",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: data.estudiantes.map((estudiante, index) => [
        solicitudId,
        index + 1,
        estudiante.nombre,
        estudiante.edad,
        `${estudiante.grado}°`,
        estudiante.procedencia,
        institucionesConDescuento.has(normalizar(estudiante.procedencia)) ? "Sí" : "No",
        "",
      ]),
    },
  });

  await formatInsertedRows(sheets, configuration.spreadsheetId, [
    { sheetTitle: "Solicitudes", updatedRange: solicitudAppend.data.updates?.updatedRange, columns: solicitudesHeaders.length },
    { sheetTitle: "Estudiantes", updatedRange: estudiantesAppend.data.updates?.updatedRange, columns: estudiantesHeaders.length },
  ]);
}
