// app/layout.tsx
import "./globals.css"; // O usando el alias: import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="preload"
          as="image"
          href="/img/img-donaciones.webp"
          fetchPriority="high"
        />
      </head>
      <body className="bg-[#080c14] text-white min-h-screen">{children}</body>
    </html>
  );
}
