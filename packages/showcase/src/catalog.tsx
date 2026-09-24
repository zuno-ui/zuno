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
      <FieldLabel>Email</FieldLabel>
      <FieldControl type="email" required placeholder="name@company.com" onChange={() => setSubmitted(false)} />
      <FieldDescription>Your work email, no extra messages.</FieldDescription>
      <FieldError match="valueMissing">Enter your email.</FieldError>
      <FieldError match="typeMismatch">Enter a valid email.</FieldError>
    </Field>
    <div className="showcase-form-footer"><Button type="submit">Continue <span aria-hidden="true">↗</span></Button><span role="status">{submitted ? "Valid data. Demo complete." : ""}</span></div>
  </Form>
}

function TextControlExample({ ui, multiline }: { ui: DemoComponents; multiline: boolean }) {
  const { Field, FieldLabel, FieldDescription, FieldError, Form, Button, Input, Textarea } = ui
  const [submitted, setSubmitted] = useState(false)
  const Control = multiline ? Textarea : Input
  return <Form className="showcase-example-form" onSubmit={event => { event.preventDefault(); setSubmitted(true) }}>
    <Field name={multiline ? "message" : "name"}>
      <FieldLabel>{multiline ? "Message" : "Name"}</FieldLabel>
      <Control required placeholder={multiline ? "Tell us about your project" : "Your name"} onChange={() => setSubmitted(false)} />
      <FieldDescription>{multiline ? "Include any details you find useful." : "What we should call you."}</FieldDescription>
      <FieldError match="valueMissing">Fill in this field.</FieldError>
    </Field>
    <div className="showcase-form-footer"><Button type="submit">Validate</Button><span role="status">{submitted ? "Valid data. Demo complete." : ""}</span></div>
  </Form>
}

function ButtonLoadingExample({ ui }: { ui: DemoComponents }) {
  const { Button } = ui
  const [loading, setLoading] = useState(false)
  return <div className="showcase-button-row items-center">
    <Button loading={loading} onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1600) }}>Save changes</Button>
    <Button variant="outline" loading>Loading</Button>
  </div>
}

function SearchExample({ ui }: { ui: DemoComponents }) {
  const { SearchInput } = ui
  const [query, setQuery] = useState("Project")
  return <div className="showcase-example-form"><SearchInput value={query} onChange={event => setQuery(event.target.value)} onClear={() => setQuery("")} placeholder="Search projects…" aria-label="Search projects" /></div>
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
    <Button onClick={() => toast.add({ title: "Changes saved", description: "Your settings were updated.", type: "success" })}>Save</Button>
    <Button variant="outline" onClick={() => toast.add({ title: "Storage almost full", description: "You're at 90% of your storage.", type: "warning" })}>Warn</Button>
    <Button variant="outline" onClick={() => toast.add({ title: "New version available", description: "Reload to update.", type: "info" })}>Inform</Button>
    <Button variant="outline" onClick={() => toast.add({ title: "Could not publish", description: "Check your connection and try again.", type: "error" })}>Publish</Button>
  </div>
}

const box = "rounded-lg border border-border bg-card px-4 py-3 text-sm text-card-foreground"

const renderers: Record<string, { preview: Render; examples: Record<string, Render> }> = {
  button: {
    preview: ({ Button }) => <Button>Create project</Button>,
    examples: {
      "button-variants": ({ Button }) => <div className="showcase-button-row"><Button>Save</Button><Button variant="secondary">Duplicate</Button><Button variant="outline">Cancel</Button><Button variant="ghost">Discard</Button><Button variant="destructive">Delete</Button><Button variant="link">Learn more</Button></div>,
      "button-sizes": ({ Button }) => <div className="showcase-button-row items-center"><Button size="sm">Small</Button><Button>Medium</Button><Button size="lg">Large</Button><Button size="icon" aria-label="Add"><span aria-hidden="true">+</span></Button></div>,
      "button-loading": ui => <ButtonLoadingExample ui={ui} />,
      "button-disabled": ({ Button }) => <div className="showcase-button-row"><Button disabled>Save</Button><Button variant="outline" disabled>No access</Button></div>,
    },
  },
  field: {
    preview: ui => <EmailExample ui={ui} />,
    examples: {
      "field-validation": ui => <EmailExample ui={ui} />,
      "field-description": ({ Field, FieldLabel, FieldControl, FieldDescription }) => <div className="showcase-example-form"><Field name="project"><FieldLabel>Project name</FieldLabel><FieldControl placeholder="My next project" /><FieldDescription>You can change it later.</FieldDescription></Field></div>,
      "field-disabled": ({ Field, FieldLabel, FieldControl, FieldDescription }) => <div className="showcase-example-form showcase-disabled"><Field name="workspace" disabled><FieldLabel>Workspace</FieldLabel><FieldControl value="Acme Studio" /><FieldDescription>Managed by your organization.</FieldDescription></Field></div>,
    },
  },
  input: {
    preview: ({ Input }) => <label className="showcase-example-form">Name<Input placeholder="Your name" /></label>,
    examples: {
      "input-validation": ui => <TextControlExample ui={ui} multiline={false} />,
      "input-disabled": ({ Input }) => <label className="showcase-example-form">Reference<Input disabled defaultValue="ZUNO project" /></label>,
      "input-readonly": ({ Input }) => <label className="showcase-example-form">Reference<Input readOnly defaultValue="ZUNO project" /></label>,
    },
  },
  textarea: {
    preview: ({ Textarea }) => <label className="showcase-example-form">Message<Textarea placeholder="Write your message…" /></label>,
    examples: {
      "textarea-validation": ui => <TextControlExample ui={ui} multiline={true} />,
      "textarea-disabled": ({ Textarea }) => <label className="showcase-example-form">Reference<Textarea disabled defaultValue="ZUNO project" /></label>,
      "textarea-readonly": ({ Textarea }) => <label className="showcase-example-form">Reference<Textarea readOnly defaultValue="ZUNO project" /></label>,
    },
  },
  container: {
    preview: ({ Container }) => <Container size="form" className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">Centered content with a comfortable reading width.</Container>,
    examples: {
      "container-sizes": ({ Container, Stack }) => <Stack gap="2" className="w-full">{(["reading", "form", "content"] as const).map(size => <Container key={size} size={size} className={box + " w-full text-center"}>size=&quot;{size}&quot;</Container>)}</Stack>,
    },
  },
  stack: {
    preview: ({ Stack }) => <Stack gap="4" className="w-full">{["Profile", "Billing", "Security"].map(item => <div key={item} className={box}>{item}</div>)}</Stack>,
    examples: {
      "stack-gap": ({ Stack }) => <Stack gap="4" className="w-full">{["Profile", "Billing", "Security"].map(item => <div key={item} className={box}>{item}</div>)}</Stack>,
    },
  },
  cluster: {
    preview: ({ Cluster }) => <Cluster gap="2" className="w-full">{["Design", "Accessible", "Lightweight", "Editable"].map(tag => <span key={tag} className="rounded-full border border-border bg-muted px-3 py-1 text-sm text-foreground">{tag}</span>)}</Cluster>,
    examples: {
      "cluster-tags": ({ Cluster }) => <Cluster gap="2" className="w-full">{["Design", "Accessible", "Lightweight", "Editable", "Base UI", "Tailwind"].map(tag => <span key={tag} className="rounded-full border border-border bg-muted px-3 py-1 text-sm text-foreground">{tag}</span>)}</Cluster>,
      "cluster-between": ({ Cluster, Button }) => <Cluster align="between" className="w-full"><span className="text-sm font-medium">Team members</span><Button size="sm">Invite</Button></Cluster>,
    },
  },
  "responsive-grid": {
    preview: ({ ResponsiveGrid }) => <ResponsiveGrid min="9rem" gap="4" className="w-full">{["One", "Two", "Three", "Four"].map(item => <div key={item} className={box + " text-center"}>{item}</div>)}</ResponsiveGrid>,
    examples: {
      "grid-cards": ({ ResponsiveGrid }) => <ResponsiveGrid min="9rem" gap="4" className="w-full">{["One", "Two", "Three", "Four", "Five", "Six"].map(item => <div key={item} className={box + " text-center"}>{item}</div>)}</ResponsiveGrid>,
    },
  },
  card: {
    preview: ({ Card, CardHeader, CardTitle, CardDescription, CardContent }) => <Card className="w-full max-w-sm"><CardHeader><CardTitle>Pro plan</CardTitle><CardDescription>Billed monthly, cancel anytime.</CardDescription></CardHeader><CardContent className="text-sm text-muted-foreground">Real-time collaboration, history and priority support.</CardContent></Card>,
    examples: {
      "card-basic": ({ Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button }) => <Card className="w-full max-w-sm"><CardHeader><CardTitle>Pro plan</CardTitle><CardDescription>Billed monthly, cancel anytime.</CardDescription></CardHeader><CardContent className="text-sm text-muted-foreground">Real-time collaboration, history and priority support.</CardContent><CardFooter><Button>Choose plan</Button><Button variant="outline">Compare</Button></CardFooter></Card>,
    },
  },
  badge: {
    preview: ({ Badge }) => <Badge>New</Badge>,
    examples: {
      "badge-variants": ({ Badge }) => <div className="showcase-button-row"><Badge>New</Badge><Badge variant="secondary">Beta</Badge><Badge variant="outline">v1.0</Badge><Badge variant="destructive">Deprecated</Badge></div>,
    },
  },
  separator: {
    preview: ({ Separator }) => <div className="w-full"><div className="text-sm">Section A</div><Separator className="my-3" /><div className="text-sm">Section B</div></div>,
    examples: {
      "separator-orientation": ({ Separator }) => <div className="w-full"><div className="text-sm">Section A</div><Separator className="my-3" /><div className="text-sm">Section B</div><div className="mt-3 flex h-8 items-center gap-3 text-sm">Left<Separator orientation="vertical" />Right</div></div>,
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
      "icon-meaningful": ({ Icon }) => <div className="showcase-button-row items-center"><Icon icon={CircleCheckIcon} size="lg" label="Completed" className="text-zuno-success" /><Icon icon={TriangleAlertIcon} size="lg" label="Warning" className="text-zuno-warning" /></div>,
      "icon-in-button": ({ Icon, Button }) => <Button size="icon" aria-label="Add project"><Icon icon={PlusIcon} /></Button>,
    },
  },
  label: {
    preview: ({ Label }) => <Label>Email</Label>,
    examples: {
      "label-input": ({ Label, Input }) => <div className="showcase-example-form"><Label htmlFor="demo-name">Full name</Label><Input id="demo-name" placeholder="Your name" /></div>,
    },
  },
  empty: {
    preview: ({ Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyActions, Button }) => <Empty className="w-full"><EmptyMedia aria-hidden="true">◍</EmptyMedia><EmptyTitle>No projects yet</EmptyTitle><EmptyDescription>Create your first project to start collaborating with your team.</EmptyDescription><EmptyActions><Button>Create project</Button></EmptyActions></Empty>,
    examples: {
      "empty-basic": ({ Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyActions, Button }) => <Empty className="w-full"><EmptyMedia aria-hidden="true">◍</EmptyMedia><EmptyTitle>No projects yet</EmptyTitle><EmptyDescription>Create your first project to start collaborating with your team.</EmptyDescription><EmptyActions><Button>Create project</Button><Button variant="outline">Import</Button></EmptyActions></Empty>,
    },
  },
  alert: {
    preview: ({ Alert, AlertContent, AlertTitle, AlertDescription }) => <Alert variant="success" className="w-full"><AlertContent><AlertTitle>Changes saved</AlertTitle><AlertDescription>Your settings were updated successfully.</AlertDescription></AlertContent></Alert>,
    examples: {
      "alert-variants": ({ Alert, AlertContent, AlertTitle, AlertDescription }) => <div className="flex w-full flex-col gap-2"><Alert variant="success"><AlertContent><AlertTitle>Changes saved</AlertTitle><AlertDescription>Your settings were updated successfully.</AlertDescription></AlertContent></Alert><Alert variant="warning"><AlertContent><AlertTitle>Storage almost full</AlertTitle><AlertDescription>You are using 90% of your storage.</AlertDescription></AlertContent></Alert><Alert variant="destructive"><AlertContent><AlertTitle>Could not publish</AlertTitle><AlertDescription>Check your connection and try again.</AlertDescription></AlertContent></Alert></div>,
      "alert-composed": ({ Alert, AlertContent, AlertTitle, AlertDescription }) => <Alert variant="info" className="w-full"><span aria-hidden="true">ⓘ</span><AlertContent><AlertTitle>New version available</AlertTitle><AlertDescription>Update to get the latest improvements.</AlertDescription></AlertContent></Alert>,
    },
  },
  "page-header": {
    preview: ({ PageHeader, PageHeaderContent, PageHeaderHeading, PageHeaderDescription, PageHeaderActions, Button }) => <PageHeader className="w-full"><PageHeaderContent><PageHeaderHeading>Projects</PageHeaderHeading><PageHeaderDescription>Manage and organize your work.</PageHeaderDescription></PageHeaderContent><PageHeaderActions><Button>New project</Button></PageHeaderActions></PageHeader>,
    examples: {
      "page-header-basic": ({ PageHeader, PageHeaderContent, PageHeaderHeading, PageHeaderDescription, PageHeaderActions, Button }) => <PageHeader className="w-full"><PageHeaderContent><PageHeaderHeading>Projects</PageHeaderHeading><PageHeaderDescription>Manage and organize your work.</PageHeaderDescription></PageHeaderContent><PageHeaderActions><Button variant="outline">Import</Button><Button>New project</Button></PageHeaderActions></PageHeader>,
    },
  },
  "form-section": {
    preview: ({ FormSection, FormSectionHeader, FormSectionTitle, FormSectionDescription, FormSectionContent, Field, FieldLabel, FieldControl }) => <FormSection className="w-full max-w-md"><FormSectionHeader><FormSectionTitle>Profile</FormSectionTitle><FormSectionDescription>How others see you.</FormSectionDescription></FormSectionHeader><FormSectionContent><Field name="name"><FieldLabel>Name</FieldLabel><FieldControl placeholder="Your name" /></Field></FormSectionContent></FormSection>,
    examples: {
      "form-section-basic": ({ FormSection, FormSectionHeader, FormSectionTitle, FormSectionDescription, FormSectionContent, Field, FieldLabel, FieldControl }) => <FormSection className="w-full max-w-md"><FormSectionHeader><FormSectionTitle>Profile</FormSectionTitle><FormSectionDescription>How others see you.</FormSectionDescription></FormSectionHeader><FormSectionContent><Field name="name"><FieldLabel>Name</FieldLabel><FieldControl placeholder="Your name" /></Field><Field name="bio"><FieldLabel>Bio</FieldLabel><FieldControl placeholder="About you" /></Field></FormSectionContent></FormSection>,
    },
  },
  "status-badge": {
    preview: ({ StatusBadge }) => <StatusBadge status="success">Active</StatusBadge>,
    examples: {
      "status-badge-states": ({ StatusBadge }) => <div className="showcase-button-row"><StatusBadge status="success">Active</StatusBadge><StatusBadge status="warning">Pending</StatusBadge><StatusBadge status="error">Failed</StatusBadge><StatusBadge status="info">In review</StatusBadge><StatusBadge status="neutral" indicator={false}>Draft</StatusBadge></div>,
    },
  },
  "password-input": {
    preview: ({ PasswordInput }) => <label className="showcase-example-form">Password<PasswordInput autoComplete="current-password" placeholder="••••••••" /></label>,
    examples: {
      "password-input-basic": ({ PasswordInput }) => <label className="showcase-example-form">Password<PasswordInput autoComplete="current-password" placeholder="••••••••" /></label>,
    },
  },
  "search-input": {
    preview: ({ SearchInput }) => <div className="showcase-example-form"><SearchInput placeholder="Search projects…" aria-label="Search projects" /></div>,
    examples: {
      "search-input-basic": ui => <SearchExample ui={ui} />,
    },
  },
  "copy-button": {
    preview: ({ CopyButton }) => <CopyButton value="npx zunoui@latest init">Copy command</CopyButton>,
    examples: {
      "copy-button-basic": ({ CopyButton }) => <CopyButton value="npx zunoui@latest init">Copy command</CopyButton>,
    },
  },
  checkbox: {
    preview: ({ Checkbox, Label }) => <div className="flex items-center gap-2"><Checkbox id="cb-preview" defaultChecked /><Label htmlFor="cb-preview">Accept terms</Label></div>,
    examples: {
      "checkbox-states": ({ Checkbox, Label }) => <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2"><Checkbox id="cb-a" defaultChecked /><Label htmlFor="cb-a">Accept terms</Label></div>
        <div className="flex items-center gap-2"><Checkbox id="cb-b" /><Label htmlFor="cb-b">Receive updates</Label></div>
        <div className="flex items-center gap-2"><Checkbox id="cb-c" indeterminate /><Label htmlFor="cb-c">Partial selection</Label></div>
        <div className="flex items-center gap-2"><Checkbox id="cb-d" disabled /><Label htmlFor="cb-d">Unavailable</Label></div>
      </div>,
    },
  },
  switch: {
    preview: ({ Switch, Label }) => <div className="flex items-center gap-3"><Switch id="sw-preview" defaultChecked /><Label htmlFor="sw-preview">Notifications</Label></div>,
    examples: {
      "switch-states": ({ Switch, Label }) => <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3"><Switch id="sw-a" defaultChecked /><Label htmlFor="sw-a">Notifications</Label></div>
        <div className="flex items-center gap-3"><Switch id="sw-b" /><Label htmlFor="sw-b">Compact mode</Label></div>
        <div className="flex items-center gap-3"><Switch id="sw-c" disabled /><Label htmlFor="sw-c">Sync</Label></div>
      </div>,
    },
  },
  tabs: {
    preview: ({ Tabs, TabsList, TabsTab, TabsPanel }) => <Tabs defaultValue="account" className="w-full max-w-md"><TabsList aria-label="Settings"><TabsTab value="account">Account</TabsTab><TabsTab value="security">Security</TabsTab></TabsList><TabsPanel value="account" className="p-4 text-sm text-muted-foreground">Your account details.</TabsPanel><TabsPanel value="security" className="p-4 text-sm text-muted-foreground">Password and sessions.</TabsPanel></Tabs>,
    examples: {
      "tabs-basic": ({ Tabs, TabsList, TabsTab, TabsPanel }) => <Tabs defaultValue="account" className="w-full max-w-md"><TabsList aria-label="Settings"><TabsTab value="account">Account</TabsTab><TabsTab value="security">Security</TabsTab><TabsTab value="notifications">Notifications</TabsTab></TabsList><TabsPanel value="account" className="p-4 text-sm text-muted-foreground">Your account details.</TabsPanel><TabsPanel value="security" className="p-4 text-sm text-muted-foreground">Password and sessions.</TabsPanel><TabsPanel value="notifications" className="p-4 text-sm text-muted-foreground">Notification preferences.</TabsPanel></Tabs>,
      "tabs-underline": ({ Tabs, TabsList, TabsTab, TabsPanel }) => <Tabs variant="underline" defaultValue="general" className="w-full max-w-md"><TabsList aria-label="Preferences"><TabsTab value="general">General</TabsTab><TabsTab value="members">Members</TabsTab><TabsTab value="billing">Billing</TabsTab></TabsList><TabsPanel value="general" className="p-4 text-sm text-muted-foreground">General preferences.</TabsPanel><TabsPanel value="members" className="p-4 text-sm text-muted-foreground">Manage the team.</TabsPanel><TabsPanel value="billing" className="p-4 text-sm text-muted-foreground">Plan and payments.</TabsPanel></Tabs>,
      "tabs-ghost": ({ Tabs, TabsList, TabsTab, TabsPanel }) => <Tabs variant="ghost" defaultValue="day" className="w-full max-w-md"><TabsList aria-label="Range"><TabsTab value="day">Day</TabsTab><TabsTab value="week">Week</TabsTab><TabsTab value="month">Month</TabsTab></TabsList><TabsPanel value="day" className="p-4 text-sm text-muted-foreground">Daily view.</TabsPanel><TabsPanel value="week" className="p-4 text-sm text-muted-foreground">Weekly view.</TabsPanel><TabsPanel value="month" className="p-4 text-sm text-muted-foreground">Monthly view.</TabsPanel></Tabs>,
      "tabs-solid": ({ Tabs, TabsList, TabsTab, TabsPanel }) => <Tabs variant="solid" defaultValue="recent" className="w-full max-w-md"><TabsList aria-label="Filter"><TabsTab value="recent">Recent</TabsTab><TabsTab value="pending">Pending</TabsTab><TabsTab value="completed">Completed</TabsTab></TabsList><TabsPanel value="recent" className="p-4 text-sm text-muted-foreground">Recent activity.</TabsPanel><TabsPanel value="pending" className="p-4 text-sm text-muted-foreground">Tasks to do.</TabsPanel><TabsPanel value="completed" className="p-4 text-sm text-muted-foreground">Finished work.</TabsPanel></Tabs>,
      "tabs-icons": ({ Tabs, TabsList, TabsTab, TabsPanel, Icon }) => <Tabs variant="underline" defaultValue="overview" className="w-full max-w-md"><TabsList aria-label="Dashboard"><TabsTab value="overview" className="gap-2"><Icon icon={CircleCheckIcon} /> Overview</TabsTab><TabsTab value="activity" className="gap-2"><Icon icon={BellIcon} /> Activity</TabsTab><TabsTab value="alerts" className="gap-2"><Icon icon={TriangleAlertIcon} /> Alerts</TabsTab></TabsList><TabsPanel value="overview" className="p-4 text-sm text-muted-foreground">General view.</TabsPanel><TabsPanel value="activity" className="p-4 text-sm text-muted-foreground">Recent events.</TabsPanel><TabsPanel value="alerts" className="p-4 text-sm text-muted-foreground">Pending notices.</TabsPanel></Tabs>,
      "tabs-pill": ({ Tabs, TabsList, TabsTab, TabsPanel }) => <Tabs variant="solid" shape="pill" defaultValue="recent" className="w-full max-w-md"><TabsList aria-label="Filter"><TabsTab value="recent">Recent</TabsTab><TabsTab value="pending">Pending</TabsTab><TabsTab value="completed">Completed</TabsTab></TabsList><TabsPanel value="recent" className="p-4 text-sm text-muted-foreground">Recent activity.</TabsPanel><TabsPanel value="pending" className="p-4 text-sm text-muted-foreground">Tasks to do.</TabsPanel><TabsPanel value="completed" className="p-4 text-sm text-muted-foreground">Finished work.</TabsPanel></Tabs>,
      "tabs-underline-top": ({ Tabs, TabsList, TabsTab, TabsPanel }) => <Tabs variant="underline" indicatorPosition="top" defaultValue="general" className="w-full max-w-md"><TabsList aria-label="Preferences"><TabsTab value="general">General</TabsTab><TabsTab value="members">Members</TabsTab><TabsTab value="billing">Billing</TabsTab></TabsList><TabsPanel value="general" className="p-4 text-sm text-muted-foreground">General preferences.</TabsPanel><TabsPanel value="members" className="p-4 text-sm text-muted-foreground">Manage the team.</TabsPanel><TabsPanel value="billing" className="p-4 text-sm text-muted-foreground">Plan and payments.</TabsPanel></Tabs>,
      "tabs-underline-pill": ({ Tabs, TabsList, TabsTab, TabsPanel }) => <Tabs variant="underline" shape="pill" defaultValue="day" className="w-full max-w-md"><TabsList aria-label="Range"><TabsTab value="day">Day</TabsTab><TabsTab value="week">Week</TabsTab><TabsTab value="month">Month</TabsTab></TabsList><TabsPanel value="day" className="p-4 text-sm text-muted-foreground">Daily view.</TabsPanel><TabsPanel value="week" className="p-4 text-sm text-muted-foreground">Weekly view.</TabsPanel><TabsPanel value="month" className="p-4 text-sm text-muted-foreground">Monthly view.</TabsPanel></Tabs>,
    },
  },
  avatar: {
    preview: ({ Avatar, AvatarImage, AvatarFallback }) => <Avatar><AvatarImage src="/missing-avatar.jpg" alt="Ana Ruiz" /><AvatarFallback>AR</AvatarFallback></Avatar>,
    examples: {
      "avatar-fallback": ({ Avatar, AvatarImage, AvatarFallback }) => <div className="showcase-button-row items-center"><Avatar><AvatarImage src="/missing-avatar.jpg" alt="Ana Ruiz" /><AvatarFallback>AR</AvatarFallback></Avatar><Avatar><AvatarImage src="/broken-avatar.jpg" alt="Luis Mora" /><AvatarFallback>LM</AvatarFallback></Avatar><Avatar><AvatarFallback>+3</AvatarFallback></Avatar></div>,
      "avatar-sizes": ({ Avatar, AvatarFallback }) => <div className="showcase-button-row items-center"><Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar><Avatar><AvatarFallback>MD</AvatarFallback></Avatar><Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar></div>,
      "avatar-group": ({ Avatar, AvatarFallback }) => <div className="flex -space-x-2">{["AR", "LM", "TS", "+3"].map(initials => <Avatar key={initials} className="ring-2 ring-background"><AvatarFallback>{initials}</AvatarFallback></Avatar>)}</div>,
    },
  },
  tooltip: {
    preview: ({ TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button }) => <TooltipProvider><Tooltip><TooltipTrigger render={<Button variant="outline">Save</Button>} /><TooltipContent>Save your changes (⌘S)</TooltipContent></Tooltip></TooltipProvider>,
    examples: {
      "tooltip-basic": ({ TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button }) => <TooltipProvider><Tooltip><TooltipTrigger render={<Button variant="outline">Save</Button>} /><TooltipContent>Save your changes (⌘S)</TooltipContent></Tooltip></TooltipProvider>,
      "tooltip-states": ({ TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button }) => <TooltipProvider><div className="showcase-button-row"><Tooltip><TooltipTrigger render={<Button>Publish</Button>} /><TooltipContent>Publish the project now</TooltipContent></Tooltip><Tooltip><TooltipTrigger render={<span tabIndex={0} className="inline-flex rounded-md" />}><Button disabled>Publish</Button></TooltipTrigger><TooltipContent>Fill in the required fields first</TooltipContent></Tooltip></div></TooltipProvider>,
    },
  },
  dialog: {
    preview: ({ Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button }) => <Dialog><DialogTrigger render={<Button>Edit profile</Button>} /><DialogContent><DialogHeader><DialogTitle>Edit profile</DialogTitle><DialogDescription>Change your display name. It is saved when you confirm.</DialogDescription></DialogHeader><DialogFooter><DialogClose render={<Button variant="outline">Cancel</Button>} /><DialogClose render={<Button>Save changes</Button>} /></DialogFooter></DialogContent></Dialog>,
    examples: {
      "dialog-basic": ({ Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button }) => <Dialog><DialogTrigger render={<Button>Edit profile</Button>} /><DialogContent><DialogHeader><DialogTitle>Edit profile</DialogTitle><DialogDescription>Change your display name. It is saved when you confirm.</DialogDescription></DialogHeader><DialogFooter><DialogClose render={<Button variant="outline">Cancel</Button>} /><DialogClose render={<Button>Save changes</Button>} /></DialogFooter></DialogContent></Dialog>,
      "dialog-select": ({ Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem }) => <Dialog><DialogTrigger render={<Button>Move project</Button>} /><DialogContent><DialogHeader><DialogTitle>Move project</DialogTitle><DialogDescription>Choose the destination workspace.</DialogDescription></DialogHeader><div className="mt-4"><Select defaultValue="acme"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="acme">Acme Studio</SelectItem><SelectItem value="labs">Labs</SelectItem><SelectItem value="personal">Personal</SelectItem></SelectContent></Select></div><DialogFooter><DialogClose render={<Button variant="outline">Cancel</Button>} /><DialogClose render={<Button>Move</Button>} /></DialogFooter></DialogContent></Dialog>,
      "dialog-lg": ({ Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button }) => <Dialog><DialogTrigger render={<Button variant="outline">View terms</Button>} /><DialogContent size="lg"><DialogHeader><DialogTitle>Platform terms of service and privacy policy</DialogTitle><DialogDescription>A long title that wraps without running under the X. Wide panel (size=&quot;lg&quot;) for long content.</DialogDescription></DialogHeader><div className="mt-4 max-h-64 overflow-y-auto text-sm text-muted-foreground"><p>By continuing you agree to the processing of your data under the current policy. You can withdraw consent at any time from your account settings.</p><p className="mt-3">The service is provided "as is", without implied warranties. Read the full version before accepting.</p></div><DialogFooter><DialogClose render={<Button variant="outline">Cancel</Button>} /><DialogClose render={<Button>Accept</Button>} /></DialogFooter></DialogContent></Dialog>,
      "dialog-persistent": ({ Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button }) => <Dialog dismissible={false}><DialogTrigger render={<Button variant="outline">Set up workspace</Button>} /><DialogContent showClose={false}><DialogHeader><DialogTitle>Finish the setup</DialogTitle><DialogDescription>With dismissible=&quot;false&quot; outside clicks and Escape do not close it; you have to choose an action.</DialogDescription></DialogHeader><DialogFooter><DialogClose render={<Button variant="outline">Not now</Button>} /><DialogClose render={<Button>Continue</Button>} /></DialogFooter></DialogContent></Dialog>,
    },
  },
  "alert-dialog": {
    preview: ({ AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogClose, Button }) => <AlertDialog><AlertDialogTrigger render={<Button variant="destructive">Delete project</Button>} /><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete "Redesign 2026"?</AlertDialogTitle><AlertDialogDescription>Its files and members will be removed. This action cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogClose render={<Button variant="outline">Cancel</Button>} /><AlertDialogClose render={<Button variant="destructive">Delete</Button>} /></AlertDialogFooter></AlertDialogContent></AlertDialog>,
    examples: {
      "alert-dialog-basic": ({ AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogClose, Button }) => <AlertDialog><AlertDialogTrigger render={<Button variant="destructive">Delete project</Button>} /><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete "Redesign 2026"?</AlertDialogTitle><AlertDialogDescription>Its files and members will be removed. This action cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogClose render={<Button variant="outline">Cancel</Button>} /><AlertDialogClose render={<Button variant="destructive">Delete</Button>} /></AlertDialogFooter></AlertDialogContent></AlertDialog>,
    },
  },
  "dropdown-menu": {
    preview: ({ DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, Button }) => <DropdownMenu><DropdownMenuTrigger render={<Button variant="outline">Options</Button>} /><DropdownMenuContent><DropdownMenuLabel>Project</DropdownMenuLabel><DropdownMenuItem>Edit</DropdownMenuItem><DropdownMenuItem>Duplicate</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem>Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu>,
    examples: {
      "dropdown-menu-basic": ({ DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, Button }) => <DropdownMenu><DropdownMenuTrigger render={<Button variant="outline">Options</Button>} /><DropdownMenuContent><DropdownMenuLabel>Project</DropdownMenuLabel><DropdownMenuItem>Edit</DropdownMenuItem><DropdownMenuItem>Duplicate</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem>Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu>,
      "dropdown-menu-table": ({ DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, Button }) => <table className="w-full max-w-md text-sm"><tbody>{["Redesign 2026", "Mobile app"].map(name => <tr key={name} className="border-b border-border"><td className="py-2 text-foreground">{name}</td><td className="py-2 text-right"><DropdownMenu><DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={"Actions for " + name}><span aria-hidden="true">⋯</span></Button>} /><DropdownMenuContent align="end"><DropdownMenuItem>Open</DropdownMenuItem><DropdownMenuItem>Rename</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem>Archive</DropdownMenuItem></DropdownMenuContent></DropdownMenu></td></tr>)}</tbody></table>,
    },
  },
  select: {
    preview: ({ Select, SelectTrigger, SelectValue, SelectContent, SelectItem }) => <Select defaultValue="acme"><SelectTrigger className="w-56"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="acme">Acme Studio</SelectItem><SelectItem value="labs">Labs</SelectItem><SelectItem value="personal">Personal</SelectItem></SelectContent></Select>,
    examples: {
      "select-basic": ({ Select, SelectTrigger, SelectValue, SelectContent, SelectItem }) => <Select defaultValue="acme"><SelectTrigger className="w-56"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="acme">Acme Studio</SelectItem><SelectItem value="labs">Labs</SelectItem><SelectItem value="personal">Personal</SelectItem></SelectContent></Select>,
      "select-groups": ({ Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectGroupLabel, SelectSeparator }) => <Select defaultValue="react"><SelectTrigger className="w-56"><SelectValue placeholder="Choose a framework" /></SelectTrigger><SelectContent><SelectGroup><SelectGroupLabel>Frontend</SelectGroupLabel><SelectItem value="react">React</SelectItem><SelectItem value="vue">Vue</SelectItem></SelectGroup><SelectSeparator /><SelectGroup><SelectGroupLabel>Meta-frameworks</SelectGroupLabel><SelectItem value="next">Next.js</SelectItem></SelectGroup></SelectContent></Select>,
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
