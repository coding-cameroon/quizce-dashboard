"use client";

import { MathJax } from "better-react-mathjax";

type MathTextProps = {
  children: string;
  className?: string;
};

export function MathText({ children, className }: MathTextProps) {
  return <MathJax className={className}>{children}</MathJax>;
}
