"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  FileSpreadsheet,
  ClipboardList,
  LayoutTemplate,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { currentUser, workspaces } from "@/data/users";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/estimates", label: "Estimates", icon: FileSpreadsheet },
  { href: "/dashboard/requirements", label: "Requirements", icon: ClipboardList },
  { href: "/dashboard/templates", label: "Templates", icon: LayoutTemplate },
  { href: "/dashboard/clients", label: "Clients", icon: Users },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-white"
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-4 border-b border-border">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary">
          <Sparkles className="h-4.5 w-4.5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="text-lg font-semibold tracking-tight overflow-hidden whitespace-nowrap"
            >
              Estimator
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/8 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 w-[3px] h-6 bg-primary rounded-r-full"
                  style={{ position: "relative" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-border p-3 space-y-2">
        {/* Workspace Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-muted transition-colors",
                collapsed && "justify-center"
              )}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                AC
              </div>
              {!collapsed && (
                <>
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="font-medium truncate">{workspaces[0].name}</p>
                    <p className="text-xs text-muted-foreground">{workspaces[0].plan}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {workspaces.map((ws) => (
              <DropdownMenuItem key={ws.id}>
                <div>
                  <p className="font-medium">{ws.name}</p>
                  <p className="text-xs text-muted-foreground">{ws.plan}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User */}
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2",
            collapsed && "justify-center"
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{currentUser.avatar}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">{currentUser.role}</p>
            </div>
          )}
        </div>

        {/* Collapse Button */}
        <button
          onClick={toggle}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform duration-250",
              collapsed && "rotate-180"
            )}
          />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
}
