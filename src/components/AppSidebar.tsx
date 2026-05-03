"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  FileQuestion,
  GalleryHorizontalEnd,
  GraduationCap,
  ImageIcon,
  LayoutDashboard,
  Layers,
  ScrollText,
  Settings,
  CalendarDays,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Levels",
    href: "/dashboard/levels",
    icon: Layers,
  },
  {
    label: "Faculties",
    href: "/dashboard/faculties",
    icon: GraduationCap,
  },
  {
    label: "Subjects",
    href: "/dashboard/subjects",
    icon: BookOpen,
  },
  {
    label: "Sessions",
    href: "/dashboard/years",
    icon: CalendarDays,
  },
  {
    label: "Questions",
    href: "/dashboard/questions",
    icon: FileQuestion,
  },
  {
    label: "Images",
    href: "/dashboard/images",
    icon: ImageIcon,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      {/* ── HEADER ── */}
      <SidebarHeader className="border-b border-sidebar-border px-2 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="gap-3 rounded-lg pointer-events-none"
            >
              <Image src={"/logo-icon.png"} width={40} height={40} alt="logo" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
                  Quizce
                </span>
                <span className="text-[11px] text-sidebar-foreground/50 tracking-wide">
                  Admin Dashboard
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ── CONTENT ── */}
      <SidebarContent className="py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-widest text-sidebar-foreground/40 mb-1">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className="gap-3 rounded-lg mb-1 py-2.5 text-[13.5px] font-medium transition-all"
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── FOOTER ── */}
      <SidebarFooter className="py-3">
        <SidebarSeparator className="mb-3" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Settings"
              className="gap-3 rounded-lg py-2.5 text-[13.5px] font-medium"
            >
              <Link href="/dashboard/settings">
                <Settings className="h-4 w-4 shrink-0" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
