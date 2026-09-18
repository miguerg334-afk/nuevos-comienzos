"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // 1. MOCK / CREDENCIALES GENÉRICAS PARA PRUEBAS RÁPIDAS
    if (cleanEmail === "admin@colegio.edu" && cleanPassword === "admin123") {
      onClose();
      router.push("/admin");
      setIsLoading(false);
      return;
    }

    if (cleanEmail === "profesor@colegio.edu" && cleanPassword === "profe123") {
      onClose();
      router.push("/profes");
      setIsLoading(false);
      return;
    }

    if (
      cleanEmail === "estudiante@colegio.edu" &&
      cleanPassword === "alumno123"
    ) {
      onClose();
      router.push("/estudiantes");
      setIsLoading(false);
      return;
    }

    // 2. AUTENTICACIÓN CON SUPABASE (FALLBACK REAL)
    try {
      const { data: authData, error: authError } =
        await getSupabase().auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });

      if (authError) throw authError;

      if (authData.user) {
        const { data: profile } = await getSupabase()
          .from("profiles")
          .select("role")
          .eq("id", authData.user.id)
          .single();

        onClose();

        switch (profile?.role) {
          case "admin":
            router.push("/admin");
            break;
          case "teacher":
            router.push("/profes");
            break;
          case "student":
            router.push("/estudiantes");
            break;
          default:
            router.push("/");
        }
      }
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage(
        "Credenciales inválidas. Usa una de las cuentas de prueba mostradas abajo.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#06141b] border border-white/12 rounded-[22px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-10 overflow-hidden">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#e5ad20]/15 blur-2xl rounded-full pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-[2px] text-[#e5ad20] bg-[#e5ad20]/10 border border-[#e5ad20]/30 rounded-full mb-3">
            Portal Institucional
          </span>
          <h2 className="text-2xl font-serif font-bold text-white">
            Iniciar Sesión
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Acceso unificado para{" "}
            <span className="text-white font-medium">Directivos</span>,{" "}
            <span className="text-white font-medium">Docentes</span> y{" "}
            <span className="text-white font-medium">Estudiantes</span>.
          </p>
        </div>

        {/* Cuentas de prueba rápida */}
        <div className="mb-5 p-3 bg-white/5 border border-amber-500/30 rounded-xl text-xs space-y-1">
          <p className="text-[#e5ad20] font-bold uppercase tracking-wider text-[10px]">
            Credenciales de prueba:
          </p>
          <div className="text-white/80 font-mono text-[11px] space-y-0.5">
            <p>
              • Admin: <span className="text-white">admin@colegio.edu</span> /{" "}
              <span className="text-white">admin123</span>
            </p>
            <p>
              • Profe: <span className="text-white">profesor@colegio.edu</span>{" "}
              / <span className="text-white">profe123</span>
            </p>
            <p>
              • Alumno:{" "}
              <span className="text-white">estudiante@colegio.edu</span> /{" "}
              <span className="text-white">alumno123</span>
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/80 mb-1.5">
              Correo Institucional
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@colegio.edu"
              className="w-full px-4 py-3 bg-white/5 border border-white/12 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#e5ad20] focus:ring-1 focus:ring-[#e5ad20] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/80 mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/5 border border-white/12 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#e5ad20] focus:ring-1 focus:ring-[#e5ad20] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-[#e5ad20] hover:bg-[#f5c344] text-[#101820] font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-lg hover:shadow-[#e5ad20]/20 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Validando..." : "Ingresar al Sistema"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
