import React from "react";
import { SidebarAdmin } from "./SidebarAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-stone-900">
      <SidebarAdmin />
      <main className="flex-1 flex flex-col min-h-screen w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
