"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Sun,
  Moon,
  Save,
  UserPlus,
  FolderPlus,
  Trash2,
  X,
  Plus,
} from "lucide-react";

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

function AdminContent() {
  const searchParams = useSearchParams();
  const activeNav = searchParams.get("tab") || "Resumen";

  const [isDark, setIsDark] = useState(true);

  // Estado para Cursos y Calificaciones
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [students, setStudents] = useState<StudentGrade[]>([]);
  const [isLoadingGrades, setIsLoadingGrades] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Estados de Modales
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");

  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentCode, setNewStudentCode] = useState("");

  const [studentToDelete, setStudentToDelete] = useState<StudentGrade | null>(
    null,
  );

  // Variables de estilos adaptables
  const bgMain = isDark ? "bg-stone-950" : "bg-stone-100";
  const cardBg = isDark ? "bg-stone-900" : "bg-white";
  const border = isDark ? "border-stone-800" : "border-stone-300";
  const divide = isDark ? "divide-stone-800" : "divide-stone-200";
  const textPrimary = isDark ? "text-stone-100" : "text-stone-900";
  const textMuted = isDark ? "text-stone-400" : "text-stone-600";
  const inputBg = isDark
    ? "bg-stone-900 border-stone-700 text-stone-100 placeholder:text-stone-500"
    : "bg-white border-stone-300 text-stone-900 placeholder:text-stone-400";

  // Cargar Cursos
  const fetchCourses = useCallback(async () => {
    const { data } = await supabase.from("courses").select("*").order("name");
    if (data) {
      setCourses(data);
      if (data.length > 0 && !selectedClass) setSelectedClass(data[0].id);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (activeNav === "Calificaciones") fetchCourses();
  }, [activeNav, fetchCourses]);

  // Cargar Estudiantes
  const fetchStudents = useCallback(async (courseId: string) => {
    setIsLoadingGrades(true);
    const { data } = await supabase
      .from("students")
      .select(`id, code, name, grades ( id, n1, n2, n3, n4, observation )`)
      .eq("course_id", courseId);

    if (data) {
      const formatted: StudentGrade[] = data.map((st: any) => {
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
      setStudents(formatted.sort((a, b) => a.name.localeCompare(b.name)));
    }
    setIsLoadingGrades(false);
  }, []);

  useEffect(() => {
    if (activeNav === "Calificaciones" && selectedClass)
      fetchStudents(selectedClass);
  }, [activeNav, selectedClass, fetchStudents]);

  // Calcular Promedio
  const calculateAverage = (s: StudentGrade): number => {
    const grades = [s.n1, s.n2, s.n3, s.n4]
      .map((v) => parseFloat(String(v).replace(",", ".")))
      .filter((v) => !isNaN(v));
    if (grades.length === 0) return 0;
    return parseFloat(
      (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(1),
    );
  };

  // Crear Nuevo Curso
  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseName.trim()) return;

    const { data, error } = await supabase
      .from("courses")
      .insert([{ name: newCourseName.trim() }])
      .select();

    if (!error && data && data.length > 0) {
      setCourses((prev) => [...prev, data[0]]);
      setSelectedClass(data[0].id);
      setNewCourseName("");
      setIsAddCourseModalOpen(false);
    }
  };

  // Crear Nuevo Estudiante
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !selectedClass) return;

    const { data, error } = await supabase
      .from("students")
      .insert([
        {
          name: newStudentName.trim(),
          code: newStudentCode.trim(),
          course_id: selectedClass,
        },
      ])
      .select();

    if (!error && data && data.length > 0) {
      const createdStudent = data[0];
      await supabase.from("grades").insert([
        {
          student_id: createdStudent.id,
          n1: 0,
          n2: 0,
          n3: 0,
          n4: 0,
        },
      ]);
      fetchStudents(selectedClass);
      setNewStudentName("");
      setNewStudentCode("");
      setIsAddStudentModalOpen(false);
    }
  };

  // Eliminar Estudiante
  const handleDeleteStudent = async () => {
    if (!studentToDelete) return;

    await supabase.from("grades").delete().eq("student_id", studentToDelete.id);
    await supabase.from("students").delete().eq("id", studentToDelete.id);

    setStudents((prev) => prev.filter((s) => s.id !== studentToDelete.id));
    setStudentToDelete(null);
  };

  // Guardar Calificaciones y Nombres
  const handleSaveGrades = async () => {
    setIsSaving(true);
    try {
      for (const st of students) {
        await supabase
          .from("students")
          .update({ name: st.name, code: st.code })
          .eq("id", st.id);

        await supabase.from("grades").upsert(
          {
            student_id: st.id,
            n1: st.n1 === "" ? 0 : Number(String(st.n1).replace(",", ".")),
            n2: st.n2 === "" ? 0 : Number(String(st.n2).replace(",", ".")),
            n3: st.n3 === "" ? 0 : Number(String(st.n3).replace(",", ".")),
            n4: st.n4 === "" ? 0 : Number(String(st.n4).replace(",", ".")),
            observation: st.observation,
          },
          { onConflict: "student_id" },
        );
      }
      setSaveStatus("¡Notas guardadas!");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus("Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className={`flex-1 flex flex-col min-h-screen ${bgMain} ${textPrimary} transition-colors duration-200`}
    >
      <header
        className={`flex items-center justify-between px-8 py-6 border-b ${border} ${cardBg}`}
      >
        <div>
          <h1 className={`font-display text-2xl font-bold ${textPrimary}`}>
            {activeNav}
          </h1>
          <p className={`text-xs ${textMuted}`}>Gestión del colegio</p>
        </div>

        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2.5 rounded-lg border ${border} ${cardBg} ${textPrimary} hover:opacity-80 transition-all cursor-pointer shadow-xs flex items-center justify-center`}
          title={isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-stone-700" />
          )}
        </button>
      </header>

      <main className="flex-1 p-8 space-y-6">
        {activeNav === "Resumen" && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div
              className={`p-5 rounded-lg border ${border} ${cardBg} shadow-xs`}
            >
              <p className={`text-xs ${textMuted}`}>Estudiantes</p>
              <p className={`text-2xl font-bold ${textPrimary}`}>340</p>
            </div>
            <div
              className={`p-5 rounded-lg border ${border} ${cardBg} shadow-xs`}
            >
              <p className={`text-xs ${textMuted}`}>Profesores</p>
              <p className={`text-2xl font-bold ${textPrimary}`}>18</p>
            </div>
          </div>
        )}

        {activeNav === "Calificaciones" && (
          <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border shadow-xs ${inputBg}`}
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setIsAddCourseModalOpen(true)}
                  className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-medium cursor-pointer transition-all shadow-xs"
                >
                  <FolderPlus className="w-4 h-4" /> Nuevo Grado
                </button>
              </div>

              <div className="flex items-center gap-3">
                {saveStatus && (
                  <span className="text-xs font-semibold text-emerald-500">
                    {saveStatus}
                  </span>
                )}
                <button
                  onClick={() => setIsAddStudentModalOpen(true)}
                  className={`flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-lg border ${border} ${cardBg} ${textPrimary} font-medium hover:bg-stone-200 dark:hover:bg-stone-800 cursor-pointer transition-all shadow-xs`}
                >
                  <UserPlus className="w-4 h-4" /> Estudiante
                </button>
                <button
                  onClick={handleSaveGrades}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs px-4 py-2 rounded-lg cursor-pointer transition-all shadow-xs"
                >
                  <Save className="w-4 h-4" />{" "}
                  {isSaving ? "Guardando..." : "Guardar Notas"}
                </button>
              </div>
            </div>

            <div
              className={`rounded-lg border ${border} ${cardBg} shadow-xs overflow-x-auto`}
            >
              {isLoadingGrades ? (
                <div className="p-8 text-center text-xs text-stone-500">
                  Cargando notas...
                </div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr
                      className={`border-b ${border} ${isDark ? "bg-stone-900/60 text-stone-400" : "bg-stone-100 text-stone-600"} font-semibold uppercase tracking-wider`}
                    >
                      <th className="p-3.5">#</th>
                      <th className="p-3.5">Estudiante</th>
                      <th className="p-3.5">Doc</th>
                      <th className="p-3.5 text-center">N1</th>
                      <th className="p-3.5 text-center">N2</th>
                      <th className="p-3.5 text-center">N3</th>
                      <th className="p-3.5 text-center">N4</th>
                      <th className="p-3.5 text-center">Prom</th>
                      <th className="p-3.5 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${divide}`}>
                    {students.map((st, i) => (
                      <tr
                        key={st.id}
                        className={`${isDark ? "hover:bg-stone-800/40" : "hover:bg-stone-50"} transition-colors`}
                      >
                        <td className={`p-3.5 font-medium ${textMuted}`}>
                          {i + 1}
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={st.name}
                            onChange={(e) =>
                              setStudents((prev) =>
                                prev.map((s) =>
                                  s.id === st.id
                                    ? { ...s, name: e.target.value }
                                    : s,
                                ),
                              )
                            }
                            className={`w-full px-2 py-1 rounded-md border text-xs font-semibold ${inputBg}`}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={st.code}
                            onChange={(e) =>
                              setStudents((prev) =>
                                prev.map((s) =>
                                  s.id === st.id
                                    ? { ...s, code: e.target.value }
                                    : s,
                                ),
                              )
                            }
                            className={`w-28 px-2 py-1 rounded-md border text-xs ${inputBg}`}
                          />
                        </td>
                        {(["n1", "n2", "n3", "n4"] as const).map((n) => (
                          <td key={n} className="p-2 text-center">
                            <input
                              type="text"
                              value={st[n]}
                              onChange={(e) =>
                                setStudents((prev) =>
                                  prev.map((s) =>
                                    s.id === st.id
                                      ? { ...s, [n]: e.target.value }
                                      : s,
                                  ),
                                )
                              }
                              className={`w-12 text-center py-1 px-1 rounded-md border text-xs font-semibold ${inputBg}`}
                            />
                          </td>
                        ))}
                        <td className="p-3.5 text-center font-bold text-amber-500 text-sm">
                          {calculateAverage(st)}
                        </td>
                        <td className="p-3.5 text-center">
                          <button
                            onClick={() => setStudentToDelete(st)}
                            className="p-1 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors cursor-pointer"
                            title="Eliminar Estudiante"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modal Nuevo Grado */}
      {isAddCourseModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div
            className={`w-full max-w-md rounded-xl border ${border} ${cardBg} p-6 shadow-2xl`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-base font-bold ${textPrimary}`}>
                Nuevo Grado / Curso
              </h3>
              <button
                onClick={() => setIsAddCourseModalOpen(false)}
                className="text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddCourse} className="space-y-4">
              <div>
                <label
                  className={`block text-xs font-medium mb-1.5 ${textMuted}`}
                >
                  Nombre del Grado y Asignatura
                </label>
                <input
                  type="text"
                  placeholder="Ej: 6° Grado A — Matemáticas"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-lg border ${inputBg}`}
                  autoFocus
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddCourseModalOpen(false)}
                  className={`px-3 py-1.5 text-xs rounded-lg border ${border} ${textPrimary} cursor-pointer`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-medium cursor-pointer"
                >
                  Crear Grado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Nuevo Estudiante */}
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div
            className={`w-full max-w-md rounded-xl border ${border} ${cardBg} p-6 shadow-2xl`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-base font-bold ${textPrimary}`}>
                Agregar Estudiante
              </h3>
              <button
                onClick={() => setIsAddStudentModalOpen(false)}
                className="text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label
                  className={`block text-xs font-medium mb-1.5 ${textMuted}`}
                >
                  Nombre Completo
                </label>
                <input
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-lg border ${inputBg}`}
                  autoFocus
                  required
                />
              </div>
              <div>
                <label
                  className={`block text-xs font-medium mb-1.5 ${textMuted}`}
                >
                  Documento / Código
                </label>
                <input
                  type="text"
                  placeholder="Ej: 1029384756"
                  value={newStudentCode}
                  onChange={(e) => setNewStudentCode(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-lg border ${inputBg}`}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddStudentModalOpen(false)}
                  className={`px-3 py-1.5 text-xs rounded-lg border ${border} ${textPrimary} cursor-pointer`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium cursor-pointer"
                >
                  Guardar Estudiante
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Confirmar Eliminar Estudiante */}
      {studentToDelete && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div
            className={`w-full max-w-sm rounded-xl border ${border} ${cardBg} p-6 shadow-2xl space-y-4`}
          >
            <h3 className={`text-base font-bold ${textPrimary}`}>
              ¿Eliminar Estudiante?
            </h3>
            <p className={`text-xs ${textMuted}`}>
              ¿Estás seguro de que deseas eliminar a{" "}
              <strong className={textPrimary}>{studentToDelete.name}</strong>?
              Se borrarán sus calificaciones asociadas.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setStudentToDelete(null)}
                className={`px-3 py-1.5 text-xs rounded-lg border ${border} ${textPrimary} cursor-pointer`}
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteStudent}
                className="px-3 py-1.5 text-xs rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-xs text-stone-500">Cargando módulo...</div>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
