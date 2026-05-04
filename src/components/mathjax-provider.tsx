"use client";

import { MathJaxContext } from "better-react-mathjax";

export function MathJaxProvider({ children }: { children: React.ReactNode }) {
  return (
    <MathJaxContext
      config={{
        tex: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
          displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"],
          ],
        },
      }}
    >
      {children}
    </MathJaxContext>
  );
}
