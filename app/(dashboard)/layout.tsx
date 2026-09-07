"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Menú con Iconos SVG vectoriales
  const menuItems = [
    {
      label: "Resumen",
      href: "/profes",
      icon: (
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
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
    },
    {
      label: "Notas",
      href: "/profes/notas",
      icon: (
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 012.828 0L20.586 6a2 2 0 010 2.828L11.828 17.586l-4.242.707.707-4.242L16.828 4.586z"
          />
        </svg>
      ),
    },
    {
      label: "Asistencia",
      href: "/profes/asistencia",
      icon: (
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Horario",
      href: "/profes/horario",
      icon: (
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#040c10] text-white font-sans">
      {/* Sidebar Lateral */}
      <aside
        className={`fixed lg:static top-0 left-0 z-40 h-screen bg-[#06141b] border-r border-white/10 transition-all duration-300 flex flex-col justify-between ${
          isSidebarOpen ? "w-64 p-5" : "w-20 p-3"
        }`}
      >
        <div>
          {/* Logo / Header Sidebar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            {isSidebarOpen ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#e5ad20] text-[#101820] font-bold flex items-center justify-center font-serif">
                  NC
                </div>
                <div>
                  <strong className="text-xs tracking-wider block">
                    PANEL DOCENTE
                  </strong>
                  <span className="text-[10px] text-[#e5ad20]">Profesor</span>
                </div>
              </div>
            ) : (
              <div className="w-8 h-8 mx-auto rounded-lg bg-[#e5ad20] text-[#101820] font-bold flex items-center justify-center font-serif">
                NC
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white/60 hover:text-white hidden lg:block cursor-pointer p-1 rounded-lg hover:bg-white/5"
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
                  d={isSidebarOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                />
              </svg>
            </button>
          </div>

          {/* Menú de Opciones */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#e5ad20] text-[#101820] shadow-md shadow-[#e5ad20]/20"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span
                    className={isActive ? "text-[#101820]" : "text-[#e5ad20]"}
                  >
                    {item.icon}
                  </span>
                  {isSidebarOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Perfil del Profesor */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 border border-[#e5ad20]/40 flex items-center justify-center text-xs font-bold text-[#e5ad20]">
              PR
            </div>
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-semibold truncate">
                  Prof. Roberto Gómez
                </p>
                <Link
                  href="/"
                  className="text-[10px] text-red-400 hover:underline block"
                >
                  Cerrar Sesión
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Contenido Dinámico */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
