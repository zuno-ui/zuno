"use client"

import { useState, type ComponentType, type ComponentProps, type ReactNode, type ReactElement, type SVGProps } from "react"
import { meta, type ComponentMeta, type ExampleMeta } from "./catalog-meta"
export { meta, componentNames, metaByName } from "./catalog-meta"
export type { ComponentMeta, ExampleMeta } from "./catalog-meta"

// Client render closures for the catalog, keyed by component name / example id.
// Pure metadata lives in catalog-meta.ts so Server Components can read it without a client boundary.

export type DemoComponents = {
  Input: ComponentType<ComponentProps<"input">>
  Textarea: ComponentType<ComponentProps<"textarea">>
  Button: ComponentType<ComponentProps<"button"> & { variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link"; size?: "sm" | "default" | "lg" | "icon"; loading?: boolean }>
  Form: ComponentType<{ children: ReactNode; className?: string; onSubmit?: ComponentProps<"form">["onSubmit"] }>
  Field: ComponentType<{ children: ReactNode; name?: string; invalid?: boolean; disabled?: boolean }>
  FieldLabel: ComponentType<{ children: ReactNode }>
  FieldControl: ComponentType<ComponentProps<"input">>
  FieldDescription: ComponentType<{ children: ReactNode }>
  FieldError: ComponentType<{ children: ReactNode; match?: "valueMissing" | "typeMismatch" }>
  Container: ComponentType<ComponentProps<"div"> & { size?: "reading" | "form" | "content" | "dashboard" }>
  Stack: ComponentType<ComponentProps<"div"> & { gap?: "2" | "4" | "6" | "8"; align?: "start" | "center" | "stretch" }>
  Cluster: ComponentType<ComponentProps<"div"> & { gap?: "2" | "3" | "4"; align?: "start" | "center" | "between" }>
  ResponsiveGrid: ComponentType<ComponentProps<"div"> & { min?: string; gap?: "4" | "6" | "8" }>
  Card: ComponentType<ComponentProps<"div">>
  CardHeader: ComponentType<ComponentProps<"div">>
  CardTitle: ComponentType<ComponentProps<"h3">>
  CardDescription: ComponentType<ComponentProps<"p">>
  CardContent: ComponentType<ComponentProps<"div">>
  CardFooter: ComponentType<ComponentProps<"div">>
  Badge: ComponentType<ComponentProps<"span"> & { variant?: "default" | "secondary" | "outline" | "destructive" }>
  Separator: ComponentType<ComponentProps<"div"> & { orientation?: "horizontal" | "vertical"; decorative?: boolean }>
  Skeleton: ComponentType<ComponentProps<"div">>
  Spinner: ComponentType<ComponentProps<"svg"> & { label?: string }>
  Icon: ComponentType<Omit<ComponentProps<"svg">, "children"> & { icon: ComponentType<SVGProps<SVGSVGElement>>; size?: "xs" | "sm" | "md" | "lg" | "xl"; label?: string }>
  Label: ComponentType<ComponentProps<"label">>
  Empty: ComponentType<ComponentProps<"div">>
  EmptyMedia: ComponentType<ComponentProps<"div">>
  EmptyTitle: ComponentType<ComponentProps<"h3">>
  EmptyDescription: ComponentType<ComponentProps<"p">>
  EmptyActions: ComponentType<ComponentProps<"div">>
  Alert: ComponentType<ComponentProps<"div"> & { variant?: "default" | "success" | "warning" | "info" | "destructive" }>
  AlertContent: ComponentType<ComponentProps<"div">>
  AlertTitle: ComponentType<ComponentProps<"div">>
  AlertDescription: ComponentType<ComponentProps<"div">>
  PageHeader: ComponentType<ComponentProps<"div">>
  PageHeaderContent: ComponentType<ComponentProps<"div">>
  PageHeaderHeading: ComponentType<ComponentProps<"h1">>
  PageHeaderDescription: ComponentType<ComponentProps<"p">>
  PageHeaderActions: ComponentType<ComponentProps<"div">>
  FormSection: ComponentType<ComponentProps<"fieldset">>
  FormSectionHeader: ComponentType<ComponentProps<"div">>
  FormSectionTitle: ComponentType<ComponentProps<"legend">>
  FormSectionDescription: ComponentType<ComponentProps<"p">>
  FormSectionContent: ComponentType<ComponentProps<"div">>
  StatusBadge: ComponentType<ComponentProps<"span"> & { status?: "neutral" | "success" | "warning" | "info" | "error"; indicator?: boolean }>
  PasswordInput: ComponentType<ComponentProps<"input">>
  SearchInput: ComponentType<ComponentProps<"input"> & { loading?: boolean; onClear?: () => void }>
  CopyButton: ComponentType<ComponentProps<"button"> & { value: string; label?: string }>
  Checkbox: ComponentType<{ id?: string; className?: string; defaultChecked?: boolean; checked?: boolean; onCheckedChange?: (checked: boolean) => void; indeterminate?: boolean; disabled?: boolean; name?: string; value?: string; "aria-label"?: string }>
  Switch: ComponentType<{ id?: string; className?: string; defaultChecked?: boolean; checked?: boolean; onCheckedChange?: (checked: boolean) => void; disabled?: boolean; name?: string; "aria-label"?: string }>
  Tabs: ComponentType<{ children: ReactNode; className?: string; defaultValue?: string; value?: string; onValueChange?: (value: string) => void; variant?: "segmented" | "underline" | "ghost" | "solid"; shape?: "rounded" | "pill"; indicatorPosition?: "bottom" | "top" }>
  TabsList: ComponentType<{ children: ReactNode; className?: string; "aria-label"?: string }>
  TabsTab: ComponentType<{ children: ReactNode; value: string; className?: string; disabled?: boolean }>
  TabsPanel: ComponentType<{ children: ReactNode; value: string; className?: string; keepMounted?: boolean }>
  Avatar: ComponentType<{ children?: ReactNode; className?: string; size?: "sm" | "default" | "lg" }>
  AvatarImage: ComponentType<{ src?: string; alt?: string; className?: string }>
  AvatarFallback: ComponentType<{ children?: ReactNode; className?: string }>
  TooltipProvider: ComponentType<{ children?: ReactNode }>
  Tooltip: ComponentType<{ children?: ReactNode }>
  TooltipTrigger: ComponentType<{ children?: ReactNode; render?: ReactElement }>
  TooltipContent: ComponentType<{ children?: ReactNode; className?: string; sideOffset?: number }>
  Dialog: ComponentType<{ children?: ReactNode; dismissible?: boolean }>
  DialogTrigger: ComponentType<{ children?: ReactNode; render?: ReactElement }>
  DialogClose: ComponentType<{ children?: ReactNode; render?: ReactElement }>
  DialogContent: ComponentType<{ children?: ReactNode; className?: string; size?: "sm" | "default" | "lg"; showClose?: boolean }>
  DialogHeader: ComponentType<{ children?: ReactNode; className?: string }>
  DialogFooter: ComponentType<{ children?: ReactNode; className?: string }>
  DialogTitle: ComponentType<{ children?: ReactNode; className?: string }>
  DialogDescription: ComponentType<{ children?: ReactNode; className?: string }>
  AlertDialog: ComponentType<{ children?: ReactNode }>
  AlertDialogTrigger: ComponentType<{ children?: ReactNode; render?: ReactElement }>
  AlertDialogClose: ComponentType<{ children?: ReactNode; render?: ReactElement }>
  AlertDialogContent: ComponentType<{ children?: ReactNode; className?: string }>
  AlertDialogHeader: ComponentType<{ children?: ReactNode; className?: string }>
  AlertDialogFooter: ComponentType<{ children?: ReactNode; className?: string }>
  AlertDialogTitle: ComponentType<{ children?: ReactNode; className?: string }>
  AlertDialogDescription: ComponentType<{ children?: ReactNode; className?: string }>
  DropdownMenu: ComponentType<{ children?: ReactNode }>
  DropdownMenuTrigger: ComponentType<{ children?: ReactNode; render?: ReactElement }>
  DropdownMenuContent: ComponentType<{ children?: ReactNode; className?: string; align?: "start" | "center" | "end" }>
  DropdownMenuItem: ComponentType<{ children?: ReactNode; className?: string; onClick?: () => void; disabled?: boolean }>
  DropdownMenuLabel: ComponentType<{ children?: ReactNode; className?: string }>
  DropdownMenuSeparator: ComponentType<{ className?: string }>
  Select: ComponentType<{ children?: ReactNode; defaultValue?: string; value?: string; onValueChange?: (value: string | null, eventDetails: unknown) => void; name?: string; disabled?: boolean }>
  SelectTrigger: ComponentType<{ children?: ReactNode; className?: string }>
  SelectValue: ComponentType<{ placeholder?: string; className?: string }>
  SelectContent: ComponentType<{ children?: ReactNode; className?: string; sideOffset?: number }>
  SelectItem: ComponentType<{ children?: ReactNode; value: string; className?: string; disabled?: boolean }>
  SelectGroup: ComponentType<{ children?: ReactNode }>
  SelectGroupLabel: ComponentType<{ children?: ReactNode; className?: string }>
  SelectSeparator: ComponentType<{ className?: string }>
  ToastProvider: ComponentType<{ children?: ReactNode }>
  Toaster: ComponentType<{ className?: string }>
  useToast: () => { add: (options: { title?: ReactNode; description?: ReactNode; type?: string; timeout?: number }) => string; close: (id?: string) => void }
}

type Render = (ui: DemoComponents) => ReactNode
export type Example = ExampleMeta & { render: Render }
export type CatalogEntry = Omit<ComponentMeta, "examples"> & { preview: Render; examples: Example[] }

// Demo icons mirror the lucide-react shapes shown in the code snippets. The Icon component
// accepts any SVG component, so the showcase stays dependency-free while documenting the lucide usage.
const svgBase: SVGProps<SVGSVGElement> = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }
const BellIcon = (props: SVGProps<SVGSVGElement>) => <svg {...svgBase} {...props}><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></svg>
const CircleCheckIcon = (props: SVGProps<SVGSVGElement>) => <svg {...svgBase} {...props}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
const TriangleAlertIcon = (props: SVGProps<SVGSVGElement>) => <svg {...svgBase} {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
const PlusIcon = (props: SVGProps<SVGSVGElement>) => <svg {...svgBase} {...props}><path d="M5 12h14" /><path d="M12 5v14" /></svg>

function EmailExample({ ui }: { ui: DemoComponents }) {
  const { Field, FieldLabel, FieldControl, FieldDescription, FieldError, Form, Button } = ui
  const [submitted, setSubmitted] = useState(false)
  return <Form className="showcase-example-form" onSubmit={event => { event.preventDefault(); setSubmitted(true) }}>
    <Field name="email">
      <FieldLabel>Correo electrónico</FieldLabel>
      <FieldControl type="email" required placeholder="nombre@empresa.com" onChange={() => setSubmitted(false)} />
      <FieldDescription>Tu correo de trabajo, sin mensajes extra.</FieldDescription>
      <FieldError match="valueMissing">Escribe tu correo electrónico.</FieldError>
      <FieldError match="typeMismatch">Escribe un correo válido.</FieldError>
    </Field>
    <div className="showcase-form-footer"><Button type="submit">Continuar <span aria-hidden="true">↗</span></Button><span role="status">{submitted ? "Datos válidos. Demo completada." : ""}</span></div>
  </Form>
}

function TextControlExample({ ui, multiline }: { ui: DemoComponents; multiline: boolean }) {
  const { Field, FieldLabel, FieldDescription, FieldError, Form, Button, Input, Textarea } = ui
  const [submitted, setSubmitted] = useState(false)
  const Control = multiline ? Textarea : Input
  return <Form className="showcase-example-form" onSubmit={event => { event.preventDefault(); setSubmitted(true) }}>
    <Field name={multiline ? "message" : "name"}>
      <FieldLabel>{multiline ? "Mensaje" : "Nombre"}</FieldLabel>
      <Control required placeholder={multiline ? "Cuéntanos sobre tu proyecto" : "Tu nombre"} onChange={() => setSubmitted(false)} />
      <FieldDescription>{multiline ? "Incluye los detalles que consideres útiles." : "Como quieres que te llamemos."}</FieldDescription>
      <FieldError match="valueMissing">Completa este campo.</FieldError>
    </Field>
    <div className="showcase-form-footer"><Button type="submit">Validar</Button><span role="status">{submitted ? "Datos válidos. Demo completada." : ""}</span></div>
  </Form>
}

function ButtonLoadingExample({ ui }: { ui: DemoComponents }) {
  const { Button } = ui
  const [loading, setLoading] = useState(false)
  return <div className="showcase-button-row items-center">
    <Button loading={loading} onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1600) }}>Guardar cambios</Button>
    <Button variant="outline" loading>Cargando</Button>
  </div>
}

function SearchExample({ ui }: { ui: DemoComponents }) {
  const { SearchInput } = ui
  const [query, setQuery] = useState("Proyecto")
  return <div className="showcase-example-form"><SearchInput value={query} onChange={event => setQuery(event.target.value)} onClear={() => setQuery("")} placeholder="Buscar proyectos…" aria-label="Buscar proyectos" /></div>
}

// Toast needs a provider ancestor and a hook; each demo is self-contained with its own provider + viewport.
function ToastExample({ ui }: { ui: DemoComponents }) {
  const { ToastProvider, Toaster } = ui
  return <ToastProvider><ToastTriggers ui={ui} /><Toaster /></ToastProvider>
}
function ToastTriggers({ ui }: { ui: DemoComponents }) {
  const { Button, useToast } = ui
  const toast = useToast()
  return <div className="showcase-button-row">
    <Button onClick={() => toast.add({ title: "Cambios guardados", description: "Tu configuración se actualizó.", type: "success" })}>Guardar</Button>
    <Button variant="outline" onClick={() => toast.add({ title: "Espacio casi lleno", description: "Estás al 90% de tu almacenamiento.", type: "warning" })}>Avisar</Button>
    <Button variant="outline" onClick={() => toast.add({ title: "Nueva versión disponible", description: "Recarga para actualizar.", type: "info" })}>Informar</Button>
    <Button variant="outline" onClick={() => toast.add({ title: "No se pudo publicar", description: "Revisa tu conexión e inténtalo de nuevo.", type: "error" })}>Publicar</Button>
  </div>
}

const box = "rounded-lg border border-border bg-card px-4 py-3 text-sm text-card-foreground"

const renderers: Record<string, { preview: Render; examples: Record<string, Render> }> = {
  button: {
    preview: ({ Button }) => <Button>Crear proyecto</Button>,
    examples: {
      "button-variants": ({ Button }) => <div className="showcase-button-row"><Button>Guardar</Button><Button variant="secondary">Duplicar</Button><Button variant="outline">Cancelar</Button><Button variant="ghost">Descartar</Button><Button variant="destructive">Eliminar</Button><Button variant="link">Saber más</Button></div>,
      "button-sizes": ({ Button }) => <div className="showcase-button-row items-center"><Button size="sm">Pequeño</Button><Button>Mediano</Button><Button size="lg">Grande</Button><Button size="icon" aria-label="Añadir"><span aria-hidden="true">+</span></Button></div>,
      "button-loading": ui => <ButtonLoadingExample ui={ui} />,
      "button-disabled": ({ Button }) => <div className="showcase-button-row"><Button disabled>Guardar</Button><Button variant="outline" disabled>Sin acceso</Button></div>,
    },
  },
  field: {
    preview: ui => <EmailExample ui={ui} />,
    examples: {
      "field-validation": ui => <EmailExample ui={ui} />,
      "field-description": ({ Field, FieldLabel, FieldControl, FieldDescription }) => <div className="showcase-example-form"><Field name="project"><FieldLabel>Nombre del proyecto</FieldLabel><FieldControl placeholder="Mi próximo proyecto" /><FieldDescription>Puedes cambiarlo después.</FieldDescription></Field></div>,
      "field-disabled": ({ Field, FieldLabel, FieldControl, FieldDescription }) => <div className="showcase-example-form showcase-disabled"><Field name="workspace" disabled><FieldLabel>Espacio de trabajo</FieldLabel><FieldControl value="Acme Studio" /><FieldDescription>Administrado por tu organización.</FieldDescription></Field></div>,
    },
  },
  input: {
    preview: ({ Input }) => <label className="showcase-example-form">Nombre<Input placeholder="Tu nombre" /></label>,
    examples: {
      "input-validation": ui => <TextControlExample ui={ui} multiline={false} />,
      "input-disabled": ({ Input }) => <label className="showcase-example-form">Referencia<Input disabled defaultValue="Proyecto ZUNO" /></label>,
      "input-readonly": ({ Input }) => <label className="showcase-example-form">Referencia<Input readOnly defaultValue="Proyecto ZUNO" /></label>,
    },
  },
  textarea: {
    preview: ({ Textarea }) => <label className="showcase-example-form">Mensaje<Textarea placeholder="Escribe tu mensaje…" /></label>,
    examples: {
      "textarea-validation": ui => <TextControlExample ui={ui} multiline={true} />,
      "textarea-disabled": ({ Textarea }) => <label className="showcase-example-form">Referencia<Textarea disabled defaultValue="Proyecto ZUNO" /></label>,
      "textarea-readonly": ({ Textarea }) => <label className="showcase-example-form">Referencia<Textarea readOnly defaultValue="Proyecto ZUNO" /></label>,
    },
  },
  container: {
    preview: ({ Container }) => <Container size="form" className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">Contenido centrado con un ancho de lectura cómodo.</Container>,
    examples: {
      "container-sizes": ({ Container, Stack }) => <Stack gap="2" className="w-full">{(["reading", "form", "content"] as const).map(size => <Container key={size} size={size} className={box + " w-full text-center"}>size=&quot;{size}&quot;</Container>)}</Stack>,
    },
  },
  stack: {
    preview: ({ Stack }) => <Stack gap="4" className="w-full">{["Perfil", "Facturación", "Seguridad"].map(item => <div key={item} className={box}>{item}</div>)}</Stack>,
    examples: {
      "stack-gap": ({ Stack }) => <Stack gap="4" className="w-full">{["Perfil", "Facturación", "Seguridad"].map(item => <div key={item} className={box}>{item}</div>)}</Stack>,
    },
  },
  cluster: {
    preview: ({ Cluster }) => <Cluster gap="2" className="w-full">{["Diseño", "Accesible", "Ligero", "Editable"].map(tag => <span key={tag} className="rounded-full border border-border bg-muted px-3 py-1 text-sm text-foreground">{tag}</span>)}</Cluster>,
    examples: {
      "cluster-tags": ({ Cluster }) => <Cluster gap="2" className="w-full">{["Diseño", "Accesible", "Ligero", "Editable", "Base UI", "Tailwind"].map(tag => <span key={tag} className="rounded-full border border-border bg-muted px-3 py-1 text-sm text-foreground">{tag}</span>)}</Cluster>,
      "cluster-between": ({ Cluster, Button }) => <Cluster align="between" className="w-full"><span className="text-sm font-medium">Miembros del equipo</span><Button size="sm">Invitar</Button></Cluster>,
    },
  },
  "responsive-grid": {
    preview: ({ ResponsiveGrid }) => <ResponsiveGrid min="9rem" gap="4" className="w-full">{["Uno", "Dos", "Tres", "Cuatro"].map(item => <div key={item} className={box + " text-center"}>{item}</div>)}</ResponsiveGrid>,
    examples: {
      "grid-cards": ({ ResponsiveGrid }) => <ResponsiveGrid min="9rem" gap="4" className="w-full">{["Uno", "Dos", "Tres", "Cuatro", "Cinco", "Seis"].map(item => <div key={item} className={box + " text-center"}>{item}</div>)}</ResponsiveGrid>,
    },
  },
  card: {
    preview: ({ Card, CardHeader, CardTitle, CardDescription, CardContent }) => <Card className="w-full max-w-sm"><CardHeader><CardTitle>Plan Pro</CardTitle><CardDescription>Facturación mensual, cancela cuando quieras.</CardDescription></CardHeader><CardContent className="text-sm text-muted-foreground">Colaboración en tiempo real, historial y soporte prioritario.</CardContent></Card>,
    examples: {
      "card-basic": ({ Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button }) => <Card className="w-full max-w-sm"><CardHeader><CardTitle>Plan Pro</CardTitle><CardDescription>Facturación mensual, cancela cuando quieras.</CardDescription></CardHeader><CardContent className="text-sm text-muted-foreground">Colaboración en tiempo real, historial y soporte prioritario.</CardContent><CardFooter><Button>Elegir plan</Button><Button variant="outline">Comparar</Button></CardFooter></Card>,
    },
  },
  badge: {
    preview: ({ Badge }) => <Badge>Nuevo</Badge>,
    examples: {
      "badge-variants": ({ Badge }) => <div className="showcase-button-row"><Badge>Nuevo</Badge><Badge variant="secondary">Beta</Badge><Badge variant="outline">v1.0</Badge><Badge variant="destructive">Obsoleto</Badge></div>,
    },
  },
  separator: {
    preview: ({ Separator }) => <div className="w-full"><div className="text-sm">Sección A</div><Separator className="my-3" /><div className="text-sm">Sección B</div></div>,
    examples: {
      "separator-orientation": ({ Separator }) => <div className="w-full"><div className="text-sm">Sección A</div><Separator className="my-3" /><div className="text-sm">Sección B</div><div className="mt-3 flex h-8 items-center gap-3 text-sm">Izquierda<Separator orientation="vertical" />Derecha</div></div>,
    },
  },
  skeleton: {
    preview: ({ Skeleton }) => <div className="flex w-full max-w-sm items-center gap-3"><Skeleton className="size-10 rounded-full" /><div className="flex flex-1 flex-col gap-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-1/2" /></div></div>,
    examples: {
      "skeleton-card": ({ Skeleton }) => <div className="flex w-full max-w-sm items-center gap-3"><Skeleton className="size-10 rounded-full" /><div className="flex flex-1 flex-col gap-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-1/2" /></div></div>,
    },
  },
  spinner: {
    preview: ({ Spinner }) => <Spinner className="size-6" />,
    examples: {
      "spinner-sizes": ({ Spinner }) => <div className="showcase-button-row items-center"><Spinner className="size-4" /><Spinner className="size-6" /><Spinner className="size-8 text-muted-foreground" /></div>,
    },
  },
  icon: {
    preview: ({ Icon }) => <Icon icon={BellIcon} size="lg" />,
    examples: {
      "icon-sizes": ({ Icon }) => <div className="showcase-button-row items-center"><Icon icon={BellIcon} size="xs" /><Icon icon={BellIcon} size="sm" /><Icon icon={BellIcon} size="md" /><Icon icon={BellIcon} size="lg" /><Icon icon={BellIcon} size="xl" /></div>,
      "icon-meaningful": ({ Icon }) => <div className="showcase-button-row items-center"><Icon icon={CircleCheckIcon} size="lg" label="Completado" className="text-zuno-success" /><Icon icon={TriangleAlertIcon} size="lg" label="Advertencia" className="text-zuno-warning" /></div>,
      "icon-in-button": ({ Icon, Button }) => <Button size="icon" aria-label="Añadir proyecto"><Icon icon={PlusIcon} /></Button>,
    },
  },
  label: {
    preview: ({ Label }) => <Label>Correo electrónico</Label>,
    examples: {
      "label-input": ({ Label, Input }) => <div className="showcase-example-form"><Label htmlFor="demo-name">Nombre completo</Label><Input id="demo-name" placeholder="Tu nombre" /></div>,
    },
  },
  empty: {
    preview: ({ Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyActions, Button }) => <Empty className="w-full"><EmptyMedia aria-hidden="true">◍</EmptyMedia><EmptyTitle>Sin proyectos todavía</EmptyTitle><EmptyDescription>Crea tu primer proyecto para empezar a colaborar con tu equipo.</EmptyDescription><EmptyActions><Button>Crear proyecto</Button></EmptyActions></Empty>,
    examples: {
      "empty-basic": ({ Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyActions, Button }) => <Empty className="w-full"><EmptyMedia aria-hidden="true">◍</EmptyMedia><EmptyTitle>Sin proyectos todavía</EmptyTitle><EmptyDescription>Crea tu primer proyecto para empezar a colaborar con tu equipo.</EmptyDescription><EmptyActions><Button>Crear proyecto</Button><Button variant="outline">Importar</Button></EmptyActions></Empty>,
    },
  },
  alert: {
    preview: ({ Alert, AlertContent, AlertTitle, AlertDescription }) => <Alert variant="success" className="w-full"><AlertContent><AlertTitle>Cambios guardados</AlertTitle><AlertDescription>Tu configuración se actualizó correctamente.</AlertDescription></AlertContent></Alert>,
    examples: {
      "alert-variants": ({ Alert, AlertContent, AlertTitle, AlertDescription }) => <div className="flex w-full flex-col gap-2"><Alert variant="success"><AlertContent><AlertTitle>Cambios guardados</AlertTitle><AlertDescription>Tu configuración se actualizó correctamente.</AlertDescription></AlertContent></Alert><Alert variant="warning"><AlertContent><AlertTitle>Espacio casi lleno</AlertTitle><AlertDescription>Estás usando el 90% de tu almacenamiento.</AlertDescription></AlertContent></Alert><Alert variant="destructive"><AlertContent><AlertTitle>No se pudo publicar</AlertTitle><AlertDescription>Revisa tu conexión e inténtalo de nuevo.</AlertDescription></AlertContent></Alert></div>,
      "alert-composed": ({ Alert, AlertContent, AlertTitle, AlertDescription }) => <Alert variant="info" className="w-full"><span aria-hidden="true">ⓘ</span><AlertContent><AlertTitle>Nueva versión disponible</AlertTitle><AlertDescription>Actualiza para obtener las últimas mejoras.</AlertDescription></AlertContent></Alert>,
    },
  },
  "page-header": {
    preview: ({ PageHeader, PageHeaderContent, PageHeaderHeading, PageHeaderDescription, PageHeaderActions, Button }) => <PageHeader className="w-full"><PageHeaderContent><PageHeaderHeading>Proyectos</PageHeaderHeading><PageHeaderDescription>Gestiona y organiza tu trabajo.</PageHeaderDescription></PageHeaderContent><PageHeaderActions><Button>Nuevo proyecto</Button></PageHeaderActions></PageHeader>,
    examples: {
      "page-header-basic": ({ PageHeader, PageHeaderContent, PageHeaderHeading, PageHeaderDescription, PageHeaderActions, Button }) => <PageHeader className="w-full"><PageHeaderContent><PageHeaderHeading>Proyectos</PageHeaderHeading><PageHeaderDescription>Gestiona y organiza tu trabajo.</PageHeaderDescription></PageHeaderContent><PageHeaderActions><Button variant="outline">Importar</Button><Button>Nuevo proyecto</Button></PageHeaderActions></PageHeader>,
    },
  },
  "form-section": {
    preview: ({ FormSection, FormSectionHeader, FormSectionTitle, FormSectionDescription, FormSectionContent, Field, FieldLabel, FieldControl }) => <FormSection className="w-full max-w-md"><FormSectionHeader><FormSectionTitle>Perfil</FormSectionTitle><FormSectionDescription>Cómo te ven los demás.</FormSectionDescription></FormSectionHeader><FormSectionContent><Field name="name"><FieldLabel>Nombre</FieldLabel><FieldControl placeholder="Tu nombre" /></Field></FormSectionContent></FormSection>,
    examples: {
      "form-section-basic": ({ FormSection, FormSectionHeader, FormSectionTitle, FormSectionDescription, FormSectionContent, Field, FieldLabel, FieldControl }) => <FormSection className="w-full max-w-md"><FormSectionHeader><FormSectionTitle>Perfil</FormSectionTitle><FormSectionDescription>Cómo te ven los demás.</FormSectionDescription></FormSectionHeader><FormSectionContent><Field name="name"><FieldLabel>Nombre</FieldLabel><FieldControl placeholder="Tu nombre" /></Field><Field name="bio"><FieldLabel>Bio</FieldLabel><FieldControl placeholder="Sobre ti" /></Field></FormSectionContent></FormSection>,
    },
  },
  "status-badge": {
    preview: ({ StatusBadge }) => <StatusBadge status="success">Activo</StatusBadge>,
    examples: {
      "status-badge-states": ({ StatusBadge }) => <div className="showcase-button-row"><StatusBadge status="success">Activo</StatusBadge><StatusBadge status="warning">Pendiente</StatusBadge><StatusBadge status="error">Fallido</StatusBadge><StatusBadge status="info">En revisión</StatusBadge><StatusBadge status="neutral" indicator={false}>Borrador</StatusBadge></div>,
    },
  },
  "password-input": {
    preview: ({ PasswordInput }) => <label className="showcase-example-form">Contraseña<PasswordInput autoComplete="current-password" placeholder="••••••••" /></label>,
    examples: {
      "password-input-basic": ({ PasswordInput }) => <label className="showcase-example-form">Contraseña<PasswordInput autoComplete="current-password" placeholder="••••••••" /></label>,
    },
  },
  "search-input": {
    preview: ({ SearchInput }) => <div className="showcase-example-form"><SearchInput placeholder="Buscar proyectos…" aria-label="Buscar proyectos" /></div>,
    examples: {
      "search-input-basic": ui => <SearchExample ui={ui} />,
    },
  },
  "copy-button": {
    preview: ({ CopyButton }) => <CopyButton value="npx zunoui@latest init">Copiar comando</CopyButton>,
    examples: {
      "copy-button-basic": ({ CopyButton }) => <CopyButton value="npx zunoui@latest init">Copiar comando</CopyButton>,
    },
  },
  checkbox: {
    preview: ({ Checkbox, Label }) => <div className="flex items-center gap-2"><Checkbox id="cb-preview" defaultChecked /><Label htmlFor="cb-preview">Aceptar términos</Label></div>,
    examples: {
      "checkbox-states": ({ Checkbox, Label }) => <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2"><Checkbox id="cb-a" defaultChecked /><Label htmlFor="cb-a">Aceptar términos</Label></div>
        <div className="flex items-center gap-2"><Checkbox id="cb-b" /><Label htmlFor="cb-b">Recibir novedades</Label></div>
        <div className="flex items-center gap-2"><Checkbox id="cb-c" indeterminate /><Label htmlFor="cb-c">Selección parcial</Label></div>
        <div className="flex items-center gap-2"><Checkbox id="cb-d" disabled /><Label htmlFor="cb-d">No disponible</Label></div>
      </div>,
    },
  },
  switch: {
    preview: ({ Switch, Label }) => <div className="flex items-center gap-3"><Switch id="sw-preview" defaultChecked /><Label htmlFor="sw-preview">Notificaciones</Label></div>,
    examples: {
      "switch-states": ({ Switch, Label }) => <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3"><Switch id="sw-a" defaultChecked /><Label htmlFor="sw-a">Notificaciones</Label></div>
        <div className="flex items-center gap-3"><Switch id="sw-b" /><Label htmlFor="sw-b">Modo compacto</Label></div>
        <div className="flex items-center gap-3"><Switch id="sw-c" disabled /><Label htmlFor="sw-c">Sincronización</Label></div>
      </div>,
    },
  },
  tabs: {
    preview: ({ Tabs, TabsList, TabsTab, TabsPanel }) => <Tabs defaultValue="cuenta" className="w-full max-w-md"><TabsList aria-label="Configuración"><TabsTab value="cuenta">Cuenta</TabsTab><TabsTab value="seguridad">Seguridad</TabsTab></TabsList><TabsPanel value="cuenta" className="p-4 text-sm text-muted-foreground">Datos de tu cuenta.</TabsPanel><TabsPanel value="seguridad" className="p-4 text-sm text-muted-foreground">Contraseña y sesiones.</TabsPanel></Tabs>,
    examples: {
      "tabs-basic": ({ Tabs, TabsList, TabsTab, TabsPanel }) => <Tabs defaultValue="cuenta" className="w-full max-w-md"><TabsList aria-label="Configuración"><TabsTab value="cuenta">Cuenta</TabsTab><TabsTab value="seguridad">Seguridad</TabsTab><TabsTab value="notificaciones">Notificaciones</TabsTab></TabsList><TabsPanel value="cuenta" className="p-4 text-sm text-muted-foreground">Datos de tu cuenta.</TabsPanel><TabsPanel value="seguridad" className="p-4 text-sm text-muted-foreground">Contraseña y sesiones.</TabsPanel><TabsPanel value="notificaciones" className="p-4 text-sm text-muted-foreground">Preferencias de aviso.</TabsPanel></Tabs>,
      "tabs-underline": ({ Tabs, TabsList, TabsTab, TabsPanel }) => <Tabs variant="underline" defaultValue="general" className="w-full max-w-md"><TabsList aria-label="Ajustes"><TabsTab value="general">General</TabsTab><TabsTab value="miembros">Miembros</TabsTab><TabsTab value="facturacion">Facturación</TabsTab></TabsList><TabsPanel value="general" className="p-4 text-sm text-muted-foreground">Preferencias generales.</TabsPanel><TabsPanel value="miembros" className="p-4 text-sm text-muted-foreground">Gestiona el equipo.</TabsPanel><TabsPanel value="facturacion" className="p-4 text-sm text-muted-foreground">Plan y pagos.</TabsPanel></Tabs>,
      "tabs-ghost": ({ Tabs, TabsList, TabsTab, TabsPanel }) => <Tabs variant="ghost" defaultValue="dia" className="w-full max-w-md"><TabsList aria-label="Rango"><TabsTab value="dia">Día</TabsTab><TabsTab value="semana">Semana</TabsTab><TabsTab value="mes">Mes</TabsTab></TabsList><TabsPanel value="dia" className="p-4 text-sm text-muted-foreground">Vista diaria.</TabsPanel><TabsPanel value="semana" className="p-4 text-sm text-muted-foreground">Vista semanal.</TabsPanel><TabsPanel value="mes" className="p-4 text-sm text-muted-foreground">Vista mensual.</TabsPanel></Tabs>,
      "tabs-solid": ({ Tabs, TabsList, TabsTab, TabsPanel }) => <Tabs variant="solid" defaultValue="recientes" className="w-full max-w-md"><TabsList aria-label="Filtro"><TabsTab value="recientes">Recientes</TabsTab><TabsTab value="pendientes">Pendientes</TabsTab><TabsTab value="completadas">Completadas</TabsTab></TabsList><TabsPanel value="recientes" className="p-4 text-sm text-muted-foreground">Actividad reciente.</TabsPanel><TabsPanel value="pendientes" className="p-4 text-sm text-muted-foreground">Tareas por hacer.</TabsPanel><TabsPanel value="completadas" className="p-4 text-sm text-muted-foreground">Trabajo terminado.</TabsPanel></Tabs>,
      "tabs-icons": ({ Tabs, TabsList, TabsTab, TabsPanel, Icon }) => <Tabs variant="underline" defaultValue="resumen" className="w-full max-w-md"><TabsList aria-label="Panel"><TabsTab value="resumen" className="gap-2"><Icon icon={CircleCheckIcon} /> Resumen</TabsTab><TabsTab value="actividad" className="gap-2"><Icon icon={BellIcon} /> Actividad</TabsTab><TabsTab value="alertas" className="gap-2"><Icon icon={TriangleAlertIcon} /> Alertas</TabsTab></TabsList><TabsPanel value="resumen" className="p-4 text-sm text-muted-foreground">Vista general.</TabsPanel><TabsPanel value="actividad" className="p-4 text-sm text-muted-foreground">Eventos recientes.</TabsPanel><TabsPanel value="alertas" className="p-4 text-sm text-muted-foreground">Avisos pendientes.</TabsPanel></Tabs>,
      "tabs-pill": ({ Tabs, TabsList, TabsTab, TabsPanel }) => <Tabs variant="solid" shape="pill" defaultValue="recientes" className="w-full max-w-md"><TabsList aria-label="Filtro"><TabsTab value="recientes">Recientes</TabsTab><TabsTab value="pendientes">Pendientes</TabsTab><TabsTab value="completadas">Completadas</TabsTab></TabsList><TabsPanel value="recientes" className="p-4 text-sm text-muted-foreground">Actividad reciente.</TabsPanel><TabsPanel value="pendientes" className="p-4 text-sm text-muted-foreground">Tareas por hacer.</TabsPanel><TabsPanel value="completadas" className="p-4 text-sm text-muted-foreground">Trabajo terminado.</TabsPanel></Tabs>,
      "tabs-underline-top": ({ Tabs, TabsList, TabsTab, TabsPanel }) => <Tabs variant="underline" indicatorPosition="top" defaultValue="general" className="w-full max-w-md"><TabsList aria-label="Ajustes"><TabsTab value="general">General</TabsTab><TabsTab value="miembros">Miembros</TabsTab><TabsTab value="facturacion">Facturación</TabsTab></TabsList><TabsPanel value="general" className="p-4 text-sm text-muted-foreground">Preferencias generales.</TabsPanel><TabsPanel value="miembros" className="p-4 text-sm text-muted-foreground">Gestiona el equipo.</TabsPanel><TabsPanel value="facturacion" className="p-4 text-sm text-muted-foreground">Plan y pagos.</TabsPanel></Tabs>,
      "tabs-underline-pill": ({ Tabs, TabsList, TabsTab, TabsPanel }) => <Tabs variant="underline" shape="pill" defaultValue="dia" className="w-full max-w-md"><TabsList aria-label="Rango"><TabsTab value="dia">Día</TabsTab><TabsTab value="semana">Semana</TabsTab><TabsTab value="mes">Mes</TabsTab></TabsList><TabsPanel value="dia" className="p-4 text-sm text-muted-foreground">Vista diaria.</TabsPanel><TabsPanel value="semana" className="p-4 text-sm text-muted-foreground">Vista semanal.</TabsPanel><TabsPanel value="mes" className="p-4 text-sm text-muted-foreground">Vista mensual.</TabsPanel></Tabs>,
    },
  },
  avatar: {
    preview: ({ Avatar, AvatarImage, AvatarFallback }) => <Avatar><AvatarImage src="/avatar-que-no-existe.jpg" alt="Ana Ruiz" /><AvatarFallback>AR</AvatarFallback></Avatar>,
    examples: {
      "avatar-fallback": ({ Avatar, AvatarImage, AvatarFallback }) => <div className="showcase-button-row items-center"><Avatar><AvatarImage src="/avatar-que-no-existe.jpg" alt="Ana Ruiz" /><AvatarFallback>AR</AvatarFallback></Avatar><Avatar><AvatarImage src="/otro-que-falla.jpg" alt="Luis Mora" /><AvatarFallback>LM</AvatarFallback></Avatar><Avatar><AvatarFallback>+3</AvatarFallback></Avatar></div>,
      "avatar-sizes": ({ Avatar, AvatarFallback }) => <div className="showcase-button-row items-center"><Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar><Avatar><AvatarFallback>MD</AvatarFallback></Avatar><Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar></div>,
      "avatar-group": ({ Avatar, AvatarFallback }) => <div className="flex -space-x-2">{["AR", "LM", "TS", "+3"].map(initials => <Avatar key={initials} className="ring-2 ring-background"><AvatarFallback>{initials}</AvatarFallback></Avatar>)}</div>,
    },
  },
  tooltip: {
    preview: ({ TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button }) => <TooltipProvider><Tooltip><TooltipTrigger render={<Button variant="outline">Guardar</Button>} /><TooltipContent>Guarda los cambios (⌘S)</TooltipContent></Tooltip></TooltipProvider>,
    examples: {
      "tooltip-basic": ({ TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button }) => <TooltipProvider><Tooltip><TooltipTrigger render={<Button variant="outline">Guardar</Button>} /><TooltipContent>Guarda los cambios (⌘S)</TooltipContent></Tooltip></TooltipProvider>,
      "tooltip-states": ({ TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button }) => <TooltipProvider><div className="showcase-button-row"><Tooltip><TooltipTrigger render={<Button>Publicar</Button>} /><TooltipContent>Publica el proyecto ahora</TooltipContent></Tooltip><Tooltip><TooltipTrigger render={<span tabIndex={0} className="inline-flex rounded-md" />}><Button disabled>Publicar</Button></TooltipTrigger><TooltipContent>Completa los campos requeridos primero</TooltipContent></Tooltip></div></TooltipProvider>,
    },
  },
  dialog: {
    preview: ({ Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button }) => <Dialog><DialogTrigger render={<Button>Editar perfil</Button>} /><DialogContent><DialogHeader><DialogTitle>Editar perfil</DialogTitle><DialogDescription>Cambia tu nombre visible. Se guarda al confirmar.</DialogDescription></DialogHeader><DialogFooter><DialogClose render={<Button variant="outline">Cancelar</Button>} /><DialogClose render={<Button>Guardar cambios</Button>} /></DialogFooter></DialogContent></Dialog>,
    examples: {
      "dialog-basic": ({ Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button }) => <Dialog><DialogTrigger render={<Button>Editar perfil</Button>} /><DialogContent><DialogHeader><DialogTitle>Editar perfil</DialogTitle><DialogDescription>Cambia tu nombre visible. Se guarda al confirmar.</DialogDescription></DialogHeader><DialogFooter><DialogClose render={<Button variant="outline">Cancelar</Button>} /><DialogClose render={<Button>Guardar cambios</Button>} /></DialogFooter></DialogContent></Dialog>,
      "dialog-select": ({ Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem }) => <Dialog><DialogTrigger render={<Button>Mover proyecto</Button>} /><DialogContent><DialogHeader><DialogTitle>Mover proyecto</DialogTitle><DialogDescription>Elige el espacio de destino.</DialogDescription></DialogHeader><div className="mt-4"><Select defaultValue="acme"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="acme">Acme Studio</SelectItem><SelectItem value="labs">Labs</SelectItem><SelectItem value="personal">Personal</SelectItem></SelectContent></Select></div><DialogFooter><DialogClose render={<Button variant="outline">Cancelar</Button>} /><DialogClose render={<Button>Mover</Button>} /></DialogFooter></DialogContent></Dialog>,
      "dialog-lg": ({ Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button }) => <Dialog><DialogTrigger render={<Button variant="outline">Ver términos</Button>} /><DialogContent size="lg"><DialogHeader><DialogTitle>Términos del servicio y política de privacidad de la plataforma</DialogTitle><DialogDescription>Título largo que envuelve sin pasar por debajo de la X. Panel ancho (size=&quot;lg&quot;) para contenido extenso.</DialogDescription></DialogHeader><div className="mt-4 max-h-64 overflow-y-auto text-sm text-muted-foreground"><p>Al continuar aceptas el tratamiento de tus datos conforme a la política vigente. Puedes revocar el consentimiento cuando quieras desde los ajustes de la cuenta.</p><p className="mt-3">El servicio se ofrece «tal cual», sin garantías implícitas. Consulta la versión completa antes de aceptar.</p></div><DialogFooter><DialogClose render={<Button variant="outline">Cancelar</Button>} /><DialogClose render={<Button>Aceptar</Button>} /></DialogFooter></DialogContent></Dialog>,
      "dialog-persistente": ({ Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button }) => <Dialog dismissible={false}><DialogTrigger render={<Button variant="outline">Configurar espacio</Button>} /><DialogContent showClose={false}><DialogHeader><DialogTitle>Termina la configuración</DialogTitle><DialogDescription>Con dismissible=&quot;false&quot; el clic fuera y Escape no cierran; hay que elegir una acción.</DialogDescription></DialogHeader><DialogFooter><DialogClose render={<Button variant="outline">Ahora no</Button>} /><DialogClose render={<Button>Continuar</Button>} /></DialogFooter></DialogContent></Dialog>,
    },
  },
  "alert-dialog": {
    preview: ({ AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogClose, Button }) => <AlertDialog><AlertDialogTrigger render={<Button variant="destructive">Eliminar proyecto</Button>} /><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>¿Eliminar «Rediseño 2026»?</AlertDialogTitle><AlertDialogDescription>Se eliminarán sus archivos y miembros. Esta acción no se puede deshacer.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogClose render={<Button variant="outline">Cancelar</Button>} /><AlertDialogClose render={<Button variant="destructive">Eliminar</Button>} /></AlertDialogFooter></AlertDialogContent></AlertDialog>,
    examples: {
      "alert-dialog-basic": ({ AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogClose, Button }) => <AlertDialog><AlertDialogTrigger render={<Button variant="destructive">Eliminar proyecto</Button>} /><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>¿Eliminar «Rediseño 2026»?</AlertDialogTitle><AlertDialogDescription>Se eliminarán sus archivos y miembros. Esta acción no se puede deshacer.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogClose render={<Button variant="outline">Cancelar</Button>} /><AlertDialogClose render={<Button variant="destructive">Eliminar</Button>} /></AlertDialogFooter></AlertDialogContent></AlertDialog>,
    },
  },
  "dropdown-menu": {
    preview: ({ DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, Button }) => <DropdownMenu><DropdownMenuTrigger render={<Button variant="outline">Opciones</Button>} /><DropdownMenuContent><DropdownMenuLabel>Proyecto</DropdownMenuLabel><DropdownMenuItem>Editar</DropdownMenuItem><DropdownMenuItem>Duplicar</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem>Eliminar</DropdownMenuItem></DropdownMenuContent></DropdownMenu>,
    examples: {
      "dropdown-menu-basic": ({ DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, Button }) => <DropdownMenu><DropdownMenuTrigger render={<Button variant="outline">Opciones</Button>} /><DropdownMenuContent><DropdownMenuLabel>Proyecto</DropdownMenuLabel><DropdownMenuItem>Editar</DropdownMenuItem><DropdownMenuItem>Duplicar</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem>Eliminar</DropdownMenuItem></DropdownMenuContent></DropdownMenu>,
      "dropdown-menu-table": ({ DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, Button }) => <table className="w-full max-w-md text-sm"><tbody>{["Rediseño 2026", "App móvil"].map(name => <tr key={name} className="border-b border-border"><td className="py-2 text-foreground">{name}</td><td className="py-2 text-right"><DropdownMenu><DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={"Acciones de " + name}><span aria-hidden="true">⋯</span></Button>} /><DropdownMenuContent align="end"><DropdownMenuItem>Abrir</DropdownMenuItem><DropdownMenuItem>Renombrar</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem>Archivar</DropdownMenuItem></DropdownMenuContent></DropdownMenu></td></tr>)}</tbody></table>,
    },
  },
  select: {
    preview: ({ Select, SelectTrigger, SelectValue, SelectContent, SelectItem }) => <Select defaultValue="acme"><SelectTrigger className="w-56"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="acme">Acme Studio</SelectItem><SelectItem value="labs">Labs</SelectItem><SelectItem value="personal">Personal</SelectItem></SelectContent></Select>,
    examples: {
      "select-basic": ({ Select, SelectTrigger, SelectValue, SelectContent, SelectItem }) => <Select defaultValue="acme"><SelectTrigger className="w-56"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="acme">Acme Studio</SelectItem><SelectItem value="labs">Labs</SelectItem><SelectItem value="personal">Personal</SelectItem></SelectContent></Select>,
      "select-groups": ({ Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectGroupLabel, SelectSeparator }) => <Select defaultValue="react"><SelectTrigger className="w-56"><SelectValue placeholder="Elige un framework" /></SelectTrigger><SelectContent><SelectGroup><SelectGroupLabel>Frontend</SelectGroupLabel><SelectItem value="react">React</SelectItem><SelectItem value="vue">Vue</SelectItem></SelectGroup><SelectSeparator /><SelectGroup><SelectGroupLabel>Meta-frameworks</SelectGroupLabel><SelectItem value="next">Next.js</SelectItem></SelectGroup></SelectContent></Select>,
    },
  },
  toast: {
    preview: ui => <ToastExample ui={ui} />,
    examples: {
      "toast-basic": ui => <ToastExample ui={ui} />,
    },
  },
}

export const catalog: CatalogEntry[] = meta.map(entry => ({
  ...entry,
  preview: renderers[entry.name].preview,
  examples: entry.examples.map(example => ({ ...example, render: renderers[entry.name].examples[example.id] })),
}))
export const catalogByName: Record<string, CatalogEntry> = Object.fromEntries(catalog.map(entry => [entry.name, entry]))
export const examples = catalog.flatMap(entry => entry.examples.map(example => ({ ...example, component: entry.name })))
