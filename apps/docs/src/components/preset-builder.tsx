"use client"

import { useEffect, useState } from "react"
import { CopyButton } from "@/kit/copy-button"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { TypographyH1 } from "@/components/ui/typography"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { PresetBuilderPreview } from "@/components/preset-builder-preview"
import { builderExportCss, builderFontPackages, builderPreviewCss, builderRadii, defaultBuilderConfig, getPreset, parseBuilderConfig, presets, type BuilderConfig } from "@/lib/presets"

const baseOptions = [
  { value: "preset", label: "Preset default" },
  { value: "warm", label: "Warm gray" },
  { value: "zinc", label: "Zinc" },
] satisfies { value: BuilderConfig["base"]; label: string }[]
const fontOptions = [
  { value: "inter", label: "Inter" },
  { value: "system", label: "System" },
  { value: "mono", label: "Geist Mono" },
] satisfies { value: BuilderConfig["font"]; label: string }[]

export function PresetBuilder() {
  const [config, setConfig] = useState(defaultBuilderConfig)
  const [ready, setReady] = useState(false)
  const [shareLink, setShareLink] = useState("")
  const [codeOpen, setCodeOpen] = useState(false)
  useEffect(() => {
    let saved: unknown = { ...defaultBuilderConfig, preset: document.documentElement.dataset.zunoPreset }
    const params = new URLSearchParams(window.location.search)
    if (params.has("preset")) saved = Object.fromEntries(params)
    else try {
      const stored = localStorage.getItem("zuno-preset-builder")
      if (stored) saved = JSON.parse(stored)
    } catch { /* Use the last selected brand if storage is unavailable. */ }
    setConfig(parseBuilderConfig(saved))
    setReady(true)
  }, [])
  useEffect(() => {
    if (!ready) return
    document.documentElement.dataset.zunoPreset = config.preset
    try {
      localStorage.setItem("zuno-preset", config.preset)
      localStorage.setItem("zuno-preset-builder", JSON.stringify(config))
    } catch { /* Customization still works without storage. */ }
    const query = new URLSearchParams(config)
    window.history.replaceState(null, "", `${window.location.pathname}?${query}`)
    setShareLink(window.location.href)
  }, [config, ready])
  const preset = getPreset(config.preset)
  const presetOptions = presets.map(option => ({ value: option.id, label: option.name }))
  const radiusOptions = builderRadii.map(value => ({ value, label: value === "default" ? `Default · ${parseFloat(preset.radius) * 16}px` : `${parseFloat(value) * 16}px` }))
  const css = builderExportCss(config)
  function change<K extends keyof BuilderConfig>(key: K, value: BuilderConfig[K]) {
    setConfig(current => ({ ...current, [key]: value }))
  }

  return <div className="preset-builder">
    <style>{builderPreviewCss(config)}</style>
    <Card className="builder-controls" role="complementary" aria-label="Customize your preset">
      <CardHeader className="builder-controls-heading"><TypographyH1 className="text-base/6 tracking-normal sm:text-base/6">Create preset</TypographyH1></CardHeader>
      <Separator />
      <CardContent className="builder-controls-fields">
        <div className="builder-control">
          <Label htmlFor="builder-preset" className="flex items-center justify-between text-xs text-muted-foreground">Preset <span className="size-2.5 rounded-full" style={{ background: preset.brandColor }} aria-hidden="true" /></Label>
          <Select items={presetOptions} value={config.preset} onValueChange={value => { if (value !== null) setConfig({ ...defaultBuilderConfig, preset: value, mode: config.mode }) }}>
            <SelectTrigger id="builder-preset" aria-label="Preset"><SelectValue /></SelectTrigger>
            <SelectContent className="preset-control-popup">{presets.map(option => <SelectItem key={option.id} value={option.id}>{option.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="builder-control">
          <Label htmlFor="builder-base" className="text-xs text-muted-foreground">Base color</Label>
          <Select items={baseOptions} value={config.base} onValueChange={value => { if (value !== null) change("base", value) }}>
            <SelectTrigger id="builder-base" aria-label="Base color"><SelectValue /></SelectTrigger>
            <SelectContent className="preset-control-popup">{baseOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="builder-control">
          <Label htmlFor="builder-radius" className="text-xs text-muted-foreground">Radius</Label>
          <Select items={radiusOptions} value={config.radius} onValueChange={value => { if (value !== null) change("radius", value) }}>
            <SelectTrigger id="builder-radius" aria-label="Radius"><SelectValue /></SelectTrigger>
            <SelectContent className="preset-control-popup">{radiusOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="builder-control">
          <Label htmlFor="builder-font" className="text-xs text-muted-foreground">Font</Label>
          <Select items={fontOptions} value={config.font} onValueChange={value => { if (value !== null) change("font", value) }}>
            <SelectTrigger id="builder-font" aria-label="Font"><SelectValue /></SelectTrigger>
            <SelectContent className="preset-control-popup">{fontOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="builder-control">
          <Label id="builder-appearance-label" className="text-xs text-muted-foreground">Appearance</Label>
          <ToggleGroup variant="outline" size="sm" className="builder-mode" aria-labelledby="builder-appearance-label" value={[config.mode]} onValueChange={values => { const mode = values[0]; if (mode === "light" || mode === "dark") change("mode", mode) }}>
            <ToggleGroupItem value="light"><span aria-hidden="true">☀</span> Light</ToggleGroupItem>
            <ToggleGroupItem value="dark"><span aria-hidden="true">☾</span> Dark</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="builder-controls-actions flex-col items-stretch">
        <div className="builder-secondary-actions"><Button type="button" variant="outline" size="sm" onClick={() => {
          const others = presets.filter(option => option.id !== config.preset)
          setConfig({ ...config, preset: others[Math.floor(Math.random() * others.length)].id, base: "preset", radius: builderRadii[1 + Math.floor(Math.random() * (builderRadii.length - 1))] })
        }}><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 4h2l8 8h2m-3-3 3 3-3 3M2 12h2l3-3m2-2 3-3h2m-3-3 3 3-3 3" /></svg> Shuffle</Button><Button type="button" variant="outline" size="sm" onClick={() => setConfig({ ...defaultBuilderConfig, preset: config.preset, mode: config.mode })}>Reset</Button></div>
        <Button className="w-full" type="button" onClick={() => setCodeOpen(true)}>Get Code <span aria-hidden="true">↗</span></Button>
        <div className="builder-share">{ready && <CopyButton value={shareLink} label="Copy link" variant="ghost" size="sm">Copy link</CopyButton>}</div>
      </CardFooter>
    </Card>
    <section className="builder-stage" aria-label="Preset playground">
      <div className="preset-builder-canvas" role="region" aria-label="Live component preview"><PresetBuilderPreview /></div>
    </section>
    <Dialog open={codeOpen} onOpenChange={setCodeOpen}>
      <DialogContent className="preset-code-dialog max-w-2xl">
        <DialogHeader><DialogTitle>Your preset is ready</DialogTitle><DialogDescription>Replace your previous preset block after the ZUNO theme import in your global CSS. Both light and dark colors are included.</DialogDescription></DialogHeader>
        {builderFontPackages[config.font] && <p className="text-sm text-muted-foreground">Install the selected font first: <code className="break-all">npm install {builderFontPackages[config.font]}</code>. Keep the font import before other CSS rules.</p>}
        <pre className="builder-code" tabIndex={0} aria-label="Generated preset CSS"><code>{css}</code></pre>
        <DialogFooter><CopyButton value={css} label="Copy CSS">Copy CSS</CopyButton><Button variant="outline" onClick={() => {
          const url = URL.createObjectURL(new Blob([css], { type: "text/css" }))
          const link = document.createElement("a")
          link.href = url
          link.download = `zuno-${preset.id}.css`
          link.click()
          setTimeout(() => URL.revokeObjectURL(url), 1000)
        }}>Download CSS</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
}
