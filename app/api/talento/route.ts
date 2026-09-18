import { submissionClient, unavailable } from "@/lib/public-submissions";
const allowed = ["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
export async function POST(request: Request) {
  const db = submissionClient(); if (!db) return unavailable();
  try { const data=await request.formData();const cv=data.get("cv"),carta=data.get("carta");
    if (!data.get("nombre") || !data.get("email") || !data.get("telefono") || !data.get("especialidad") || !(cv instanceof File) || !(carta instanceof File) || [cv,carta].some(f=>!f.size || f.size>5_000_000 || !allowed.includes(f.type))) return Response.json({error:"Datos o archivos inválidos"},{status:400});
    const id=crypto.randomUUID();
    const upload=async(file:File,name:string)=>{const path=`${id}/${name}`;const {error}=await db.storage.from("postulaciones").upload(path,file,{contentType:file.type,upsert:false});if(error)throw error;return path};
    const cvPath=await upload(cv,"cv"),cartaPath=await upload(carta,"carta");
    const {error}=await db.from("postulaciones").insert({nombre:data.get("nombre"),email:data.get("email"),telefono:data.get("telefono"),especialidad:data.get("especialidad"),cv_path:cvPath,carta_path:cartaPath});if(error)throw error;
    return Response.json({ok:true});
  } catch {return Response.json({error:"No se pudo guardar la postulación"},{status:500})}
}
