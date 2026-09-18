import { submissionClient, unavailable } from "@/lib/public-submissions";
export async function POST(request: Request) {
  const db = submissionClient(); if (!db) return unavailable();
  try {
    const body = await request.json();
    const a = body.acudiente;
    if (!a || typeof a.nombre !== "string" || typeof a.telefono !== "string" || typeof a.email !== "string" || !Array.isArray(body.estudiantes) || !body.estudiantes.length || body.estudiantes.length > 10 || body.estudiantes.some((s: {nombre?:string;edad?:string;grado?:string;procedencia?:string}) => !s.nombre || !s.edad || !["6","7","8","9","10","11"].includes(s.grado || "") || !s.procedencia)) return Response.json({error:"Datos incompletos"},{status:400});
    const { error } = await db.from("prematriculas").insert({ acudiente: a, estudiantes: body.estudiantes });
    if (error) throw error;
    return Response.json({ok:true});
  } catch { return Response.json({error:"No se pudo guardar la solicitud"},{status:500}); }
}
