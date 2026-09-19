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

const institucionesConDescuento = [
  // Liceo Cristiano Emanuel
  "Liceo Cristiano Emanuel",
  "Liceo Cristiano Emmanuel",
  "Liceo Emanuel",
  "Liceo Emmanuel",
  "Colegio Cristiano Emanuel",
  "Colegio Cristiano Emmanuel",
  // Colegio Gimnasio Nueva Colombia
  "Colegio Gimnasio Nueva Colombia",
  "Gimnasio Nueva Colombia",
  "Colegio Nueva Colombia",
  "Gimnasio Nueva Columbia",
  "Colegio Gimnasio Nueva Columbia",
  // Institución Educativa Liceo Genios Huilenses
  "Institución Educativa Liceo Genios Huilenses",
  "Institucion Educativa Liceo Genios Huilenses",
  "I.E. Liceo Genios Huilenses",
  "IE Liceo Genios Huilenses",
  "Liceo Genios Huilenses",
  "Genios Huilenses",
  "Liceo Genios Huilense",
  "Institución Educativa Genios Huilenses",
];

// The same request color is applied in both tabs. Consecutive families never share a color.
const requestIdColors = [
  { red: 0.85, green: 0.92, blue: 1 },
  { red: 0.82, green: 0.96, blue: 0.93 },
  { red: 1, green: 0.93, blue: 0.76 },
  { red: 1, green: 0.86, blue: 0.88 },
  { red: 0.91, green: 0.86, blue: 1 },
  { red: 0.84, green: 0.94, blue: 0.79 },
  { red: 1, green: 0.88, blue: 0.78 },
  { red: 0.84, green: 0.88, blue: 1 },
  { red: 0.8, green: 0.95, blue: 0.98 },
  { red: 0.96, green: 0.89, blue: 0.76 },
];

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
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-CO")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

const institucionesConDescuentoNormalizadas = new Set(institucionesConDescuento.map(normalizar));

function levenshteinDistance(left: string, right: string) {
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let row = 1; row <= left.length; row += 1) {
    const current = [row];
    for (let column = 1; column <= right.length; column += 1) {
      current[column] = Math.min(
        current[column - 1] + 1,
        previous[column] + 1,
        previous[column - 1] + Number(left[row - 1] !== right[column - 1]),
      );
    }
    previous = current;
  }
  return previous[right.length];
}

function descuentoPorInstitucion(procedencia: string): "Sí" | "Revisar" | "No" {
  const nombre = normalizar(procedencia);
  if (institucionesConDescuentoNormalizadas.has(nombre)) return "Sí";

  const esProbable = [...institucionesConDescuentoNormalizadas].some((institucion) => {
    const longestName = Math.max(nombre.length, institucion.length);
    return longestName > 0 && 1 - levenshteinDistance(nombre, institucion) / longestName >= 0.88;
  });
  return esProbable ? "Revisar" : "No";
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

async function colorRequestIds(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  colorIndex: number,
  ranges: Array<{ sheetTitle: string; updatedRange: string | null | undefined }>,
) {
  const metadata = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties(sheetId,title)",
  });
  const sheetIds = new Map(metadata.data.sheets?.map(({ properties }) => [properties?.title, properties?.sheetId]));
  const color = requestIdColors[colorIndex % requestIdColors.length];
  const requests = ranges.flatMap(({ sheetTitle, updatedRange }) => {
    const rows = insertedRows(updatedRange);
    const sheetId = sheetIds.get(sheetTitle);
    if (!rows || sheetId === undefined) return [];
    return [{
      repeatCell: {
        range: { sheetId, ...rows, startColumnIndex: 0, endColumnIndex: 1 },
        cell: {
          userEnteredFormat: {
            backgroundColor: color,
            textFormat: { foregroundColor: { red: 0.04, green: 0.12, blue: 0.16 }, bold: true },
          },
        },
        fields: "userEnteredFormat(backgroundColor,textFormat.foregroundColor,textFormat.bold)",
      },
    }];
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
        descuentoPorInstitucion(estudiante.procedencia),
        "",
      ]),
    },
  });

  await formatInsertedRows(sheets, configuration.spreadsheetId, [
    { sheetTitle: "Solicitudes", updatedRange: solicitudAppend.data.updates?.updatedRange, columns: solicitudesHeaders.length },
    { sheetTitle: "Estudiantes", updatedRange: estudiantesAppend.data.updates?.updatedRange, columns: estudiantesHeaders.length },
  ]);
  const solicitudRows = insertedRows(solicitudAppend.data.updates?.updatedRange);
  if (solicitudRows) {
    await colorRequestIds(sheets, configuration.spreadsheetId, solicitudRows.startRowIndex - 1, [
      { sheetTitle: "Solicitudes", updatedRange: solicitudAppend.data.updates?.updatedRange },
      { sheetTitle: "Estudiantes", updatedRange: estudiantesAppend.data.updates?.updatedRange },
    ]);
  }
}
