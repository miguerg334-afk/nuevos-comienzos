# 🏫 Nuevos Comienzos College — Plataforma Educativa Institucional

Plataforma web de alto rendimiento diseñada para la gestión académica del colegio Nuevos Comienzos. Integra el portal institucional público y un panel docente privado para el control de calificaciones, asistencias y datos estudiantiles en tiempo real.

---

## 🛠️ Tecnologías y Lenguajes

- **React** — Librería para interfaces de usuario
- **Next.js** (App Router, Turbopack) — Framework principal
- **TypeScript** — Tipado estático y robustez en código
- **Tailwind CSS** — Estilos y modo oscuro institucional
- **Supabase** — Backend, autenticación y base de datos PostgreSQL

---

## 🚀 Módulos Principales

- **Portal Público Institucional:** Página principal con información del colegio, oferta educativa y acceso a la plataforma.
- **Panel Docente:** Área privada para profesores con navegación lateral por secciones.
- **Planilla de Calificaciones Interactiva:** Matriz estilo hoja de cálculo para la carga de notas, filtrado por Documento de Identidad (T.I.), cálculo automático de promedios, estados de aprobación y guardado directo en la base de datos.

---

## Prematrículas en Google Sheets

El formulario guarda una copia operativa en las pestañas `Solicitudes` y `Estudiantes` de una hoja de cálculo compartida con la cuenta de servicio del proyecto. Configura estas variables privadas en Vercel; nunca las incluyas en Git:

- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_JSON`
