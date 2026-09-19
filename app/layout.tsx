// app/layout.tsx
import "./globals.css"; // O usando el alias: import "@/app/globals.css";
import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, WHATSAPP_PHONE, WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} | Colegio en Campoalegre`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ["colegio en Campoalegre", "educación secundaria Campoalegre", "Nuevos Comienzos College", "admisiones escolares Campoalegre"],
  authors: [{ name: SITE_NAME }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "website", locale: "es_CO", url: "/", siteName: SITE_NAME, title: `${SITE_NAME} | Colegio en Campoalegre`, description: SITE_DESCRIPTION, images: [{ url: "/img/hero.webp", width: 1897, height: 1037, alt: "Nuevos Comienzos College" }] },
  twitter: { card: "summary_large_image", title: `${SITE_NAME} | Colegio en Campoalegre`, description: SITE_DESCRIPTION, images: ["/img/hero.webp"] },
};

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
      <body className="bg-[#080c14] text-white min-h-screen">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "School",
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/img/logo_header.webp`,
              description: SITE_DESCRIPTION,
              email: "info@nuevoscomienzosco.com",
              telephone: `+${WHATSAPP_PHONE}`,
              contactPoint: { "@type": "ContactPoint", telephone: `+${WHATSAPP_PHONE}`, contactType: "admissions", availableLanguage: "Spanish" },
              sameAs: [WHATSAPP_URL],
            }),
          }}
        />
      </body>
    </html>
  );
}
