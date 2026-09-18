"use client";

import { checkFormResponse } from "@/lib/form-response";

import { useState } from "react";
import { ArrowUpRight, FileCheck2, FileText, LoaderCircle, Upload } from "lucide-react";

const fieldClass = "mt-2 w-full rounded-xl border border-slate-200 bg-[#fbfaf7] px-4 py-3.5 text-sm text-[#06141b] outline-none transition focus:border-[#b77908] focus:bg-white focus:ring-4 focus:ring-[#e5ad20]/10";
const areas = ["Matemáticas", "Ciencias Naturales", "Lengua Castellana", "Inglés", "Ciencias Sociales", "Educación Física", "Tecnología e Informática", "Orientación escolar"];

export default function TalentoForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setLoading(true); setStatus(""); setSuccess(false);
    try {
      const response = await fetch("/api/talento", { method: "POST", body: new FormData(form) });
      await checkFormResponse(response);
      setStatus("Postulación recibida. Gracias por tu interés.");
      setSuccess(true); form.reset(); setFiles({});
    } catch (error) { setStatus(error instanceof Error ? error.message : "No se pudo enviar la postulación. Inténtalo más tarde."); }
    finally { setLoading(false); }
  }

  return (
    <form onSubmit={submit} className="self-start rounded-[28px] border border-[#06141b]/10 bg-white p-6 shadow-[0_16px_60px_-30px_rgba(6,20,27,0.2)] sm:p-9">
      <div className="mb-8 border-b border-slate-100 pb-7"><p className="mb-2 text-xs font-medium text-[#9b6c12]">Nos gustaría conocerte</p><h2 className="font-serif text-3xl">Envía tu postulación</h2><p className="mt-3 text-sm leading-6 text-slate-500">Completa tus datos y adjunta los dos documentos. Todos los campos son obligatorios.</p></div>
      <fieldset disabled={loading} className="space-y-5 disabled:opacity-60"><legend className="mb-5 text-sm font-semibold"><span className="mr-2 text-[#9b6c12]">01</span> Sobre ti</legend><div className="grid gap-5 sm:grid-cols-2">{[["nombre","Nombre completo","text","name"],["email","Correo electrónico","email","email"],["telefono","Teléfono","tel","tel"]].map(([name,label,type,autoComplete])=><label key={name} className={`block text-sm font-medium ${name === "nombre" ? "sm:col-span-2" : ""}`}>{label}<input required name={name} type={type} autoComplete={autoComplete} className={fieldClass}/></label>)}</div><label className="block text-sm font-medium">Área de especialidad<select required name="especialidad" defaultValue="" className={fieldClass}><option value="">Selecciona tu especialidad</option>{areas.map(area=><option key={area}>{area}</option>)}</select></label></fieldset>
      <fieldset disabled={loading} className="mt-9 space-y-4 disabled:opacity-60"><legend className="mb-5 text-sm font-semibold"><span className="mr-2 text-[#9b6c12]">02</span> Tu trayectoria</legend>{[["cv","Hoja de Vida (CV)"],["carta","Carta de Recomendación Pastoral"]].map(([name,label])=><label key={name} className="group block rounded-xl border border-dashed border-[#cfc5b1] bg-[#fbfaf7] p-5 transition-colors focus-within:border-[#b77908] focus-within:ring-4 focus-within:ring-[#e5ad20]/10 hover:bg-[#f6f1e6]"><span className="mb-3 flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-[#9b6c12]">{files[name] ? <FileCheck2 size={19} aria-hidden="true" /> : <FileText size={19} aria-hidden="true" />}</span><span className="text-sm font-medium">{label}</span><Upload size={16} className="ml-auto shrink-0 text-slate-400" aria-hidden="true" /></span><input required name={name} type="file" accept=".pdf,.doc,.docx" onChange={e=>{const file=e.target.files?.[0];e.target.setCustomValidity(file && file.size>2_000_000 ? "El archivo debe pesar como máximo 2 MB." : "");setFiles({...files,[name]:file?.name||""});}} className="block w-full min-w-0 text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-[#eee7d6] file:px-3 file:py-2 file:text-xs file:font-medium file:text-[#74521e]"/></label>)}<p className="text-xs leading-6 text-slate-500">PDF, DOC o DOCX · Máximo 2 MB por archivo.</p></fieldset>
      <button disabled={loading} className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-[#061c24] px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#123844] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b6c12] disabled:cursor-wait disabled:opacity-60">{loading ? <LoaderCircle size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <ArrowUpRight size={18} aria-hidden="true" />}{loading ? "Enviando..." : "Enviar postulación"}</button>
      {status && <p role="status" className={`mt-5 rounded-xl p-4 text-sm leading-6 ${success ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"}`}>{status}</p>}
    </form>
  );
}
