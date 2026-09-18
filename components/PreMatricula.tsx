"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

type Student = { nombre: string; edad: string; grado: string; procedencia: string };
const emptyStudent = (): Student => ({ nombre: "", edad: "", grado: "", procedencia: "" });
const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900";

export default function PreMatricula({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([emptyStudent()]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setStatus("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/prematricula", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ acudiente: { nombre: form.get("nombreAcudiente"), telefono: form.get("telefono"), email: form.get("email") }, estudiantes: students }) });
      if (!response.ok) throw new Error();
      setStatus("Solicitud recibida. Nos pondremos en contacto contigo.");
      setStudents([emptyStudent()]);
      event.currentTarget.reset();
    } catch { setStatus("No fue posible enviar la solicitud. Inténtalo más tarde."); }
    finally { setLoading(false); }
  }
  return <>
    <button type="button" onClick={() => setOpen(true)} className={`rounded-xl bg-[#e5ad20] font-bold text-[#101820] hover:bg-[#f5c344] ${compact ? "px-4 py-2.5 text-xs" : "px-8 py-3.5 text-sm"}`}>Iniciar tu prematrícula →</button>
    {open && createPortal(<div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div role="dialog" aria-modal="true" aria-labelledby="prematricula-title" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 text-slate-900 shadow-2xl">
        <div className="mb-5 flex justify-between gap-3"><div><h2 id="prematricula-title" className="font-serif text-2xl font-bold">Iniciar tu prematrícula</h2><p className="text-sm text-slate-600">Registra a todos tus estudiantes con los mismos datos de acudiente.</p></div><button type="button" aria-label="Cerrar" onClick={() => setOpen(false)} className="self-start text-2xl">×</button></div>
        <form onSubmit={submit} className="space-y-5">
          <fieldset className="grid gap-3 sm:grid-cols-2"><legend className="mb-3 font-semibold">Datos del acudiente</legend><label>Nombre completo<input required name="nombreAcudiente" className={inputClass}/></label><label>Teléfono<input required name="telefono" type="tel" className={inputClass}/></label><label className="sm:col-span-2">Correo electrónico<input required name="email" type="email" className={inputClass}/></label></fieldset>
          {students.map((student, index) => <fieldset key={index} className="grid gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-2"><legend className="px-1 font-semibold">Estudiante {index + 1}</legend><label>Nombre completo<input required value={student.nombre} onChange={e => setStudents(students.map((s,i) => i === index ? {...s,nombre:e.target.value}:s))} className={inputClass}/></label><label>Edad<input required min="5" max="25" type="number" value={student.edad} onChange={e => setStudents(students.map((s,i) => i === index ? {...s,edad:e.target.value}:s))} className={inputClass}/></label><label>Grado al que aspira<select required value={student.grado} onChange={e => setStudents(students.map((s,i) => i === index ? {...s,grado:e.target.value}:s))} className={inputClass}><option value="">Selecciona un grado</option>{[6,7,8,9,10,11].map(g => <option key={g} value={String(g)}>{g}°</option>)}</select></label><label>Institución de procedencia<input required value={student.procedencia} onChange={e => setStudents(students.map((s,i) => i === index ? {...s,procedencia:e.target.value}:s))} className={inputClass}/></label>{students.length > 1 && <button type="button" onClick={() => setStudents(students.filter((_,i) => i !== index))} className="text-left text-sm text-red-700">Quitar estudiante</button>}</fieldset>)}
          <button type="button" onClick={() => setStudents([...students,emptyStudent()])} className="rounded-lg border border-slate-400 px-4 py-2 font-semibold">+ Agregar otro estudiante</button>
          <div className="flex flex-col gap-2"><button disabled={loading} className="rounded-lg bg-[#06141b] px-5 py-3 font-bold text-white disabled:opacity-50">{loading ? "Enviando..." : "Enviar solicitud"}</button>{status && <p role="status" className="text-sm">{status}</p>}</div>
        </form>
      </div>
    </div>, document.body)}
  </>;
}
