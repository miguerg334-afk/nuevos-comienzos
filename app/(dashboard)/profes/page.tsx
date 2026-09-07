"use client";

import React from "react";

export default function TeacherDashboardPage() {
  const stats = [
    {
      label: "Clases Activas",
      value: "4",
      icon: "📚",
      color: "from-blue-500/20 to-blue-600/5",
    },
    {
      label: "Total Estudiantes",
      value: "128",
      icon: "👥",
      color: "from-emerald-500/20 to-emerald-600/5",
    },
    {
      label: "Tareas x Calificar",
      value: "12",
      icon: "⏳",
      color: "from-amber-500/20 to-amber-600/5",
    },
    {
      label: "Asistencia Hoy",
      value: "95%",
      icon: "✅",
      color: "from-purple-500/20 to-purple-600/5",
    },
  ];

  const todayClasses = [
    {
      time: "07:00 AM - 08:30 AM",
      group: "9° Grado A",
      subject: "Matemáticas",
      room: "Aula 102",
    },
    {
      time: "08:45 AM - 10:15 AM",
      group: "10° Grado B",
      subject: "Álgebra Avanzada",
      room: "Aula 204",
    },
    {
      time: "10:45 AM - 12:15 PM",
      group: "11° Grado A",
      subject: "Cálculo",
      room: "Laboratorio B",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Saludo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#06141b] via-[#0a222e] to-[#06141b] p-6 rounded-2xl border border-white/10">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">
            ¡Hola, Profesor Roberto! 👋
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Aquí está el resumen de tu actividad académica para hoy.
          </p>
        </div>
        <span className="text-xs px-3 py-1.5 rounded-full bg-[#e5ad20]/10 border border-[#e5ad20]/30 text-[#e5ad20] font-semibold w-fit">
          Periodo Académico 2026-I
        </span>
      </div>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`p-5 rounded-2xl bg-gradient-to-br ${stat.color} border border-white/10 backdrop-blur-sm`}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs font-bold text-[#e5ad20]">Activo</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-white/60 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Horario de Hoy */}
      <div className="bg-[#06141b] rounded-2xl p-6 border border-white/10 space-y-4">
        <h2 className="text-lg font-serif font-bold text-white">
          Clases Programadas para Hoy
        </h2>
        <div className="space-y-3">
          {todayClasses.map((cls, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#e5ad20]/30 transition-all gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="px-3 py-1.5 rounded-lg bg-[#e5ad20]/10 text-[#e5ad20] text-xs font-bold">
                  {cls.time}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {cls.subject}
                  </h3>
                  <p className="text-xs text-white/60">
                    {cls.group} • {cls.room}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all cursor-pointer">
                  Tomar Asistencia
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-[#e5ad20] hover:bg-[#f5c344] text-[#101820] text-xs font-bold transition-all cursor-pointer">
                  Ver Aula
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
