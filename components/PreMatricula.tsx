"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { checkFormResponse } from "@/lib/form-response";

type Student = { nombre: string; edad: string; grado: string; procedencia: string };
type Guardian = { nombre: string; telefono: string; email: string };

const emptyStudent = (): Student => ({ nombre: "", edad: "", grado: "", procedencia: "" });
const emptyGuardian = (): Guardian => ({ nombre: "", telefono: "", email: "" });
const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 transition focus:border-[#b77908] focus:ring-4 focus:ring-[#e5ad20]/15";

export default function PreMatricula({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [guardian, setGuardian] = useState<Guardian>(emptyGuardian());
  const [students, setStudents] = useState<Student[]>([emptyStudent()]);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const isComplete = guardian.nombre.trim() && guardian.telefono.trim() && /^\S+@\S+\.\S+$/.test(guardian.email) && students.every((student) => (
    student.nombre.trim() && Number(student.edad) >= 5 && Number(student.edad) <= 25 && student.grado && student.procedencia.trim()
  ));

  function updateStudent(index: number, changes: Partial<Student>) {
    setStatus("");
    setStudents(students.map((student, current) => current === index ? { ...student, ...changes } : student));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isComplete) return;
    setLoading(true);
    setStatus("");
    setSuccess(false);
    try {
      const response = await fetch("/api/prematricula", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ acudiente: guardian, estudiantes: students }),
      });
      await checkFormResponse(response);
      setStatus("Solicitud recibida. Nos pondremos en contacto contigo.");
      setSuccess(true);
      setGuardian(emptyGuardian());
      setStudents([emptyStudent()]);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "No fue posible enviar la solicitud. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  }

  return <>
    <button type="button" onClick={() => setOpen(true)} className={`rounded-xl bg-[#e5ad20] font-bold text-[#101820] hover:bg-[#f5c344] ${compact ? "px-4 py-2.5 text-xs" : "px-8 py-3.5 text-sm"}`}>Iniciar tu prematrícula →</button>
    {open && createPortal(
      <div data-lenis-prevent className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain bg-black/75 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
        <div className="flex min-h-full items-center justify-center py-4">
          <div role="dialog" aria-modal="true" aria-labelledby="prematricula-title" className="w-full max-w-2xl rounded-2xl bg-white p-5 text-slate-900 shadow-2xl sm:p-6">
            <div className="mb-5 flex justify-between gap-3"><div><h2 id="prematricula-title" className="font-serif text-2xl font-bold">Iniciar tu prematrícula</h2><p className="text-base text-slate-600">Registra a todos tus estudiantes con los mismos datos de acudiente.</p></div><button type="button" aria-label="Cerrar" onClick={() => setOpen(false)} className="self-start text-2xl">×</button></div>
            <form onSubmit={submit} className="space-y-5">
              <fieldset className="grid gap-3 sm:grid-cols-2"><legend className="mb-3 font-semibold">Datos del acudiente</legend><label>Nombre completo<input required name="nombreAcudiente" value={guardian.nombre} onChange={(event) => { setStatus(""); setGuardian({ ...guardian, nombre: event.target.value }); }} className={inputClass}/></label><label>Teléfono<input required name="telefono" type="tel" value={guardian.telefono} onChange={(event) => { setStatus(""); setGuardian({ ...guardian, telefono: event.target.value }); }} className={inputClass}/></label><label className="sm:col-span-2">Correo electrónico<input required name="email" type="email" value={guardian.email} onChange={(event) => { setStatus(""); setGuardian({ ...guardian, email: event.target.value }); }} className={inputClass}/></label></fieldset>
              {students.map((student, index) => <fieldset key={index} className="grid gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-2"><legend className="px-1 font-semibold">Estudiante {index + 1}</legend><label>Nombre completo<input required value={student.nombre} onChange={event => updateStudent(index, { nombre: event.target.value })} className={inputClass}/></label><label>Edad<input required min="5" max="25" type="number" value={student.edad} onChange={event => updateStudent(index, { edad: event.target.value })} className={inputClass}/></label><label>Grado al que aspira<select required value={student.grado} onChange={event => updateStudent(index, { grado: event.target.value })} className={inputClass}><option value="">Selecciona un grado</option>{[6, 7, 8, 9].map(grado => <option key={grado} value={String(grado)}>{grado}°</option>)}</select></label><label>Institución de procedencia<input required value={student.procedencia} onChange={event => updateStudent(index, { procedencia: event.target.value })} className={inputClass}/></label>{students.length > 1 && <button type="button" onClick={() => { setStatus(""); setStudents(students.filter((_, current) => current !== index)); }} className="text-left text-sm font-medium text-red-700">Quitar estudiante</button>}</fieldset>)}
              <aside className="rounded-xl border border-[#e5ad20]/30 bg-[#fff8e6] px-4 py-3 text-[#715416]"><p className="font-semibold">Oferta educativa actual: 6.º a 9.º</p><p className="mt-1 text-sm leading-6">Nuestra oferta crecerá progresivamente hacia los grados superiores en los próximos años.</p></aside>
              <button disabled={students.length >= 10 || loading} type="button" onClick={() => { setStatus(""); setStudents([...students, emptyStudent()]); }} className="rounded-lg border border-slate-400 px-4 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50">+ Agregar otro estudiante</button>
              <div className="flex flex-col gap-3"><button disabled={!isComplete || loading} className="rounded-lg bg-[#06141b] px-5 py-3 font-bold text-white transition hover:bg-[#123844] disabled:cursor-not-allowed disabled:opacity-45">{loading ? "Enviando..." : "Enviar solicitud"}</button>{!isComplete && <p className="text-sm text-slate-500">Completa todos los campos para enviar la solicitud.</p>}{status && <p role="status" aria-live="polite" className={`rounded-xl border px-4 py-3 text-base font-semibold ${success ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>{status}</p>}</div>
            </form>
          </div>
        </div>
      </div>, document.body)}
  </>;
}
