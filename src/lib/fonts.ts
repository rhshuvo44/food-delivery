import localFont from "next/font/local";

/**
 * Fraunces — display serif with a "soft/wonky" warmth, used for headings
 * and any moment that should feel editorial/appetite-driven (hero
 * headlines, restaurant names, price call-outs). Self-hosted as a
 * variable font (single file, full weight range 100–900 + optical size +
 * "soft" + "wonk" axes) — no network call to Google Fonts at build or
 * runtime, and it's the OFL-licensed source file straight from the
 * google/fonts repo (see Fraunces-OFL.txt).
 */
export const fraunces = localFont({
  src: [
    { path: "../assets/fonts/Fraunces-Variable.ttf", style: "normal" },
    { path: "../assets/fonts/Fraunces-Italic-Variable.ttf", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
});

/**
 * Archivo — a confident, slightly condensed grotesk for body copy, UI
 * labels, buttons, and form fields. Pairs with Fraunces' warmth by
 * staying neutral and highly legible at small sizes (menu lists, dense
 * dashboard tables in Phase 5/6).
 */
export const archivo = localFont({
  src: [
    { path: "../assets/fonts/Archivo-Variable.ttf", style: "normal" },
    { path: "../assets/fonts/Archivo-Italic-Variable.ttf", style: "italic" },
  ],
  variable: "--font-sans-custom",
  display: "swap",
});
