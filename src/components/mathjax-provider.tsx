"use client";

import { MathJaxContext } from "better-react-mathjax";

const config = {
  loader: { load: ["input/tex", "output/svg"] },
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
};

export function MathJaxProvider({ children }: { children: React.ReactNode }) {
  return <MathJaxContext config={config}>{children}</MathJaxContext>;
}
