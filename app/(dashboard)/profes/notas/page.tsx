"use client";

import React, { useState } from "react";

interface StudentGrade {
  id: string;
  code: string;
  name: string;
  n1: number | string;
  n2: number | string;
  n3: number | string;
  n4: number | string;
  observation: string;
}

export default function GradebookPage() {
  // Cursos asignados exclusivamente a este profesor
  const assignedClasses = [
    { id: "9a-mat", name: "9° Grado A — Matemáticas" },
    { id: "10b-alg", name: "10° Grado B — Álgebra Avanzada" },
    { id: "11a-cal", name: "11° Grado A — Cálculo" },
  ];

  const [selectedClass, setSelectedClass] = useState(assignedClasses[0].id);

  // Lista inicial de alumnos con las columnas solicitadas
  const [students, setStudents] = useState<StudentGrade[]>([
    {
      id: "1",
      code: "1024",
      name: "Juan Pérez",
      n1: 4.5,
      n2: 4.0,
      n3: 3.8,
      n4: 4.2,
      observation: "—",
    },
    {
      id: "2",
      code: "1025",
      name: "Laura Gómez",
      n1: 4.8,
      n2: 4.5,
      n3: 4.6,
      n4: 4.9,
      observation: "Excelente",
    },
    {
      id: "3",
      code: "1026",
      name: "Carlos Ruiz",
      n1: 2.5,
      n2: 3.0,
      n3: 2.8,
      n4: 3.0,
      observation: "Debe mejorar",
    },
  ]);

  // Edición directa de celdas
  const handleCellChange = (
    id: string,
    field: keyof StudentGrade,
    value: string,
  ) => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id !== id) return student;

        if (field === "observation") {
          return { ...student, observation: value };
        }

        const numValue = value === "" ? "" : parseFloat(value);
        return {
          ...student,
          [field]: isNaN(numValue as number) ? "" : numValue,
        };
      }),
    );
  };

  // Cálculo en tiempo real del promedio
  const calculateAverage = (s: StudentGrade): number => {
    const grades = [s.n1, s.n2, s.n3, s.n4].filter(
      (val) => typeof val === "number" && !isNaN(val),
    ) as number[];

    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, curr) => acc + curr, 0);
    return parseFloat((sum / grades.length).toFixed(1));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Selector de Cursos y Acciones */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#06141b] p-5 rounded-2xl border border-white/10 shadow-lg">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#e5ad20]">
            Gestión Académica
          </span>
          <h1 className="text-xl font-serif font-bold text-white mt-0.5">
            Planilla de Calificaciones
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Menú Desplegable de Salones */}
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none pr-10 pl-4 py-2.5 bg-[#040c10] border border-white/15 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#e5ad20] transition-colors cursor-pointer"
            >
              {assignedClasses.map((cls) => (
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

          {/* Botón Guardar */}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#e5ad20] hover:bg-[#f5c344] text-[#101820] text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-[#e5ad20]/20 active:scale-95 cursor-pointer">
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
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
            Guardar Cambios
          </button>
        </div>
      </div>

      {/* Tabla Editable Tipo Excel */}
      <div className="bg-[#06141b] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-white/70 font-semibold tracking-wider">
                <th className="p-3.5 border-r border-white/5 min-w-[180px]">
                  Estudiante
                </th>
                <th className="p-3.5 border-r border-white/5 w-24 text-center">
                  Código
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
                <th className="p-3.5 min-w-[200px]">Observación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {students.map((student) => {
                const avg = calculateAverage(student);
                const isApproved = avg >= 3.0;

                return (
                  <tr
                    key={student.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Estudiante */}
                    <td className="p-3 border-r border-white/5 font-semibold text-white">
                      {student.name}
                    </td>

                    {/* Código */}
                    <td className="p-3 border-r border-white/5 text-center text-white/50">
                      {student.code}
                    </td>

                    {/* Nota 1 */}
                    <td className="p-1 border-r border-white/5">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={student.n1}
                        onChange={(e) =>
                          handleCellChange(student.id, "n1", e.target.value)
                        }
                        className="w-full h-9 text-center bg-transparent text-white font-medium focus:bg-white/10 focus:outline-none rounded focus:ring-1 focus:ring-[#e5ad20] transition-all"
                      />
                    </td>

                    {/* Nota 2 */}
                    <td className="p-1 border-r border-white/5">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={student.n2}
                        onChange={(e) =>
                          handleCellChange(student.id, "n2", e.target.value)
                        }
                        className="w-full h-9 text-center bg-transparent text-white font-medium focus:bg-white/10 focus:outline-none rounded focus:ring-1 focus:ring-[#e5ad20] transition-all"
                      />
                    </td>

                    {/* Nota 3 */}
                    <td className="p-1 border-r border-white/5">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={student.n3}
                        onChange={(e) =>
                          handleCellChange(student.id, "n3", e.target.value)
                        }
                        className="w-full h-9 text-center bg-transparent text-white font-medium focus:bg-white/10 focus:outline-none rounded focus:ring-1 focus:ring-[#e5ad20] transition-all"
                      />
                    </td>

                    {/* Nota 4 */}
                    <td className="p-1 border-r border-white/5">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={student.n4}
                        onChange={(e) =>
                          handleCellChange(student.id, "n4", e.target.value)
                        }
                        className="w-full h-9 text-center bg-transparent text-white font-medium focus:bg-white/10 focus:outline-none rounded focus:ring-1 focus:ring-[#e5ad20] transition-all"
                      />
                    </td>

                    {/* Promedio Calculado */}
                    <td className="p-3 border-r border-white/5 text-center font-bold text-[#e5ad20] bg-white/[0.01]">
                      {avg.toFixed(1)}
                    </td>

                    {/* Estado */}
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

                    {/* Observación */}
                    <td className="p-1">
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
                        className="w-full h-9 px-2 bg-transparent text-white/80 focus:bg-white/10 focus:outline-none rounded focus:ring-1 focus:ring-[#e5ad20] transition-all"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
