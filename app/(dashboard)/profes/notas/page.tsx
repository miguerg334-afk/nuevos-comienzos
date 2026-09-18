"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getSupabase } from "@/lib/supabase";

export interface StudentGrade {
  id: string;
  code: string;
  name: string;
  n1: number | string;
  n2: number | string;
  n3: number | string;
  n4: number | string;
  observation: string;
  grade_id?: string;
}

interface Course {
  id: string;
  name: string;
}

export default function GradebookPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [students, setStudents] = useState<StudentGrade[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Estados para Modales
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newStudentName, setNewStudentName] = useState<string>("");
  const [newStudentCode, setNewStudentCode] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [studentToDelete, setStudentToDelete] = useState<StudentGrade | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const sortStudentsAlphabetically = (list: StudentGrade[]): StudentGrade[] => {
    return [...list].sort((a, b) =>
      a.name.localeCompare(b.name, "es", { sensitivity: "base" }),
    );
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await getSupabase().from("courses").select("*");
      if (error) {
        console.error("Error al obtener cursos:", error);
        return;
      }
      if (data && data.length > 0) {
        setCourses(data);
        setSelectedClass(data[0].id);
      }
    };

    fetchCourses();
  }, []);

  const fetchStudentsAndGrades = useCallback(async (courseId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await getSupabase()
        .from("students")
        .select(
          `
          id,
          code,
          name,
          grades (
            id,
            n1,
            n2,
            n3,
            n4,
            observation
          )
        `,
        )
        .eq("course_id", courseId);

      if (error) throw error;

      if (data) {
        const formattedData: StudentGrade[] = data.map((st: any) => {
          const g = Array.isArray(st.grades) ? st.grades[0] : st.grades;
          return {
            id: st.id,
            code: st.code || "",
            name: st.name || "",
            n1: g?.n1 ?? "",
            n2: g?.n2 ?? "",
            n3: g?.n3 ?? "",
            n4: g?.n4 ?? "",
            observation: g?.observation || "",
            grade_id: g?.id,
          };
        });

        setStudents(sortStudentsAlphabetically(formattedData));
      }
    } catch (err) {
      console.error("Error cargando estudiantes/notas:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchStudentsAndGrades(selectedClass);
    }
  }, [selectedClass, fetchStudentsAndGrades]);

  const handleCellChange = (
    id: string,
    field: keyof StudentGrade,
    value: string,
  ) => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id !== id) return student;

        if (field === "name" || field === "code" || field === "observation") {
          return { ...student, [field]: value };
        }

        const numValue = value === "" ? "" : parseFloat(value);
        return {
          ...student,
          [field]: isNaN(numValue as number) ? "" : numValue,
        };
      }),
    );
  };

  const calculateAverage = (s: StudentGrade): number => {
    const grades = [s.n1, s.n2, s.n3, s.n4].filter(
      (val) => typeof val === "number" && !isNaN(val),
    ) as number[];

    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, curr) => acc + curr, 0);
    return parseFloat((sum / grades.length).toFixed(1));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    try {
      for (const student of students) {
        const { error: studentErr } = await getSupabase()
          .from("students")
          .update({
            name: student.name,
            code: student.code,
          })
          .eq("id", student.id);

        if (studentErr) throw studentErr;

        const gradePayload = {
          student_id: student.id,
          n1: student.n1 === "" ? 0 : Number(student.n1),
          n2: student.n2 === "" ? 0 : Number(student.n2),
          n3: student.n3 === "" ? 0 : Number(student.n3),
          n4: student.n4 === "" ? 0 : Number(student.n4),
          observation: student.observation,
          updated_at: new Date().toISOString(),
        };

        const { error: gradeErr } = await getSupabase()
          .from("grades")
          .upsert(gradePayload, { onConflict: "student_id" });

        if (gradeErr) throw gradeErr;
      }

      setStudents((prev) => sortStudentsAlphabetically(prev));
      setSaveStatus("¡Cambios guardados con éxito!");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error: any) {
      console.error("Error guardando datos:", error);
      setSaveStatus("Error al guardar los cambios");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentCode.trim() || !selectedClass)
      return;

    setIsAdding(true);
    try {
      const { data: studentData, error: studentErr } = await getSupabase()
        .from("students")
        .insert([
          {
            name: newStudentName.trim(),
            code: newStudentCode.trim(),
            course_id: selectedClass,
          },
        ])
        .select()
        .single();

      if (studentErr) throw studentErr;

      if (studentData) {
        await getSupabase().from("grades").insert([
          {
            student_id: studentData.id,
            n1: 0,
            n2: 0,
            n3: 0,
            n4: 0,
            observation: "",
          },
        ]);

        const newStudentObj: StudentGrade = {
          id: studentData.id,
          code: studentData.code,
          name: studentData.name,
          n1: "",
          n2: "",
          n3: "",
          n4: "",
          observation: "",
        };

        setStudents((prev) =>
          sortStudentsAlphabetically([...prev, newStudentObj]),
        );
        setNewStudentName("");
        setNewStudentCode("");
        setIsAddModalOpen(false);
      }
    } catch (err) {
      console.error("Error agregando estudiante:", err);
      alert("No se pudo agregar el estudiante.");
    } finally {
      setIsAdding(false);
    }
  };

  const confirmDeleteStudent = async () => {
    if (!studentToDelete) return;

    setIsDeleting(true);
    try {
      const { error } = await getSupabase()
        .from("students")
        .delete()
        .eq("id", studentToDelete.id);

      if (error) throw error;

      setStudents((prev) => prev.filter((s) => s.id !== studentToDelete.id));
      setStudentToDelete(null);
    } catch (err) {
      console.error("Error eliminando estudiante:", err);
      alert("Error al eliminar el estudiante.");
    } finally {
      setIsDeleting(false);
    }
  };

  // --- CÁLCULO DE TOP Y BOTTOM PROMEDIOS ---
  const sortedByAverage = [...students].sort(
    (a, b) => calculateAverage(b) - calculateAverage(a),
  );
  const top5Students = sortedByAverage.slice(0, 5);
  const bottom5Students = [...sortedByAverage].reverse().slice(0, 5);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans p-6 pb-16">
      {/* HEADER DE ACCIONES */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#06141b] p-5 rounded-2xl border border-white/10 shadow-lg">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#e5ad20]">
            Gestión Académica
          </span>
          <h1 className="text-xl font-serif font-bold text-white mt-0.5">
            Planilla de Calificaciones
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {saveStatus && (
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-lg ${
                saveStatus.includes("Error")
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              {saveStatus}
            </span>
          )}

          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none pr-10 pl-4 py-2.5 bg-[#040c10] border border-white/15 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#e5ad20] transition-colors cursor-pointer"
            >
              {courses.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span>Agregar Estudiante</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#e5ad20] hover:bg-[#f5c344] disabled:opacity-50 text-[#101820] text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
          >
            {isSaving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>

      {/* TABLA DE NOTAS */}
      <div className="bg-[#06141b] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-12 text-center text-white/60 text-xs font-semibold">
            Cargando calificaciones desde la base de datos...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white/70 font-semibold tracking-wider">
                  <th className="p-3.5 border-r border-white/5 w-12 text-center">
                    #
                  </th>
                  <th className="p-3.5 border-r border-white/5 min-w-[200px]">
                    Nombre del Estudiante
                  </th>
                  <th className="p-3.5 border-r border-white/5 w-36 text-center">
                    Tarjeta / Documento
                  </th>
                  <th className="p-3.5 border-r border-white/5 w-20 text-center">
                    Nota 1
                  </th>
                  <th className="p-3.5 border-r border-white/5 w-20 text-center">
                    Nota 2
                  </th>
                  <th className="p-3.5 border-r border-white/5 w-20 text-center">
                    Nota 3
                  </th>
                  <th className="p-3.5 border-r border-white/5 w-20 text-center">
                    Nota 4
                  </th>
                  <th className="p-3.5 border-r border-white/5 w-24 text-center text-[#e5ad20]">
                    Promedio
                  </th>
                  <th className="p-3.5 border-r border-white/5 w-28 text-center">
                    Estado
                  </th>
                  <th className="p-3.5 border-r border-white/5 min-w-[180px]">
                    Observación
                  </th>
                  <th className="p-3.5 w-14 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {students.map((student, index) => {
                  const avg = calculateAverage(student);
                  const isApproved = avg >= 3.0;

                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-3 border-r border-white/5 text-center font-bold text-white/60 w-12">
                        {index + 1}
                      </td>
                      <td className="p-1 border-r border-white/5 min-w-[200px]">
                        <input
                          type="text"
                          value={student.name}
                          onChange={(e) =>
                            handleCellChange(student.id, "name", e.target.value)
                          }
                          className="w-full h-9 px-2 bg-transparent text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#e5ad20] rounded"
                        />
                      </td>
                      <td className="p-1 border-r border-white/5 text-center w-36">
                        <input
                          type="text"
                          value={student.code}
                          onChange={(e) =>
                            handleCellChange(student.id, "code", e.target.value)
                          }
                          className="w-full h-9 text-center bg-transparent text-white/80 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#e5ad20] rounded"
                        />
                      </td>
                      {(["n1", "n2", "n3", "n4"] as const).map((field) => (
                        <td key={field} className="p-1 border-r border-white/5">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={student[field]}
                            onChange={(e) =>
                              handleCellChange(
                                student.id,
                                field,
                                e.target.value,
                              )
                            }
                            className="w-full h-9 text-center bg-transparent text-white font-medium focus:outline-none focus:ring-1 focus:ring-[#e5ad20] rounded"
                          />
                        </td>
                      ))}
                      <td className="p-3 border-r border-white/5 text-center font-bold text-[#e5ad20] bg-white/[0.01]">
                        {avg.toFixed(1)}
                      </td>
                      <td className="p-3 border-r border-white/5 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            isApproved
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          }`}
                        >
                          {isApproved ? "Aprobado" : "Reprobado"}
                        </span>
                      </td>
                      <td className="p-1 border-r border-white/5">
                        <input
                          type="text"
                          value={student.observation}
                          onChange={(e) =>
                            handleCellChange(
                              student.id,
                              "observation",
                              e.target.value,
                            )
                          }
                          className="w-full h-9 px-2 bg-transparent text-white/80 focus:outline-none focus:ring-1 focus:ring-[#e5ad20] rounded"
                        />
                      </td>
                      <td className="p-1 text-center">
                        <button
                          onClick={() => setStudentToDelete(student)}
                          title="Eliminar estudiante"
                          className="p-2 text-rose-400/70 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SECCIÓN INFERIOR: RESUMEN DE PROMEDIOS (TOP 5 Y REQUIEREN ATENCIÓN) */}
      {!isLoading && students.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* TABLA TOP 5 MEJORES PROMEDIOS */}
          <div className="bg-[#06141b] border border-emerald-500/20 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 18.75h-9m9 0a3 3 0 003-3V8.25a3 3 0 00-3-3H9.75a3 3 0 00-3 3v7.5a3 3 0 003 3m9 0v3.375c0 .621-.504 1.125-1.125 1.125h-9.75A1.125 1.125 0 017.5 22.125V18.75m9 0t-4.5-4.5m-4.5 4.5l4.5-4.5"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Top 5 — Mejores Promedios
                  </h3>
                  <p className="text-[10px] text-white/50">
                    Estudiantes destacados del curso
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {top5Students.map((st, idx) => {
                const avg = calculateAverage(st);
                return (
                  <div
                    key={`top-${st.id}`}
                    className="flex items-center justify-between p-2.5 bg-white/[0.03] hover:bg-white/[0.05] rounded-xl border border-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center bg-emerald-500/20 text-emerald-400 font-bold text-[11px] rounded-lg">
                        #{idx + 1}
                      </span>
                      <span className="font-semibold text-white">
                        {st.name}
                      </span>
                    </div>
                    <span className="font-bold text-[#e5ad20] font-mono text-sm">
                      {avg.toFixed(1)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TABLA 5 PEORES PROMEDIOS (REQUIEREN ATENCIÓN) */}
          <div className="bg-[#06141b] border border-rose-500/20 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-rose-500/10 rounded-lg text-rose-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Promedios con Alerta
                  </h3>
                  <p className="text-[10px] text-white/50">
                    Estudiantes con notas más bajas
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {bottom5Students.map((st, idx) => {
                const avg = calculateAverage(st);
                const isApproved = avg >= 3.0;

                return (
                  <div
                    key={`bottom-${st.id}`}
                    className="flex items-center justify-between p-2.5 bg-white/[0.03] hover:bg-white/[0.05] rounded-xl border border-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center bg-rose-500/20 text-rose-400 font-bold text-[11px] rounded-lg">
                        !
                      </span>
                      <span className="font-semibold text-white">
                        {st.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          isApproved
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-rose-500/10 text-rose-400"
                        }`}
                      >
                        {isApproved ? "Aprobado" : "Reprobado"}
                      </span>
                      <span className="font-bold text-rose-300 font-mono text-sm">
                        {avg.toFixed(1)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: AGREGAR ESTUDIANTE */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#06141b] border border-white/15 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">
                Agregar Nuevo Estudiante
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4 text-xs">
              <div>
                <label className="block text-white/70 mb-1 font-semibold">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Andrea Gómez"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#040c10] border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#e5ad20]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">
                  Documento / Tarjeta de Identidad
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 1029384756"
                  value={newStudentCode}
                  onChange={(e) => setNewStudentCode(e.target.value)}
                  className="w-full px-3 py-2 bg-[#040c10] border border-white/15 rounded-xl text-white font-mono focus:outline-none focus:border-[#e5ad20]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl font-semibold transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="px-4 py-2 bg-[#e5ad20] hover:bg-[#f5c344] disabled:opacity-50 text-[#101820] rounded-xl font-bold transition-all"
                >
                  {isAdding ? "Guardando..." : "Agregar Estudiante"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VERIFICACIÓN DE ELIMINACIÓN */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#06141b] border border-rose-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2 bg-rose-500/10 rounded-xl border border-rose-500/20">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white">
                ¿Eliminar estudiante?
              </h3>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              ¿Estás seguro de que quieres eliminar a{" "}
              <strong className="text-white underline">
                {studentToDelete.name}
              </strong>
              ? Esta acción borrará permanentemente al alumno y sus
              calificaciones asociadas.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10 text-xs">
              <button
                onClick={() => setStudentToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl font-semibold transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteStudent}
                disabled={isDeleting}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
