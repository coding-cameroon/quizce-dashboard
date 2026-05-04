"use client";

import { MathJaxContext } from "better-react-mathjax";
import TanStackQueryProvider from "./query-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <TanStackQueryProvider>{children}</TanStackQueryProvider>;
}
