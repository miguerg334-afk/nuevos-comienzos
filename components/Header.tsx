"use client";

import { useState } from "react";
import LoginModal from "./LoginModal";

const navigationItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Enfoque", href: "#enfoque-educativo" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Oferta Educativa", href: "#oferta-educativa" },
  { label: "Símbolos", href: "#simbolos" },
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
      <header className="fixed top-[22px] left-1/2 -translate-x-1/2 w-[min(calc(100%-32px),1180px)] h-[68px] flex items-center justify-between px-5 z-[100] border border-white/12 bg-[#06141b]/65 backdrop-blur-[22px] rounded-[18px] shadow-[0_15px_50px_rgba(0,0,0,0.3)]">
        <a
          href="#inicio"
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
        </a>

        {/* Botón Hamburguesa Móvil */}
        <button
          className="block md:hidden bg-transparent border-none text-white text-[24px] cursor-pointer"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        {/* Navegación Desktop y Mobile */}
        <nav
          className={`
          absolute md:static top-[80px] left-0 w-full md:w-auto 
          flex flex-col md:flex-row items-center gap-5 md:gap-5
          bg-[#06141b]/95 md:bg-transparent backdrop-blur-[22px] md:backdrop-blur-none
          border border-white/12 md:border-none rounded-[18px] md:rounded-none
          py-5 md:py-0
          transition-all duration-300 ease-in-out
          ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto -translate-y-2.5 md:translate-y-0"
          }
        `}
        >
          {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="relative text-white/68 text-[12px] tracking-[0.4px] no-underline transition-colors duration-250 hover:text-white group"
              >
                {item.label}
                <span className="absolute left-0 -bottom-[7px] w-0 h-px bg-[#e5ad20] transition-all duration-250 group-hover:w-full"></span>
              </a>
            ))}

          {/* Opción de Ingresar en Menú Móvil */}
          <button
            onClick={openLogin}
            className="flex md:hidden items-center gap-2 text-[#e5ad20] text-[12px] font-semibold tracking-[0.4px] bg-transparent border-none cursor-pointer"
          >
            <span>Portal Ingreso</span>
            <span>→</span>
          </button>
        </nav>

        {/* Botones de Acción Desktop */}
        <div className="hidden md:flex items-center gap-3">
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

          {/* Botón Prematrícula */}
          <button className="flex items-center gap-[9px] px-[17px] py-[11px] rounded-[10px] bg-[#e5ad20] text-[#101820] text-[11px] font-bold tracking-[0.4px] border-none cursor-pointer transition-all duration-250 hover:-translate-y-[2px] hover:bg-[#f5c344]">
            Prematrículate
            <span>→</span>
          </button>
        </div>
      </header>

      {/* Modal de Inicio de Sesión Unificado */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Header;
