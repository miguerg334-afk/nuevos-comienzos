"use client";

import { checkFormResponse } from "@/lib/form-response";

import { useRef, useState } from "react";
import { ArrowUpRight, HeartHandshake, LoaderCircle, X } from "lucide-react";

export default function DonacionForm({ modalidad }: { modalidad: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setLoading(true); setStatus(""); setSuccess(false);
    try {
      const response = await fetch("/api/donativos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ modalidad, nombre: form.get("nombre"), email: form.get("email"), telefono: form.get("telefono"), mensaje: form.get("mensaje") }) });
      await checkFormResponse(response);
      setStatus("Recibimos tu interés. Te contactaremos para coordinar el aporte."); setSuccess(true); formElement.reset();
    } catch (error) { setStatus(error instanceof Error ? error.message : "No pudimos registrar tu interés. Inténtalo más tarde."); }
    finally { setLoading(false); }
  }

  return <>
    <button type="button" onClick={() => dialog.current?.showModal()} className="inline-flex items-center gap-5 rounded-xl border border-[#06141b]/15 bg-white/60 px-5 py-3.5 text-sm font-semibold text-[#06141b] transition-colors hover:border-[#06141b] hover:bg-[#06141b] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b6c12]">Quiero aportar <ArrowUpRight size={18} aria-hidden="true" /></button>
    <dialog ref={dialog} aria-label={`Aportar a ${modalidad}`} data-lenis-prevent className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-32px)] max-w-lg overflow-y-auto rounded-[24px] border border-[#ded7c8] bg-[#fbf9f4] p-0 text-[#06141b] shadow-2xl backdrop:bg-[#06141b]/75 backdrop:backdrop-blur-sm" onClick={event => {if(event.target === event.currentTarget){const box=event.currentTarget.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.current?.close();}}}>
      <div className="relative border-b border-[#ded7c8] p-6 sm:p-8"><button type="button" onClick={() => dialog.current?.close()} aria-label="Cerrar formulario" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-slate-500 transition-colors hover:bg-[#eee6d3] hover:text-[#06141b]"><X size={19} /></button><HeartHandshake size={26} className="mb-5 text-[#9b6c12]" strokeWidth={1.5} aria-hidden="true" /><p className="mb-2 text-xs font-medium text-[#9b6c12]">Tu aporte, un nuevo comienzo</p><h2 className="pr-4 font-serif text-3xl leading-tight">{modalidad}</h2><p className="mt-4 text-sm leading-6 text-slate-600">Cuéntanos cómo deseas aportar. Nos comunicaremos contigo para coordinarlo.</p></div>
      <form onSubmit={submit} className="p-6 sm:p-8"><fieldset disabled={loading} className="space-y-4 disabled:opacity-60">{[["nombre","Nombre completo","text","name"],["email","Correo electrónico","email","email"],["telefono","Teléfono","tel","tel"]].map(([name,label,type,autoComplete])=><label key={name} className="block text-sm font-medium">{label}<input required name={name} type={type} autoComplete={autoComplete} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#b77908] focus:ring-4 focus:ring-[#e5ad20]/10"/></label>)}<label className="block text-sm font-medium">Tu propuesta <span className="font-normal text-slate-400">(opcional)</span><textarea name="mensaje" rows={3} placeholder="¿Cómo te gustaría ser parte?" className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-[#b77908] focus:ring-4 focus:ring-[#e5ad20]/10"/></label></fieldset><button disabled={loading} className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#061c24] p-4 text-sm font-semibold text-white transition-colors hover:bg-[#123844] disabled:opacity-60">{loading && <LoaderCircle size={17} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />}{loading ? "Enviando..." : "Enviar interés"}</button>{status&&<p role="status" className={`mt-4 rounded-xl p-4 text-sm leading-6 ${success ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"}`}>{status}</p>}</form>
    </dialog>
  </>;
}
