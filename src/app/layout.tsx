import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Poppins } from "next/font/google";

import "./globals.css";

import AppNavbar from "@/components/AppNavbar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProviders } from "@/providers/app-providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Quizce Brainwaves",
  description: "Admin dashboard to manage app content.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sidebarOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full max-h-dvh flex">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SidebarProvider defaultOpen={sidebarOpen}>
              <AppSidebar />
              <div className="flex flex-col flex-1 min-h-screen">
                <AppNavbar />
                <AppProviders>
                  <main className="w-full h-full">{children}</main>
                </AppProviders>
              </div>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
