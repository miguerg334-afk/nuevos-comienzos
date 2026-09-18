import React, { Suspense } from "react";
import { SidebarAdmin } from "./SidebarAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-stone-900">
      <Suspense fallback={<div className="w-64 shrink-0 bg-stone-950" aria-hidden="true" />}>
        <SidebarAdmin />
      </Suspense>
      <main className="flex-1 flex flex-col min-h-screen w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
