"use client";

import { motion } from "framer-motion";
import { useSidebar } from "@/components/sidebar/sidebar-context";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Navbar } from "@/components/navbar/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Navbar />
      <motion.main
        initial={false}
        animate={{ marginLeft: collapsed ? 72 : 260 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="pt-16 min-h-screen"
      >
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">{children}</div>
      </motion.main>
    </div>
  );
}
