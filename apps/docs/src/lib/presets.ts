type Colors = {
  background: string
  foreground: string
  surface: string
  soft: string
  accent: string
  border: string
  input: string
  muted: string
  primary: string
  primaryForeground: string
  ring: string
  sidebarAccent?: string
  sidebar?: string
}

function tokens(colors: Colors): Record<string, string> {
  return {
    background: colors.background,
    foreground: colors.foreground,
    card: colors.surface,
    "card-foreground": colors.foreground,
    popover: colors.surface,
    "popover-foreground": colors.foreground,
    secondary: colors.soft,
    "secondary-foreground": colors.foreground,
    muted: colors.soft,
    "muted-foreground": colors.muted,
    accent: colors.accent,
    "accent-foreground": colors.foreground,
    border: colors.border,
    input: colors.input,
    primary: colors.primary,
    "primary-foreground": colors.primaryForeground,
    ring: colors.ring,
    sidebar: colors.sidebar ?? colors.soft,
    "sidebar-foreground": colors.foreground,
    "sidebar-primary": colors.primary,
    "sidebar-primary-foreground": colors.primaryForeground,
    "sidebar-accent": colors.sidebarAccent ?? colors.accent,
    "sidebar-accent-foreground": colors.foreground,
    "sidebar-border": colors.border,
    "sidebar-ring": colors.ring,
  }
}

export const presets = [
  {
    id: "neutral", name: "Neutral", radius: "0.5rem", brandColor: "#1c1c1a",
    light: tokens({ background: "#fafaf9", foreground: "#1c1c1a", surface: "#ffffff", soft: "#f0f0ed", accent: "#e8e8e3", border: "#e2e2dc", input: "#7c7c74", muted: "#60605a", primary: "#1c1c1a", primaryForeground: "#fafaf9", ring: "#575750", sidebarAccent: "#e2e2dc" }),
    dark: tokens({ background: "#111110", foreground: "#f5f5f3", surface: "#1c1c1a", soft: "#252523", accent: "#2d2d29", border: "#363632", input: "#808078", muted: "#a6a69e", primary: "#f5f5f3", primaryForeground: "#1c1c1a", ring: "#c4c4bb", sidebarAccent: "#2d2d29", sidebar: "#1c1c1a" }),
  },
  {
    id: "vercel", name: "Vercel", radius: "0.375rem", brandColor: "#000000",
    light: tokens({ background: "#ffffff", foreground: "#171717", surface: "#ffffff", soft: "#f5f5f5", accent: "#ebebeb", border: "#e5e5e5", input: "#737373", muted: "#525252", primary: "#171717", primaryForeground: "#ffffff", ring: "#171717" }),
    dark: tokens({ background: "#000000", foreground: "#ededed", surface: "#0a0a0a", soft: "#171717", accent: "#262626", border: "#333333", input: "#8f8f8f", muted: "#a3a3a3", primary: "#ededed", primaryForeground: "#0a0a0a", ring: "#ededed" }),
  },
  {
    id: "cloudflare", name: "Cloudflare", radius: "0.375rem", brandColor: "#f38020",
    light: tokens({ background: "#ffffff", foreground: "#262321", surface: "#ffffff", soft: "#faf7f4", accent: "#ffedd5", border: "#e7ded5", input: "#817164", muted: "#6b5748", primary: "#b54708", primaryForeground: "#ffffff", ring: "#b54708" }),
    dark: tokens({ background: "#171411", foreground: "#faf5ef", surface: "#211b16", soft: "#2a211a", accent: "#382517", border: "#4b3829", input: "#ab917c", muted: "#c7ad97", primary: "#f38020", primaryForeground: "#171411", ring: "#f38020" }),
  },
  {
    id: "supabase", name: "Supabase", radius: "0.375rem", brandColor: "#3ecf8e",
    light: tokens({ background: "#fdfdfd", foreground: "#171717", surface: "#ffffff", soft: "#f0f5f2", accent: "#dcf5e8", border: "#d9e3dd", input: "#657c6c", muted: "#476451", primary: "#087f5b", primaryForeground: "#ffffff", ring: "#087f5b" }),
    dark: tokens({ background: "#171717", foreground: "#ededed", surface: "#1c1c1c", soft: "#242924", accent: "#1c3227", border: "#35463c", input: "#819c88", muted: "#a5bdac", primary: "#3ecf8e", primaryForeground: "#11231a", ring: "#3ecf8e" }),
  },
  {
    id: "linear", name: "Linear", radius: "0.5rem", brandColor: "#5e6ad2",
    light: tokens({ background: "#ffffff", foreground: "#222326", surface: "#ffffff", soft: "#f4f5f8", accent: "#e9ebfb", border: "#dfe1eb", input: "#777b98", muted: "#555970", primary: "#515dbb", primaryForeground: "#ffffff", ring: "#515dbb" }),
    dark: tokens({ background: "#101114", foreground: "#f4f5f8", surface: "#191a20", soft: "#22232c", accent: "#282b43", border: "#393c50", input: "#9498b7", muted: "#b0b3cc", primary: "#a3aaff", primaryForeground: "#101114", ring: "#a3aaff" }),
  },
  {
    id: "github", name: "GitHub", radius: "0.375rem", brandColor: "#0969da",
    light: tokens({ background: "#ffffff", foreground: "#1f2328", surface: "#ffffff", soft: "#f6f8fa", accent: "#ddf4ff", border: "#d1d9e0", input: "#6e7781", muted: "#59636e", primary: "#0969da", primaryForeground: "#ffffff", ring: "#0969da" }),
    dark: tokens({ background: "#0d1117", foreground: "#f0f6fc", surface: "#161b22", soft: "#21262d", accent: "#233043", border: "#30363d", input: "#8b949e", muted: "#9da7b3", primary: "#58a6ff", primaryForeground: "#0d1117", ring: "#58a6ff" }),
  },
  {
    id: "stripe", name: "Stripe", radius: "0.5rem", brandColor: "#635bff",
    light: tokens({ background: "#f6f9fc", foreground: "#0a2540", surface: "#ffffff", soft: "#edf1f8", accent: "#e9e7ff", border: "#d9dfe9", input: "#69798c", muted: "#4e6177", primary: "#635bff", primaryForeground: "#ffffff", ring: "#635bff" }),
    dark: tokens({ background: "#121123", foreground: "#f4f3ff", surface: "#19172b", soft: "#242139", accent: "#2a264a", border: "#403a59", input: "#9d95b4", muted: "#b5afcc", primary: "#b5a5ff", primaryForeground: "#121123", ring: "#b5a5ff" }),
  },
  {
    id: "raycast", name: "Raycast", radius: "0.5rem", brandColor: "#ff6363",
    light: tokens({ background: "#fffafa", foreground: "#292124", surface: "#ffffff", soft: "#faf0f1", accent: "#ffe2e5", border: "#e9d7da", input: "#8a6c74", muted: "#71535b", primary: "#b91c36", primaryForeground: "#ffffff", ring: "#b91c36" }),
    dark: tokens({ background: "#151515", foreground: "#fff4f4", surface: "#202123", soft: "#2c2326", accent: "#372427", border: "#4b373c", input: "#ab8b94", muted: "#bdabad", primary: "#ff6363", primaryForeground: "#181313", ring: "#ff6363" }),
  },
  {
    id: "spotify", name: "Spotify", radius: "1rem", brandColor: "#1ed760",
    light: tokens({ background: "#ffffff", foreground: "#191b19", surface: "#ffffff", soft: "#f1f6f1", accent: "#e4f5e8", border: "#d5e2d7", input: "#697c6d", muted: "#49614f", primary: "#117a37", primaryForeground: "#ffffff", ring: "#117a37" }),
    dark: tokens({ background: "#121212", foreground: "#f5fff6", surface: "#1b1b1b", soft: "#252a25", accent: "#243426", border: "#3a493c", input: "#90a092", muted: "#afc2b2", primary: "#1ed760", primaryForeground: "#101810", ring: "#1ed760" }),
  },
]

export type Preset = (typeof presets)[number]

export function getPreset(id: string | null | undefined): Preset {
  return presets.find(preset => preset.id === id) ?? presets[0]
}

// Base UI renders overlays under body. Landing examples always keep the default theme;
// builder controls and code export also stay outside preset styling.
export const previewPortalTarget = 'body:not(:has(.landing-shell)) > [data-base-ui-portal]:not(:has(.preset-code-dialog, .preset-control-popup))'
export const previewTargets = `.showcase-preview, ${previewPortalTarget}`

export function presetCss(preset: Preset, scope?: string): string {
  const declarations = (values: Record<string, string>, indent = "  ") => Object.entries(values).map(([key, value]) => `${indent}--${key}: ${value};`).join("\n")
  const root = scope ? `:root[data-zuno-preset="${preset.id}"]` : ":root"
  const target = scope ? ` :where(${scope})` : ""
  const darkSelector = scope ? `${root}.dark${target}` : ".dark"
  return `${root}${target} {\n  --radius: ${preset.radius};\n${declarations(preset.light)}\n}\n\n${darkSelector} {\n${declarations(preset.dark)}\n}\n\n@media (prefers-color-scheme: dark) {\n  ${root}:not(.light):not(.dark)${target} {\n${declarations(preset.dark, "    ")}\n  }\n}`
}

export const presetStyles = presets.map(preset => presetCss(preset, previewTargets)).join("\n")

// Restore the attribute before paint; CSS handles explicit and system color modes.
export const presetScript = `try {
  const preset = localStorage.getItem("zuno-preset");
  if (${JSON.stringify(presets.map(preset => preset.id))}.includes(preset)) document.documentElement.dataset.zunoPreset = preset;
} catch {}`

export const builderFonts = {
  inter: '"Inter Variable", Inter, system-ui, sans-serif',
  system: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: '"Geist Mono Variable", ui-monospace, monospace',
}
export const builderFontPackages = { inter: "@fontsource-variable/inter", system: "", mono: "@fontsource-variable/geist-mono" }
export const builderRadii = ["default", "0.25rem", "0.375rem", "0.5rem", "0.75rem", "1rem"]
export type BuilderConfig = { preset: string; base: "preset" | "warm" | "zinc"; radius: string; font: keyof typeof builderFonts; mode: "light" | "dark" }
export const defaultBuilderConfig: BuilderConfig = { preset: "neutral", base: "preset", radius: "default", font: "inter", mode: "dark" }

export function parseBuilderConfig(value: unknown): BuilderConfig {
  const input = value && typeof value === "object" ? value as Record<string, unknown> : {}
  return {
    preset: getPreset(typeof input.preset === "string" ? input.preset : null).id,
    base: input.base === "warm" || input.base === "zinc" ? input.base : "preset",
    radius: typeof input.radius === "string" && builderRadii.includes(input.radius) ? input.radius : "default",
    font: input.font === "system" || input.font === "mono" ? input.font : "inter",
    mode: input.mode === "light" ? "light" : "dark",
  }
}

export function buildPreset(config: BuilderConfig): Preset {
  const preset = getPreset(config.preset)
  const base = getPreset(config.base === "warm" ? "neutral" : config.base === "zinc" ? "vercel" : preset.id)
  const accentTokens = ["primary", "primary-foreground", "ring", "sidebar-primary", "sidebar-primary-foreground", "sidebar-ring"]
  const merge = (mode: "light" | "dark") => ({ ...base[mode], ...Object.fromEntries(accentTokens.map(key => [key, preset[mode][key]])) })
  return { ...preset, radius: config.radius === "default" ? preset.radius : config.radius, light: merge("light"), dark: merge("dark") }
}

// Forced preview appearance also needs the state roles from the registered theme.
// The token test checks these defaults against both source stylesheets.
const builderModeTokens = {
  "light": {
    "destructive-foreground": "#ffffff",
    "chart-1": "#4338ca",
    "chart-2": "#0f766e",
    "chart-3": "#b45309",
    "chart-4": "#be185d",
    "chart-5": "#0369a1",
    "destructive": "#b91c1c",
    "zuno-destructive-solid": "#b91c1c",
    "zuno-destructive-solid-foreground": "#ffffff",
    "zuno-success": "#15803d",
    "zuno-success-surface": "#f0fdf4",
    "zuno-warning": "#92400e",
    "zuno-warning-surface": "#fffbeb",
    "zuno-info": "#1d4ed8",
    "zuno-info-surface": "#eff6ff",
    "zuno-error": "#b91c1c",
    "zuno-error-surface": "#fef2f2"
  },
  "dark": {
    "destructive-foreground": "#2b1416",
    "chart-1": "#a5b4fc",
    "chart-2": "#5eead4",
    "chart-3": "#fcd34d",
    "chart-4": "#f9a8d4",
    "chart-5": "#7dd3fc",
    "destructive": "#fca5a5",
    "zuno-destructive-solid": "#dc2626",
    "zuno-destructive-solid-foreground": "#ffffff",
    "zuno-success": "#86efac",
    "zuno-success-surface": "#10251a",
    "zuno-warning": "#fcd34d",
    "zuno-warning-surface": "#2b2110",
    "zuno-info": "#93c5fd",
    "zuno-info-surface": "#142238",
    "zuno-error": "#fca5a5",
    "zuno-error-surface": "#2b1416"
  }
}

export function builderPreviewCss(config: BuilderConfig): string {
  const preset = buildPreset(config)
  const values = { ...builderModeTokens[config.mode], ...preset[config.mode], radius: preset.radius }
  const declarations = Object.entries(values).map(([key, value]) => `  --${key}: ${value};`).join("\n")
  return `.preset-builder-canvas, :root[data-zuno-preset] ${previewPortalTarget} {\n${declarations}\n  font-family: ${builderFonts[config.font]};\n  color-scheme: ${config.mode};\n}`
}

export function builderExportCss(config: BuilderConfig): string {
  const fontPackage = builderFontPackages[config.font]
  const fontImport = fontPackage ? `/* Install the font first: npm install ${fontPackage} */\n@import "${fontPackage}";\n\n` : ""
  return `/* ZUNO — ${getPreset(config.preset).name} preset.\n   Paste after your ZUNO theme import, before other CSS rules.\n   Replace any previous preset block. */\n\n${fontImport}${presetCss(buildPreset(config))}\n\n@theme inline {\n  --font-sans: ${builderFonts[config.font]};\n}\n\n@layer base {\n  body { font-family: var(--font-sans); }\n}\n`
}
