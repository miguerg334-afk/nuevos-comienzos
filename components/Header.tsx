"use client";

import { useState } from "react";
import Link from "next/link";
import LoginModal from "./LoginModal";

const navigationItems = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Símbolos", href: "/#simbolos" },
  { label: "Admisiones", href: "/#costos" },
  { label: "¿Cómo puedo apoyar?", href: "/donativos" },
  { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const openLogin = () => {
    closeMenu();
    setIsLoginOpen(true);
  };

  return (
    <>
      <header className="fixed top-[22px] left-1/2 -translate-x-1/2 w-[min(calc(100%-24px),1440px)] h-[76px] flex items-center justify-between gap-5 px-5 xl:px-7 z-[100] border border-white/15 bg-[#06141b]/90 backdrop-blur-[22px] rounded-[18px] shadow-[0_15px_50px_rgba(0,0,0,0.3)]">
        <Link
          href="/"
          className="flex items-center gap-3 no-underline text-white"
        >
          {!imageError ? (
            <img
              src="/img/logo_header.webp"
              alt="Logo Nuevos Comienzos College"
              className="h-10 w-auto object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-[38px] h-[38px] grid place-items-center rounded-[11px] border border-[#e5ad20]/50 bg-[#e5ad20]/10 text-[#e5ad20] font-serif text-[18px]">
              N
            </div>
          )}
          <div className="flex flex-col leading-none">
            <strong className="text-[13px] tracking-[2px] font-semibold">
              NUEVOS COMIENZOS
            </strong>
            <span className="mt-[5px] text-[#e5ad20] text-[8px] tracking-[3px]">
              COLLEGE
            </span>
          </div>
        </Link>

        {/* Botón Hamburguesa Móvil */}
        <button
          className="block xl:hidden bg-transparent border-none text-white text-[24px] cursor-pointer"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        {/* Navegación Desktop y Mobile */}
        <nav
          className={`
          absolute xl:static top-[88px] left-0 w-full xl:w-auto
          flex flex-col xl:flex-row items-center gap-5 xl:gap-1
          bg-[#06141b]/95 xl:bg-transparent backdrop-blur-[22px] xl:backdrop-blur-none
          border border-white/15 xl:border-none rounded-[18px] xl:rounded-none
          py-5 xl:py-0
          transition-all duration-300 ease-in-out
          ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 xl:opacity-100 pointer-events-none xl:pointer-events-auto -translate-y-2.5 xl:translate-y-0"
          }
        `}
        >
          {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                scroll
                onClick={() => {
                  closeMenu();

                  // Evita conservar la altura de la página o sección anterior
                  // mientras Next.js termina la navegación. En los enlaces con
                  // hash, el navegador posiciona después el destino indicado.
                  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                }}
                className="relative whitespace-nowrap rounded-lg px-2.5 py-2 text-white/75 text-[12px] font-medium tracking-[0.2px] no-underline transition-colors duration-200 hover:bg-white/10 hover:text-white group"
              >
                {item.label}
                <span className="absolute left-2.5 right-2.5 bottom-1 h-px scale-x-0 bg-[#e5ad20] transition-all duration-250 group-hover:scale-x-100"></span>
              </Link>
            ))}

          {/* Opción de Ingresar en Menú Móvil */}
          <button
            onClick={openLogin}
            className="flex xl:hidden items-center gap-2 text-[#e5ad20] text-[12px] font-semibold tracking-[0.4px] bg-transparent border-none cursor-pointer"
          >
            <span>Portal Ingreso</span>
            <span>→</span>
          </button>
        </nav>

        {/* Botones de Acción Desktop */}
        <div className="hidden xl:flex items-center gap-3">
          {/* Botón de Ingreso al Sistema */}
          <button
            onClick={() => setIsLoginOpen(true)}
            className="flex items-center gap-2 px-[15px] py-[10px] rounded-[10px] border border-white/15 bg-white/5 text-white text-[11px] font-semibold tracking-[0.4px] cursor-pointer transition-all duration-250 hover:bg-white/10 hover:border-[#e5ad20]/50"
          >
            <svg
              className="w-3.5 h-3.5 text-[#e5ad20]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            Ingresar
          </button>
        </div>
      </header>

      {/* Modal de Inicio de Sesión Unificado */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Header;
