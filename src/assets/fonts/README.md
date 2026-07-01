# Fonts — License Attribution

Both font families are licensed under the SIL Open Font License 1.1 (OFL),
sourced directly from Google's official `google/fonts` GitHub repository.
Full license text is in `Fraunces-OFL.txt` and `Archivo-OFL.txt` in this folder.

- **Fraunces** — display serif, used for headings (`--font-display`)
- **Archivo** — grotesk, used for body/UI text (`--font-sans-custom`)

Both are variable fonts (single file per style, full weight range), loaded
via `next/font/local` in `src/lib/fonts.ts` — fully self-hosted, no runtime
or build-time network dependency on Google Fonts.
