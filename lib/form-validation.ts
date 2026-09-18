export class FormError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

export type Contact = { nombre: string; email: string; telefono: string };
export type Student = { nombre: string; edad: string; grado: string; procedencia: string };
export type Prematricula = { acudiente: Contact; estudiantes: Student[] };
export type Donativo = Contact & { modalidad: string; mensaje: string };
export type Talento = Contact & { especialidad: string };
export const modalidades = ["Equipa un sueño", "Invierte en una vida", "Haz crecer una oportunidad", "Construyamos el futuro"];
export const especialidades = ["Matemáticas", "Ciencias Naturales", "Lengua Castellana", "Inglés", "Ciencias Sociales", "Educación Física", "Tecnología e Informática", "Orientación escolar"];

export function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new FormError("Revisa los datos del formulario.");
  return value as Record<string, unknown>;
}
function field(value: unknown, label: string, max = 150): string {
  if (typeof value !== "string" || !value.trim() || value.trim().length > max || /[\r\n\u0000-\u001f\u007f]/.test(value)) throw new FormError(`Revisa el campo: ${label}.`);
  return value.trim();
}
export function contact(value: unknown): Contact {
  const data = record(value);
  const email = field(data.email, "correo electrónico", 254);
  if (!/^[^\s<>"(),;:\\]+@[^\s<>"(),;:\\]+\.[^\s<>"(),;:\\]+$/.test(email)) throw new FormError("Ingresa un correo electrónico válido.");
  const telefono = field(data.telefono, "teléfono", 40);
  if (!/^[+\d\s().-]{7,40}$/.test(telefono)) throw new FormError("Ingresa un teléfono válido.");
  return { nombre: field(data.nombre, "nombre completo"), email, telefono };
}
export function prematricula(value: unknown): Prematricula {
  const data = record(value);
  if (!Array.isArray(data.estudiantes) || !data.estudiantes.length || data.estudiantes.length > 10) throw new FormError("Registra entre 1 y 10 estudiantes.");
  return { acudiente: contact(data.acudiente), estudiantes: data.estudiantes.map(value => {
    const student = record(value);
    const edad = field(student.edad, "edad", 2);
    const grado = field(student.grado, "grado", 2);
    if (!/^\d+$/.test(edad) || Number(edad) < 5 || Number(edad) > 25 || !["6","7","8","9","10","11"].includes(grado)) throw new FormError("Revisa la edad y el grado del estudiante.");
    return { nombre: field(student.nombre, "nombre del estudiante"), edad, grado, procedencia: field(student.procedencia, "institución de procedencia", 250) };
  }) };
}
export function donativo(value: unknown): Donativo {
  const data = record(value);
  const modalidad = field(data.modalidad, "modalidad");
  if (!modalidades.includes(modalidad)) throw new FormError("Selecciona una modalidad válida.");
  const mensaje = data.mensaje ?? "";
  if (typeof mensaje !== "string" || mensaje.length > 2000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(mensaje)) throw new FormError("La propuesta debe tener máximo 2.000 caracteres.");
  return { ...contact(data), modalidad, mensaje: mensaje.trim() };
}
export function talento(data: FormData): Talento {
  const especialidad = field(data.get("especialidad"), "especialidad");
  if (!especialidades.includes(especialidad)) throw new FormError("Selecciona una especialidad válida.");
  return { ...contact(Object.fromEntries(["nombre","email","telefono"].map(key => [key,data.get(key)]))), especialidad };
}

export async function documentFile(value: FormDataEntryValue | null, label: string): Promise<File> {
  if (!(value instanceof File) || !value.size || value.size > 2_000_000) throw new FormError(`${label}: adjunta un archivo de máximo 2 MB.`);
  const extension = value.name.split(".").pop()?.toLowerCase();
  const types: Record<string, string> = { pdf: "application/pdf", doc: "application/msword", docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" };
  if (!extension || !types[extension] || (value.type && value.type !== types[extension] && value.type !== "application/octet-stream")) throw new FormError(`${label}: solo se permiten PDF, DOC o DOCX.`);
  const bytes = new Uint8Array(await value.slice(0, 8).arrayBuffer());
  const signature = extension === "pdf" ? [37,80,68,70,45] : extension === "doc" ? [208,207,17,224,161,177,26,225] : [80,75,3,4];
  if (!signature.every((byte, i) => bytes[i] === byte)) throw new FormError(`${label}: el contenido no corresponde al formato indicado.`);
  return value;
}

/** Bound the stream before parsing; Content-Length is not trusted. */
export async function readBody(request: Request, maxBytes: number): Promise<Response> {
  if (!request.body) throw new FormError("El formulario está vacío.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) { await reader.cancel(); throw new FormError("Los archivos o datos superan el tamaño permitido.", 413); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const buffer = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { buffer.set(chunk, offset); offset += chunk.length; }
  return new Response(buffer, { headers: { "Content-Type": request.headers.get("content-type") || "application/json" } });
}
export function formErrorResponse(error: unknown): Response {
  if (error instanceof FormError) return Response.json({ error: error.message }, { status: error.status });
  if (error instanceof SyntaxError || error instanceof TypeError) return Response.json({ error: "No pudimos leer el formulario. Revisa los datos e inténtalo de nuevo." }, { status: 400 });
  return Response.json({ error: "No fue posible enviar la solicitud. Inténtalo más tarde." }, { status: 502 });
}
