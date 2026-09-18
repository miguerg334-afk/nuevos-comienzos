import { submissionClient, unavailable } from "@/lib/public-submissions";
const modalidades = ["Equipa un sueño","Invierte en una vida","Haz crecer una oportunidad","Construyamos el futuro"];
export async function POST(request: Request) {
  const db = submissionClient(); if (!db) return unavailable();
  try { const body = await request.json(); if (!modalidades.includes(body.modalidad) || !body.nombre || !body.email || !body.telefono) return Response.json({error:"Datos incompletos"},{status:400});
    const {error}=await db.from("intereses_donativos").insert({modalidad:body.modalidad,nombre:body.nombre,email:body.email,telefono:body.telefono,mensaje:body.mensaje||""});if(error)throw error;return Response.json({ok:true});
  } catch {return Response.json({error:"No se pudo guardar el interés"},{status:500})}
}
