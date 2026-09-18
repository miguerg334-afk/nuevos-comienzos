"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  LayoutGrid,
  ShieldCheck,
  GraduationCap,
  ClipboardList,
  ClipboardCheck,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Resumen", tab: "Resumen", icon: LayoutGrid },
  { label: "Crear Admins", tab: "Crear Admins", icon: ShieldCheck },
  { label: "Crear Profes", tab: "Crear Profes", icon: GraduationCap },
  { label: "Matrículas", tab: "Matrículas", icon: ClipboardList },
  { label: "Calificaciones", tab: "Calificaciones", icon: ClipboardCheck },
];

export function SidebarAdmin() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "Resumen";

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-emerald-950 text-white px-4 py-3 border-b border-emerald-900 w-full shrink-0 z-30">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-lg text-amber-400">
            Cuaderno
          </span>
          <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-semibold uppercase">
            Admin
          </span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-1.5 text-emerald-200 hover:text-white rounded-md focus:outline-none cursor-pointer"
        >
          {isMobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:sticky md:top-0 inset-y-0 left-0 z-50
          flex flex-col justify-between shrink-0 h-screen
          bg-emerald-950 text-stone-100
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "w-20 px-3" : "w-64 px-5"}
          py-6 shadow-2xl md:shadow-none
        `}
      >
        <div>
          <div className="hidden md:flex items-center justify-between mb-8 pb-4 border-b border-emerald-900">
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="font-display text-2xl font-bold leading-none text-white truncate">
                  Cuaderno
                </p>
                <p className="text-[10px] text-amber-400 mt-1 font-semibold uppercase tracking-wider">
                  Super Admin
                </p>
              </div>
            )}

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-1.5 rounded-md text-emerald-300 hover:text-white hover:bg-emerald-900 transition-colors cursor-pointer ${
                isCollapsed ? "mx-auto" : ""
              }`}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
          </div>

          <nav className="space-y-1.5">
            {NAV_ITEMS.map(({ label, tab, icon: Icon }) => {
              const active = currentTab === tab;
              return (
                <Link
                  key={tab}
                  href={`/admin?tab=${encodeURIComponent(tab)}`}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center gap-3 py-2.5 rounded-md text-sm transition-all
                    ${isCollapsed ? "justify-center px-0" : "px-3"}
                    ${
                      active
                        ? "bg-emerald-900 text-white font-medium border-l-4 border-amber-500"
                        : "text-emerald-200 hover:bg-emerald-900/60 hover:text-white"
                    }
                  `}
                >
                  <Icon className="w-5 h-5 shrink-0" strokeWidth={1.75} />
                  {!isCollapsed && <span className="truncate">{label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-emerald-900 pt-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-600 text-emerald-950 flex items-center justify-center text-sm font-bold shrink-0">
            SA
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="text-sm text-white truncate font-medium leading-tight">
                Super Admin
              </p>
              <p className="text-xs text-emerald-300 truncate">Control Total</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
