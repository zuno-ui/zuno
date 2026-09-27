"use client"

import { useId, useState, type ComponentType, type ComponentProps, type ReactNode, type ReactElement, type SVGProps } from "react"
import type { DateRange, DayPickerProps } from "react-day-picker"
import { es } from "react-day-picker/locale"
import { meta, type ComponentMeta, type ExampleMeta } from "./catalog-meta"
export { meta, componentNames, metaByName } from "./catalog-meta"
export type { ComponentMeta, ExampleMeta } from "./catalog-meta"

// Client render closures for the catalog, keyed by component name / example id.
// Pure metadata lives in catalog-meta.ts so Server Components can read it without a client boundary.

type ComboboxZone = { value: string; items: string[] }
type DatePickerDemoProps = { id?: string; placeholder?: string; disabled?: boolean; locale?: DayPickerProps["locale"]; formatOptions?: Intl.DateTimeFormatOptions; calendarProps?: Omit<DayPickerProps, "mode" | "selected" | "onSelect" | "required" | "locale">; className?: string; "aria-label"?: string; "aria-describedby"?: string; "aria-invalid"?: boolean }

export type DemoComponents = {
  Input: ComponentType<ComponentProps<"input">>
  Textarea: ComponentType<ComponentProps<"textarea">>
  Button: ComponentType<ComponentProps<"button"> & { variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link"; size?: "sm" | "default" | "lg" | "icon"; loading?: boolean; render?: ReactElement }>
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
  Breadcrumb: ComponentType<ComponentProps<"nav">>
  BreadcrumbList: ComponentType<ComponentProps<"ol">>
  BreadcrumbItem: ComponentType<ComponentProps<"li">>
  BreadcrumbLink: ComponentType<ComponentProps<"a">>
  BreadcrumbPage: ComponentType<ComponentProps<"span">>
  BreadcrumbSeparator: ComponentType<ComponentProps<"li">>
  BreadcrumbEllipsis: ComponentType<ComponentProps<"span"> & { label?: string }>
  breadcrumbLinkClass: string
  Kbd: ComponentType<ComponentProps<"kbd"> & { label?: string }>
  KbdGroup: ComponentType<ComponentProps<"kbd">>
  Empty: ComponentType<ComponentProps<"div">>
  EmptyMedia: ComponentType<ComponentProps<"div">>
  EmptyTitle: ComponentType<ComponentProps<"h3">>
  EmptyDescription: ComponentType<ComponentProps<"p">>
  EmptyActions: ComponentType<ComponentProps<"div">>
  Table: ComponentType<ComponentProps<"table"> & { density?: "comfortable" | "compact"; containerProps?: ComponentProps<"div"> }>
  TableHeader: ComponentType<ComponentProps<"thead">>
  TableBody: ComponentType<ComponentProps<"tbody">>
  TableFooter: ComponentType<ComponentProps<"tfoot">>
  TableRow: ComponentType<ComponentProps<"tr"> & { "data-state"?: string }>
  TableHead: ComponentType<ComponentProps<"th">>
  TableCell: ComponentType<ComponentProps<"td">>
  TableCaption: ComponentType<ComponentProps<"caption">>
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
  RadioGroup: ComponentType<{ children?: ReactNode; className?: string; defaultValue?: string; value?: string; onValueChange?: (value: unknown) => void; disabled?: boolean; name?: string; "aria-label"?: string; "aria-labelledby"?: string }>
  RadioGroupItem: ComponentType<{ id?: string; value: string; disabled?: boolean; className?: string; "aria-describedby"?: string }>
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
  Accordion: ComponentType<{ children?: ReactNode; className?: string; defaultValue?: string[]; multiple?: boolean }>
  AccordionItem: ComponentType<{ children?: ReactNode; className?: string; value: string; disabled?: boolean }>
  AccordionTrigger: ComponentType<{ children?: ReactNode; className?: string; headingLevel?: 2 | 3 | 4 | 5 | 6 }>
  AccordionContent: ComponentType<{ children?: ReactNode; className?: string }>
  Collapsible: ComponentType<{ children?: ReactNode; className?: string; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void }>
  CollapsibleTrigger: ComponentType<{ children?: ReactNode; render?: ReactElement }>
  CollapsibleContent: ComponentType<{ children?: ReactNode; className?: string; hiddenUntilFound?: boolean }>
  Calendar: ComponentType<DayPickerProps>
  DatePicker: ComponentType<DatePickerDemoProps & { value?: Date; defaultValue?: Date; onValueChange?: (date: Date | undefined) => void; name?: string }>
  DateRangePicker: ComponentType<DatePickerDemoProps & { value?: DateRange; defaultValue?: DateRange; onValueChange?: (range: DateRange | undefined) => void }>
  Combobox: ComponentType<{ children?: ReactNode; items?: readonly string[] | readonly ComboboxZone[]; multiple?: boolean; defaultValue?: string | string[] | null }>
  ComboboxInput: ComponentType<{ id?: string; placeholder?: string; className?: string; showTrigger?: boolean; showClear?: boolean; "aria-label"?: string; "aria-invalid"?: boolean; disabled?: boolean }>
  ComboboxChips: ComponentType<{ children?: ReactNode; className?: string }>
  ComboboxChip: ComponentType<{ children?: ReactNode; className?: string }>
  ComboboxChipsInput: ComponentType<{ placeholder?: string; className?: string; "aria-label"?: string }>
  ComboboxValue: ComponentType<{ children?: ((value: string[]) => ReactNode) }>
  ComboboxContent: ComponentType<{ children?: ReactNode; className?: string }>
  ComboboxList: ComponentType<{ children?: ReactNode | ((item: string) => ReactNode) | ((group: ComboboxZone) => ReactNode); className?: string }>
  ComboboxItem: ComponentType<{ children?: ReactNode; value: string; className?: string; disabled?: boolean }>
  ComboboxEmpty: ComponentType<{ children?: ReactNode; className?: string }>
  ComboboxGroup: ComponentType<{ children?: ReactNode; items?: readonly string[] }>
  ComboboxGroupLabel: ComponentType<{ children?: ReactNode; className?: string }>
  ComboboxCollection: ComponentType<{ children: (item: string) => ReactNode }>
  ScrollArea: ComponentType<{ children?: ReactNode; className?: string; orientation?: "vertical" | "horizontal" | "both"; "aria-label"?: string }>
  Slider: ComponentType<{ children?: ReactNode; className?: string; defaultValue?: number | number[]; value?: number | number[]; min?: number; max?: number; step?: number; disabled?: boolean; format?: Intl.NumberFormatOptions; thumbLabels?: string[] }>
  SliderLabel: ComponentType<{ children?: ReactNode; className?: string }>
  SliderValue: ComponentType<{ className?: string }>
  Progress: ComponentType<{ children?: ReactNode; className?: string; value: number | null; getAriaValueText?: (formattedValue: string | null, value: number | null) => string }>
  ProgressLabel: ComponentType<{ children?: ReactNode; className?: string }>
  ProgressValue: ComponentType<{ className?: string }>
  Toggle: ComponentType<{ children?: ReactNode; className?: string; variant?: "default" | "outline"; size?: "sm" | "default" | "lg"; pressed?: boolean; defaultPressed?: boolean; disabled?: boolean; "aria-label"?: string }>
  ToggleGroup: ComponentType<{ children?: ReactNode; className?: string; variant?: "default" | "outline"; size?: "sm" | "default" | "lg"; multiple?: boolean; orientation?: "horizontal" | "vertical"; defaultValue?: string[]; "aria-label"?: string }>
  ToggleGroupItem: ComponentType<{ children?: ReactNode; className?: string; value: string; disabled?: boolean; "aria-label"?: string }>
  InputOTP: ComponentType<{ id?: string; className?: string; length: number; groups?: number[]; value?: string; defaultValue?: string; onValueChange?: (value: string) => void; onValueComplete?: (value: string) => void; validationType?: "numeric" | "alpha" | "alphanumeric" | "none"; normalizeValue?: (value: string) => string; invalid?: boolean; describedBy?: string; disabled?: boolean }>
  NavigationMenu: ComponentType<{ children?: ReactNode; className?: string; "aria-label"?: string }>
  NavigationMenuList: ComponentType<{ children?: ReactNode; className?: string }>
  NavigationMenuItem: ComponentType<{ children?: ReactNode; className?: string }>
  NavigationMenuTrigger: ComponentType<{ children?: ReactNode; className?: string }>
  NavigationMenuContent: ComponentType<{ children?: ReactNode; className?: string }>
  NavigationMenuLink: ComponentType<{ children?: ReactNode; className?: string; href?: string; active?: boolean; onClick?: ComponentProps<"a">["onClick"] }>
  navigationMenuTriggerClass: string
  Popover: ComponentType<{ children?: ReactNode; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void }>
  PopoverTrigger: ComponentType<{ children?: ReactNode; render?: ReactElement; openOnHover?: boolean }>
  PopoverContent: ComponentType<{ children?: ReactNode; className?: string; side?: "top" | "right" | "bottom" | "left"; align?: "start" | "center" | "end"; sideOffset?: number }>
  PopoverHeader: ComponentType<ComponentProps<"div">>
  PopoverTitle: ComponentType<{ children?: ReactNode; className?: string }>
  PopoverDescription: ComponentType<{ children?: ReactNode; className?: string }>
  PopoverClose: ComponentType<{ children?: ReactNode; render?: ReactElement }>
  Drawer: ComponentType<{ children?: ReactNode; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void }>
  DrawerTrigger: ComponentType<{ children?: ReactNode; render?: ReactElement }>
  DrawerClose: ComponentType<{ children?: ReactNode; render?: ReactElement }>
  DrawerContent: ComponentType<{ children?: ReactNode; className?: string; showClose?: boolean }>
  DrawerHeader: ComponentType<ComponentProps<"div">>
  DrawerFooter: ComponentType<ComponentProps<"div">>
  DrawerTitle: ComponentType<{ children?: ReactNode; className?: string }>
  DrawerDescription: ComponentType<{ children?: ReactNode; className?: string }>
  Sheet: ComponentType<{ children?: ReactNode; side?: "top" | "right" | "bottom" | "left"; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void }>
  SheetTrigger: ComponentType<{ children?: ReactNode; render?: ReactElement }>
  SheetClose: ComponentType<{ children?: ReactNode; render?: ReactElement }>
  SheetContent: ComponentType<{ children?: ReactNode; className?: string; showClose?: boolean }>
  SheetHeader: ComponentType<ComponentProps<"div">>
  SheetFooter: ComponentType<ComponentProps<"div">>
  SheetTitle: ComponentType<{ children?: ReactNode; className?: string }>
  SheetDescription: ComponentType<{ children?: ReactNode; className?: string }>
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

const tableProjects = [
  { name: "Redesign 2026", status: "success", label: "On track", budget: "$12,400" },
  { name: "Mobile app", status: "warning", label: "At risk", budget: "$18,250" },
  { name: "Docs migration", status: "neutral", label: "Paused", budget: "$1,000" },
] as const

function TableProjects({ ui, caption }: { ui: DemoComponents; caption?: boolean }) {
  const { Table, TableCaption, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, StatusBadge } = ui
  return <Table className="min-w-[28rem]" containerProps={{ className: "max-w-xl", tabIndex: 0, role: "region", "aria-label": "Active projects" }}>
    {caption && <TableCaption>Active projects this quarter.</TableCaption>}
    <TableHeader><TableRow><TableHead>Project</TableHead><TableHead>Status</TableHead><TableHead className="text-end">Budget</TableHead></TableRow></TableHeader>
    <TableBody>{tableProjects.map(project => <TableRow key={project.name}><TableCell className="font-medium">{project.name}</TableCell><TableCell><StatusBadge status={project.status}>{project.label}</StatusBadge></TableCell><TableCell className="text-end tabular-nums">{project.budget}</TableCell></TableRow>)}</TableBody>
    {caption && <TableFooter><TableRow><TableCell colSpan={2}>Total</TableCell><TableCell className="text-end tabular-nums">$31,650</TableCell></TableRow></TableFooter>}
  </Table>
}

function TableSelectionExample({ ui }: { ui: DemoComponents }) {
  const { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Checkbox } = ui
  const rows = tableProjects.map(project => project.name as string)
  const [selected, setSelected] = useState<string[]>(["Mobile app"])
  return <Table containerProps={{ className: "max-w-md" }}>
    <TableHeader><TableRow><TableHead><Checkbox aria-label="Select all" checked={selected.length === rows.length} indeterminate={selected.length > 0 && selected.length < rows.length} onCheckedChange={all => setSelected(all ? rows : [])} /></TableHead><TableHead>Project</TableHead></TableRow></TableHeader>
    <TableBody>{rows.map(name => <TableRow key={name} data-state={selected.includes(name) ? "selected" : undefined}><TableCell><Checkbox aria-label={"Select " + name} checked={selected.includes(name)} onCheckedChange={on => setSelected(on ? [...selected, name] : selected.filter(item => item !== name))} /></TableCell><TableCell>{name}</TableCell></TableRow>)}</TableBody>
  </Table>
}

const faq = [["billing", "How does billing work?", "Plans are billed monthly and you can cancel anytime from settings."], ["team", "Can I invite my team?", "Yes, Pro includes up to 10 members; Team has no limit."], ["export", "Can I export my data?", "Export any project as JSON or CSV from its settings page."]]
const settingsSections = [["profile", "Profile", "Name, photo and public details."], ["notifications", "Notifications", "Email and push preferences."], ["security", "Security", "Password, sessions and two-factor authentication."]]

function AccordionList({ ui, items, multiple, defaultValue }: { ui: DemoComponents; items: string[][]; multiple?: boolean; defaultValue?: string[] }) {
  const { Accordion, AccordionItem, AccordionTrigger, AccordionContent } = ui
  return <Accordion multiple={multiple} defaultValue={defaultValue} className="max-w-md">{items.map(([value, title, body]) => <AccordionItem key={value} value={value}><AccordionTrigger>{title}</AccordionTrigger><AccordionContent>{body}</AccordionContent></AccordionItem>)}</Accordion>
}

function CollapsibleRepos({ ui }: { ui: DemoComponents }) {
  const { Collapsible, CollapsibleTrigger, CollapsibleContent, Button } = ui
  const [open, setOpen] = useState(false)
  const row = "rounded-md border border-border px-3 py-2 font-mono text-sm text-foreground"
  return <Collapsible open={open} onOpenChange={setOpen} className="grid w-full max-w-xs gap-2">
    <p className="text-sm font-medium text-foreground">3 repositories starred</p>
    <div className={row}>@zuno/ui</div>
    <CollapsibleContent><div className="grid gap-2"><div className={row}>@zuno/cli</div><div className={row}>@zuno/tokens</div></div></CollapsibleContent>
    <CollapsibleTrigger render={<Button variant="ghost" size="sm" className="justify-self-start">{open ? "Show less" : "Show all"}</Button>} />
  </Collapsible>
}

function CalendarSingle({ ui }: { ui: DemoComponents }) {
  const { Calendar } = ui
  const [date, setDate] = useState<Date | undefined>(() => new Date())
  return <Calendar mode="single" selected={date} onSelect={setDate} footer={<p className="pt-3 text-xs text-muted-foreground" aria-live="polite">{date ? "Selected: " + date.toLocaleDateString("en-US", { dateStyle: "long" }) : "Pick a day."}</p>} />
}

function CalendarRange({ ui }: { ui: DemoComponents }) {
  const { Calendar } = ui
  const [range, setRange] = useState<DateRange | undefined>()
  return <Calendar mode="range" numberOfMonths={2} selected={range} onSelect={setRange} />
}

function CalendarDisabled({ ui }: { ui: DemoComponents }) {
  const { Calendar } = ui
  const [today] = useState(() => new Date())
  const [date, setDate] = useState<Date | undefined>()
  return <Calendar mode="single" selected={date} onSelect={setDate} disabled={[{ before: today }, { dayOfWeek: [0, 6] }]} startMonth={today} endMonth={new Date(today.getFullYear(), today.getMonth() + 2)} />
}

function CalendarLocale({ ui }: { ui: DemoComponents }) {
  const { Calendar } = ui
  const [date, setDate] = useState<Date | undefined>()
  return <Calendar mode="single" selected={date} onSelect={setDate} locale={es} captionLayout="dropdown" startMonth={new Date(1950, 0)} endMonth={new Date(2030, 11)} />
}

function DatePickerBasic({ ui }: { ui: DemoComponents }) {
  const { DatePicker, Label } = ui
  const id = useId()
  const [date, setDate] = useState<Date>()
  return <div className="flex w-full max-w-xs flex-col gap-2"><Label htmlFor={id}>Due date</Label><DatePicker id={id} value={date} onValueChange={setDate} /></div>
}

function DatePickerRange({ ui }: { ui: DemoComponents }) {
  const { DateRangePicker, Label } = ui
  const id = useId()
  const [range, setRange] = useState<DateRange>()
  return <div className="flex w-full max-w-xs flex-col gap-2"><Label htmlFor={id}>Stay</Label><DateRangePicker id={id} value={range} onValueChange={setRange} /></div>
}

function DatePickerForm({ ui }: { ui: DemoComponents }) {
  const { DatePicker, Label, Button } = ui
  const id = useId()
  const [today] = useState(() => new Date())
  const [date, setDate] = useState<Date>()
  const [error, setError] = useState(false)
  const [sent, setSent] = useState<string>()
  return <form noValidate className="flex w-full max-w-xs flex-col gap-2" onSubmit={event => { event.preventDefault(); const value = new FormData(event.currentTarget).get("delivery"); setError(!value); setSent(value ? String(value) : undefined) }}>
    <Label htmlFor={id}>Delivery date</Label>
    <DatePicker id={id} name="delivery" value={date} onValueChange={next => { setDate(next); if (next) setError(false) }} aria-invalid={error || undefined} aria-describedby={id + (error ? "-error" : "-help")} calendarProps={{ disabled: [{ before: today }, { dayOfWeek: [0, 6] }] }} />
    {error ? <p id={id + "-error"} className="text-sm text-destructive">Choose a delivery date.</p> : <p id={id + "-help"} className="text-sm text-muted-foreground">Weekdays from today; sent as YYYY-MM-DD.</p>}
    <div className="flex items-center gap-3 pt-1"><Button type="submit">Schedule</Button>{sent && <span className="text-sm text-muted-foreground" role="status">Sent: {sent}</span>}</div>
  </form>
}

function DatePickerLocale({ ui }: { ui: DemoComponents }) {
  const { DatePicker } = ui
  return <div className="w-full max-w-xs"><DatePicker aria-label="Fecha de inicio" placeholder="Elige una fecha" locale={es} formatOptions={{ dateStyle: "full" }} /></div>
}

const radioPlans = [
  { value: "free", label: "Free", description: "Up to 3 projects and community support." },
  { value: "pro", label: "Pro", description: "Unlimited projects, history and priority support." },
  { value: "team", label: "Team", description: "Everything in Pro plus roles and SSO." },
]

function RadioOption({ ui, id, value, label, disabled }: { ui: DemoComponents; id: string; value: string; label: string; disabled?: boolean }) {
  const { RadioGroupItem, Label } = ui
  return <div className="flex items-center gap-2"><RadioGroupItem id={id + value} value={value} disabled={disabled} /><Label htmlFor={id + value}>{label}</Label></div>
}

function RadioBasic({ ui }: { ui: DemoComponents }) {
  const id = useId()
  return <div className="grid gap-3"><p id={id + "label"} className="text-sm font-medium text-foreground">Notify me about</p><ui.RadioGroup aria-labelledby={id + "label"} defaultValue="mentions">{[["all", "All new messages"], ["mentions", "Direct messages and mentions"], ["none", "Nothing"]].map(([value, label]) => <RadioOption key={value} ui={ui} id={id} value={value} label={label} />)}</ui.RadioGroup></div>
}

function RadioDescriptions({ ui }: { ui: DemoComponents }) {
  const { RadioGroup, RadioGroupItem, Label } = ui
  const id = useId()
  return <RadioGroup aria-label="Plan" defaultValue="pro" className="max-w-sm gap-4">{radioPlans.map(plan => <div key={plan.value} className="flex items-start gap-3"><RadioGroupItem id={id + plan.value} value={plan.value} aria-describedby={id + plan.value + "desc"} className="mt-0.5" /><div className="grid gap-1"><Label htmlFor={id + plan.value}>{plan.label}</Label><p id={id + plan.value + "desc"} className="text-sm text-muted-foreground">{plan.description}</p></div></div>)}</RadioGroup>
}

function RadioHorizontal({ ui }: { ui: DemoComponents }) {
  const id = useId()
  return <ui.RadioGroup aria-label="Density" defaultValue="comfortable" className="flex gap-6"><RadioOption ui={ui} id={id} value="comfortable" label="Comfortable" /><RadioOption ui={ui} id={id} value="compact" label="Compact" /></ui.RadioGroup>
}

function RadioStates({ ui }: { ui: DemoComponents }) {
  const id = useId()
  return <ui.RadioGroup aria-label="Shipping" defaultValue="standard"><RadioOption ui={ui} id={id} value="standard" label="Standard" /><RadioOption ui={ui} id={id} value="express" label="Express" /><RadioOption ui={ui} id={id} value="same-day" label="Same day (unavailable)" disabled /></ui.RadioGroup>
}

const alignIcon = (lines: string) => <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d={lines} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
const alignments = [["left", "Align left", "M2.5 4h11M2.5 8h7M2.5 12h9"], ["center", "Align center", "M2.5 4h11M4.5 8h7M3.5 12h9"], ["right", "Align right", "M2.5 4h11M6.5 8h7M4.5 12h9"]] as const
const starIcon = <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m8 2 1.8 3.8 4.2.5-3.1 2.9.8 4.1L8 11.3l-3.7 2 .8-4.1L2 6.3l4.2-.5L8 2Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" /></svg>

const scrollTags = Array.from({ length: 40 }, (_, index) => `v1.2.0-beta.${40 - index}`)
const scrollCovers = ["Aurora", "Basalt", "Cirrus", "Dune", "Ember", "Fjord", "Glacier"]
const scrollLog = Array.from({ length: 24 }, (_, index) => `[09:${String(index).padStart(2, "0")}:12] INFO  worker-${index % 3} processed batch ${1200 + index} in ${40 + index * 3}ms — queue=default region=eu-west-1 retries=0`).join("\n")

function SliderRow({ ui, label }: { ui: DemoComponents; label: string }) {
  return <div className="flex items-center justify-between"><ui.SliderLabel>{label}</ui.SliderLabel><ui.SliderValue /></div>
}

function ProgressLive({ ui }: { ui: DemoComponents }) {
  const { Progress, ProgressLabel, ProgressValue, Button } = ui
  const [value, setValue] = useState(0)
  const start = () => {
    setValue(0)
    const timer = setInterval(() => setValue(current => { const next = Math.min(100, current + 20); if (next === 100) clearInterval(timer); return next }), 500)
  }
  return <div className="grid w-full max-w-sm gap-3">
    <Progress value={value} getAriaValueText={(_, current) => (current ?? 0) + "% uploaded"}><div className="flex items-center justify-between"><ProgressLabel>report.pdf</ProgressLabel><ProgressValue /></div></Progress>
    <div className="flex items-center gap-3"><Button size="sm" variant="outline" onClick={start} disabled={value > 0 && value < 100}>{value === 100 ? "Upload again" : "Upload"}</Button><p role="status" className="text-sm text-muted-foreground">{value === 100 ? "Upload complete." : ""}</p></div>
  </div>
}

const releaseNotes = Array.from({ length: 14 }, (_, index) => `v1.${14 - index}.0 — Faster search, clearer empty states and fixes for keyboard navigation in menus.`)

function DrawerGoal({ ui }: { ui: DemoComponents }) {
  const { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, Button } = ui
  return <Drawer><DrawerTrigger render={<Button variant="outline">Set goal</Button>} /><DrawerContent><DrawerHeader><DrawerTitle>Move goal</DrawerTitle><DrawerDescription>Set your daily activity goal.</DrawerDescription></DrawerHeader><p className="py-4 text-center text-5xl font-semibold tabular-nums text-foreground">350<span className="block text-xs font-normal text-muted-foreground">calories / day</span></p><DrawerFooter><DrawerClose render={<Button>Save goal</Button>} /><DrawerClose render={<Button variant="outline">Cancel</Button>} /></DrawerFooter></DrawerContent></Drawer>
}

function SheetForm({ ui }: { ui: DemoComponents }) {
  const { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose, Button, Input, Label } = ui
  const id = useId()
  return <Sheet><SheetTrigger render={<Button variant="outline">Edit profile</Button>} /><SheetContent><SheetHeader><SheetTitle>Edit profile</SheetTitle><SheetDescription>Changes are visible to your team.</SheetDescription></SheetHeader><div className="grid gap-2"><Label htmlFor={id + "name"}>Name</Label><Input id={id + "name"} defaultValue="Ana García" /></div><div className="grid gap-2"><Label htmlFor={id + "role"}>Role</Label><Input id={id + "role"} defaultValue="Product designer" /></div><SheetFooter><SheetClose render={<Button variant="outline">Cancel</Button>} /><SheetClose render={<Button>Save</Button>} /></SheetFooter></SheetContent></Sheet>
}

function Crumbs({ ui, separator, collapsed }: { ui: DemoComponents; separator?: ReactNode; collapsed?: boolean }) {
  const { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis, breadcrumbLinkClass, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } = ui
  const sep = <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
  if (collapsed) return <Breadcrumb><BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="#" onClick={preventNav}>Home</BreadcrumbLink></BreadcrumbItem>{sep}
    <BreadcrumbItem><DropdownMenu><DropdownMenuTrigger render={<button type="button" className={breadcrumbLinkClass} />}><BreadcrumbEllipsis /></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Workspace</DropdownMenuItem><DropdownMenuItem>Projects</DropdownMenuItem></DropdownMenuContent></DropdownMenu></BreadcrumbItem>{sep}
    <BreadcrumbItem><BreadcrumbPage title="Quarterly roadmap and delivery plan for 2026">Quarterly roadmap and delivery plan for 2026</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList></Breadcrumb>
  return <Breadcrumb><BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="#" onClick={preventNav}>Home</BreadcrumbLink></BreadcrumbItem>{sep}
    <BreadcrumbItem><BreadcrumbLink href="#" onClick={preventNav}>Components</BreadcrumbLink></BreadcrumbItem>{sep}
    <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList></Breadcrumb>
}

function OtpBasic({ ui }: { ui: DemoComponents }) {
  const { InputOTP, Label } = ui
  const id = useId()
  const [done, setDone] = useState(false)
  return <div className="grid gap-2"><Label htmlFor={id}>Verification code</Label><InputOTP id={id} length={6} groups={[3, 3]} onValueChange={value => setDone(value.length === 6)} /><p role="status" className="min-h-5 text-sm text-muted-foreground">{done ? "Code complete." : ""}</p></div>
}

function OtpError({ ui }: { ui: DemoComponents }) {
  const { InputOTP, Label, Button } = ui
  const id = useId()
  const [code, setCode] = useState("")
  const [error, setError] = useState(false)
  const [resent, setResent] = useState(false)
  return <div className="grid gap-2">
    <Label htmlFor={id}>Enter the code we sent you</Label>
    <InputOTP id={id} length={6} value={code} onValueChange={value => { setCode(value); setError(false) }} onValueComplete={value => setError(value !== "123456")} invalid={error} describedBy={id + "help"} />
    <p id={id + "help"} className={error ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>{error ? "That code is not valid. Check it or request a new one." : resent ? "We sent a new code." : "Check your inbox for a 6-digit code."}</p>
    <Button variant="link" className="justify-self-start px-0" onClick={() => { setCode(""); setError(false); setResent(true) }}>Resend code</Button>
  </div>
}

const navProducts = [["Analytics", "Dashboards and reports for every team."], ["Automations", "Workflows triggered by your data."], ["Integrations", "Connect the tools you already use."], ["Security", "SSO, roles and audit logs."]]
const navResources = ["Documentation", "Changelog", "Community"]
const preventNav: ComponentProps<"a">["onClick"] = event => event.preventDefault()

function NavMenuBasic({ ui }: { ui: DemoComponents }) {
  const { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, navigationMenuTriggerClass } = ui
  return <NavigationMenu aria-label="Main"><NavigationMenuList>
    <NavigationMenuItem><NavigationMenuTrigger>Products</NavigationMenuTrigger><NavigationMenuContent><ul className="grid gap-1 sm:grid-cols-2">{navProducts.map(([title, description]) => <li key={title}><NavigationMenuLink href="#" onClick={preventNav}><span className="font-medium">{title}</span><span className="block text-muted-foreground">{description}</span></NavigationMenuLink></li>)}</ul></NavigationMenuContent></NavigationMenuItem>
    <NavigationMenuItem><NavigationMenuTrigger>Resources</NavigationMenuTrigger><NavigationMenuContent className="w-64"><ul className="grid gap-1">{navResources.map(title => <li key={title}><NavigationMenuLink href="#" onClick={preventNav}>{title}</NavigationMenuLink></li>)}</ul></NavigationMenuContent></NavigationMenuItem>
    <NavigationMenuItem><NavigationMenuLink href="#" onClick={preventNav} className={navigationMenuTriggerClass}>Pricing</NavigationMenuLink></NavigationMenuItem>
  </NavigationMenuList></NavigationMenu>
}

const comboboxFrameworks = ["Next.js", "Remix", "Astro", "Vite", "Nuxt", "SvelteKit", "Gatsby"]
const comboboxZones: ComboboxZone[] = [{ value: "Americas", items: ["New York", "Mexico City", "São Paulo"] }, { value: "Europe", items: ["London", "Madrid", "Berlin"] }]
const comboboxSkills = ["React", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS", "Testing"]

function ComboboxBasic({ ui }: { ui: DemoComponents }) {
  const { Combobox, ComboboxInput, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem, Label } = ui
  const id = useId()
  return <div className="flex w-full max-w-xs flex-col gap-2">
    <Label htmlFor={id}>Framework</Label>
    <Combobox items={comboboxFrameworks}><ComboboxInput id={id} placeholder="Search a framework" showClear /><ComboboxContent><ComboboxEmpty>No framework found.</ComboboxEmpty><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox>
  </div>
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
      "button-variants": ({ Button }) => <div className="showcase-button-row"><Button>Save</Button><Button variant="secondary">Duplicate</Button><Button variant="outline">Cancel</Button><Button variant="ghost">Discard</Button><Button variant="destructive">Delete</Button><Button variant="link">Show details</Button></div>,
      "button-as-link": ({ Button }) => <Button render={<a href="/docs" />}>Read documentation</Button>,
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
  breadcrumb: {
    preview: ui => <Crumbs ui={ui} />,
    examples: {
      "breadcrumb-basic": ui => <Crumbs ui={ui} />,
      "breadcrumb-collapsed": ui => <Crumbs ui={ui} collapsed />,
      "breadcrumb-separator": ui => <Crumbs ui={ui} separator="/" />,
    },
  },
  kbd: {
    preview: ({ Kbd, KbdGroup }) => <KbdGroup><Kbd label="Command">⌘</Kbd><Kbd>K</Kbd></KbdGroup>,
    examples: {
      "kbd-shortcut": ({ Kbd, KbdGroup }) => <div className="flex items-center gap-4"><KbdGroup><Kbd label="Command">⌘</Kbd><Kbd>K</Kbd></KbdGroup><KbdGroup><Kbd label="Control">Ctrl</Kbd><Kbd label="Shift">⇧</Kbd><Kbd>P</Kbd></KbdGroup></div>,
      "kbd-in-button": ({ Kbd, KbdGroup, Button }) => <Button variant="outline" aria-keyshortcuts="Meta+K">Search<KbdGroup className="ms-2"><Kbd label="Command">⌘</Kbd><Kbd>K</Kbd></KbdGroup></Button>,
      "kbd-in-text": ({ Kbd }) => <p className="text-sm text-foreground">Press <Kbd>Esc</Kbd> to close, or <Kbd label="Enter">↵</Kbd> to confirm.</p>,
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
  table: {
    preview: ui => <TableProjects ui={ui} />,
    examples: {
      "table-basic": ui => <TableProjects ui={ui} caption />,
      "table-compact": ({ Table, TableHeader, TableBody, TableRow, TableHead, TableCell }) => <Table density="compact" containerProps={{ className: "max-w-xl rounded-lg border border-border" }}><TableHeader><TableRow><TableHead>Event</TableHead><TableHead>User</TableHead><TableHead className="text-end">Time</TableHead></TableRow></TableHeader><TableBody>{[["Project created", "Ana", "09:12"], ["Member invited", "Luis", "09:30"], ["Budget updated", "Ana", "10:05"], ["File uploaded", "Marta", "10:41"]].map(([name, user, time]) => <TableRow key={name + time}><TableCell>{name}</TableCell><TableCell className="text-muted-foreground">{user}</TableCell><TableCell className="text-end tabular-nums">{time}</TableCell></TableRow>)}</TableBody></Table>,
      "table-selection": ui => <TableSelectionExample ui={ui} />,
      "table-empty": ({ Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Empty, EmptyTitle, EmptyDescription }) => <Table containerProps={{ className: "max-w-xl" }}><TableHeader><TableRow><TableHead>Project</TableHead><TableHead>Owner</TableHead><TableHead className="text-end">Budget</TableHead></TableRow></TableHeader><TableBody><TableRow className="hover:bg-transparent"><TableCell colSpan={3}><Empty className="border-0"><EmptyTitle>No matching projects</EmptyTitle><EmptyDescription>Try a different search or clear the filters.</EmptyDescription></Empty></TableCell></TableRow></TableBody></Table>,
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
  "radio-group": {
    preview: ui => <RadioBasic ui={ui} />,
    examples: {
      "radio-group-basic": ui => <RadioBasic ui={ui} />,
      "radio-group-descriptions": ui => <RadioDescriptions ui={ui} />,
      "radio-group-horizontal": ui => <RadioHorizontal ui={ui} />,
      "radio-group-states": ui => <RadioStates ui={ui} />,
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
  accordion: {
    preview: ui => <AccordionList ui={ui} items={faq} defaultValue={["billing"]} />,
    examples: {
      "accordion-basic": ui => <AccordionList ui={ui} items={faq} defaultValue={["billing"]} />,
      "accordion-multiple": ui => <AccordionList ui={ui} items={settingsSections} multiple defaultValue={["profile", "notifications"]} />,
      "accordion-disabled": ({ Accordion, AccordionItem, AccordionTrigger, AccordionContent }) => <Accordion className="max-w-md"><AccordionItem value="overview"><AccordionTrigger headingLevel={2}>Overview</AccordionTrigger><AccordionContent>Usage, members and billing at a glance.</AccordionContent></AccordionItem><AccordionItem value="audit" disabled><AccordionTrigger headingLevel={2}>Audit log (Enterprise)</AccordionTrigger><AccordionContent>Every change with its author and date.</AccordionContent></AccordionItem><AccordionItem value="api"><AccordionTrigger headingLevel={2}>API keys</AccordionTrigger><AccordionContent>Create and revoke keys for integrations.</AccordionContent></AccordionItem></Accordion>,
    },
  },
  collapsible: {
    preview: ui => <CollapsibleRepos ui={ui} />,
    examples: {
      "collapsible-basic": ui => <CollapsibleRepos ui={ui} />,
      "collapsible-details": ({ Collapsible, CollapsibleTrigger, CollapsibleContent, Button }) => <Collapsible defaultOpen className="grid w-full max-w-xs gap-3"><CollapsibleTrigger render={<Button variant="outline" size="sm" className="justify-self-start">Order details</Button>} /><CollapsibleContent><dl className="grid grid-cols-2 gap-2 text-sm"><dt className="text-muted-foreground">Order</dt><dd className="text-foreground">#4821</dd><dt className="text-muted-foreground">Carrier</dt><dd className="text-foreground">DHL Express</dd><dt className="text-muted-foreground">Arrives</dt><dd className="text-foreground">Oct 2</dd></dl></CollapsibleContent></Collapsible>,
    },
  },
  calendar: {
    preview: ui => <CalendarSingle ui={ui} />,
    examples: {
      "calendar-single": ui => <CalendarSingle ui={ui} />,
      "calendar-range": ui => <CalendarRange ui={ui} />,
      "calendar-disabled": ui => <CalendarDisabled ui={ui} />,
      "calendar-locale": ui => <CalendarLocale ui={ui} />,
    },
  },
  "date-picker": {
    preview: ui => <DatePickerBasic ui={ui} />,
    examples: {
      "date-picker-basic": ui => <DatePickerBasic ui={ui} />,
      "date-picker-range": ui => <DatePickerRange ui={ui} />,
      "date-picker-form": ui => <DatePickerForm ui={ui} />,
      "date-picker-locale": ui => <DatePickerLocale ui={ui} />,
    },
  },
  combobox: {
    preview: ui => <ComboboxBasic ui={ui} />,
    examples: {
      "combobox-basic": ui => <ComboboxBasic ui={ui} />,
      "combobox-groups": ({ Combobox, ComboboxInput, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxGroup, ComboboxGroupLabel, ComboboxCollection, ComboboxItem }) => <div className="w-full max-w-xs"><Combobox items={comboboxZones}><ComboboxInput placeholder="Search a time zone" aria-label="Time zone" /><ComboboxContent><ComboboxEmpty>No time zone found.</ComboboxEmpty><ComboboxList>{(group: ComboboxZone) => <ComboboxGroup key={group.value} items={group.items}><ComboboxGroupLabel>{group.value}</ComboboxGroupLabel><ComboboxCollection>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxCollection></ComboboxGroup>}</ComboboxList></ComboboxContent></Combobox></div>,
      "combobox-multiple": ({ Combobox, ComboboxChips, ComboboxValue, ComboboxChip, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem }) => <div className="w-full max-w-sm"><Combobox items={comboboxSkills} multiple defaultValue={["React", "TypeScript"]}><ComboboxChips><ComboboxValue>{(value: string[]) => <>{value.map(item => <ComboboxChip key={item}>{item}</ComboboxChip>)}<ComboboxChipsInput placeholder={value.length ? "" : "Add skills"} aria-label="Skills" /></>}</ComboboxValue></ComboboxChips><ComboboxContent><ComboboxEmpty>No skill found.</ComboboxEmpty><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox></div>,
    },
  },
  "scroll-area": {
    preview: ({ ScrollArea }) => <ScrollArea className="h-72 w-48 rounded-lg border border-border" aria-label="Tags"><div className="p-4"><p className="mb-2 text-sm font-medium text-foreground">Tags</p>{scrollTags.map(tag => <div key={tag} className="border-b border-border py-2 text-sm text-foreground">{tag}</div>)}</div></ScrollArea>,
    examples: {
      "scroll-area-list": ({ ScrollArea }) => <ScrollArea className="h-72 w-48 rounded-lg border border-border" aria-label="Tags"><div className="p-4"><p className="mb-2 text-sm font-medium text-foreground">Tags</p>{scrollTags.map(tag => <div key={tag} className="border-b border-border py-2 text-sm text-foreground">{tag}</div>)}</div></ScrollArea>,
      "scroll-area-horizontal": ({ ScrollArea }) => <ScrollArea orientation="horizontal" className="w-full max-w-md rounded-lg border border-border" aria-label="Covers"><div className="flex gap-3 p-4">{scrollCovers.map(cover => <figure key={cover} className="shrink-0"><div className="h-32 w-40 rounded-md bg-muted" /><figcaption className="pt-2 text-xs text-muted-foreground">{cover}</figcaption></figure>)}</div></ScrollArea>,
      "scroll-area-both": ({ ScrollArea }) => <ScrollArea orientation="both" className="h-56 w-full max-w-md rounded-lg border border-border" aria-label="Worker log"><pre className="p-4 font-mono text-xs text-foreground">{scrollLog}</pre></ScrollArea>,
    },
  },
  slider: {
    preview: ui => <ui.Slider defaultValue={40} className="max-w-sm"><SliderRow ui={ui} label="Volume" /></ui.Slider>,
    examples: {
      "slider-basic": ui => <ui.Slider defaultValue={40} className="max-w-sm"><SliderRow ui={ui} label="Volume" /></ui.Slider>,
      "slider-range": ui => <ui.Slider defaultValue={[200, 800]} min={0} max={1000} step={10} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} thumbLabels={["Minimum price", "Maximum price"]} className="max-w-sm"><SliderRow ui={ui} label="Price" /></ui.Slider>,
      "slider-steps": ui => <div className="grid w-full max-w-sm gap-8"><ui.Slider defaultValue={0.5} min={0} max={1} step={0.25} format={{ style: "percent" }}><SliderRow ui={ui} label="Opacity" /></ui.Slider><ui.Slider defaultValue={30} disabled><SliderRow ui={ui} label="Bass (unavailable)" /></ui.Slider></div>,
    },
  },
  progress: {
    preview: ({ Progress, ProgressLabel, ProgressValue }) => <Progress value={60} className="max-w-sm"><div className="flex items-center justify-between"><ProgressLabel>Storage used</ProgressLabel><ProgressValue /></div></Progress>,
    examples: {
      "progress-basic": ({ Progress, ProgressLabel, ProgressValue }) => <Progress value={60} className="max-w-sm"><div className="flex items-center justify-between"><ProgressLabel>Storage used</ProgressLabel><ProgressValue /></div></Progress>,
      "progress-live": ui => <ProgressLive ui={ui} />,
      "progress-indeterminate": ({ Progress, ProgressLabel }) => <Progress value={null} className="max-w-sm"><ProgressLabel>Preparing export…</ProgressLabel></Progress>,
    },
  },
  toggle: {
    preview: ({ Toggle }) => <div className="showcase-button-row"><Toggle aria-label="Bold"><strong>B</strong></Toggle><Toggle aria-label="Italic" defaultPressed><em>I</em></Toggle><Toggle aria-label="Underline"><u>U</u></Toggle></div>,
    examples: {
      "toggle-basic": ({ Toggle }) => <div className="showcase-button-row"><Toggle aria-label="Bold"><strong>B</strong></Toggle><Toggle aria-label="Italic" defaultPressed><em>I</em></Toggle><Toggle aria-label="Underline"><u>U</u></Toggle></div>,
      "toggle-outline": ({ Toggle }) => <Toggle variant="outline" defaultPressed>{starIcon}Starred</Toggle>,
      "toggle-sizes": ({ Toggle }) => <div className="showcase-button-row items-center"><Toggle size="sm" aria-label="Bold, small"><strong>B</strong></Toggle><Toggle aria-label="Bold, default"><strong>B</strong></Toggle><Toggle size="lg" aria-label="Bold, large"><strong>B</strong></Toggle><Toggle aria-label="Bold, disabled" disabled><strong>B</strong></Toggle></div>,
    },
  },
  "toggle-group": {
    preview: ({ ToggleGroup, ToggleGroupItem }) => <ToggleGroup aria-label="Text alignment" defaultValue={["left"]}>{alignments.map(([value, label, d]) => <ToggleGroupItem key={value} value={value} aria-label={label}>{alignIcon(d)}</ToggleGroupItem>)}</ToggleGroup>,
    examples: {
      "toggle-group-single": ({ ToggleGroup, ToggleGroupItem }) => <ToggleGroup aria-label="Text alignment" defaultValue={["left"]}>{alignments.map(([value, label, d]) => <ToggleGroupItem key={value} value={value} aria-label={label}>{alignIcon(d)}</ToggleGroupItem>)}</ToggleGroup>,
      "toggle-group-multiple": ({ ToggleGroup, ToggleGroupItem }) => <ToggleGroup multiple aria-label="Formatting" defaultValue={["bold"]}><ToggleGroupItem value="bold" aria-label="Bold"><strong>B</strong></ToggleGroupItem><ToggleGroupItem value="italic" aria-label="Italic"><em>I</em></ToggleGroupItem><ToggleGroupItem value="underline" aria-label="Underline"><u>U</u></ToggleGroupItem></ToggleGroup>,
      "toggle-group-outline": ({ ToggleGroup, ToggleGroupItem }) => <ToggleGroup variant="outline" aria-label="View" defaultValue={["list"]}><ToggleGroupItem value="list">List</ToggleGroupItem><ToggleGroupItem value="board">Board</ToggleGroupItem><ToggleGroupItem value="calendar">Calendar</ToggleGroupItem></ToggleGroup>,
      "toggle-group-vertical": ({ ToggleGroup, ToggleGroupItem }) => <ToggleGroup orientation="vertical" aria-label="Density" defaultValue={["comfortable"]}><ToggleGroupItem value="comfortable">Comfortable</ToggleGroupItem><ToggleGroupItem value="compact">Compact</ToggleGroupItem></ToggleGroup>,
    },
  },
  "input-otp": {
    preview: ui => <OtpBasic ui={ui} />,
    examples: {
      "input-otp-basic": ui => <OtpBasic ui={ui} />,
      "input-otp-recovery": ({ InputOTP, Label }) => <div className="grid gap-2"><Label htmlFor="otp-recovery">Recovery code</Label><InputOTP id="otp-recovery" length={8} groups={[4, 4]} validationType="alphanumeric" normalizeValue={value => value.toUpperCase()} /></div>,
      "input-otp-error": ui => <OtpError ui={ui} />,
    },
  },
  "navigation-menu": {
    preview: ui => <NavMenuBasic ui={ui} />,
    examples: {
      "navigation-menu-basic": ui => <NavMenuBasic ui={ui} />,
      "navigation-menu-links": ({ NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerClass }) => <NavigationMenu aria-label="Account"><NavigationMenuList>{["Overview", "Projects", "Settings"].map(page => <NavigationMenuItem key={page}><NavigationMenuLink href="#" onClick={preventNav} active={page === "Projects"} className={navigationMenuTriggerClass}>{page}</NavigationMenuLink></NavigationMenuItem>)}</NavigationMenuList></NavigationMenu>,
    },
  },
  popover: {
    preview: ({ Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription, Button }) => <Popover><PopoverTrigger render={<Button variant="outline">Share</Button>} /><PopoverContent><PopoverHeader><PopoverTitle>Share project</PopoverTitle><PopoverDescription>Anyone with the link can view it.</PopoverDescription></PopoverHeader></PopoverContent></Popover>,
    examples: {
      "popover-basic": ({ Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription, PopoverClose, Button, Input }) => <Popover><PopoverTrigger render={<Button variant="outline">Share</Button>} /><PopoverContent><PopoverHeader><PopoverTitle>Share project</PopoverTitle><PopoverDescription>Anyone with the link can view it.</PopoverDescription></PopoverHeader><div className="flex gap-2"><Input readOnly value="zuno.dev/p/redesign" aria-label="Project link" /><PopoverClose render={<Button>Done</Button>} /></div></PopoverContent></Popover>,
      "popover-placement": ({ Popover, PopoverTrigger, PopoverContent, Button }) => <div className="showcase-button-row">{(["top", "right", "bottom", "left"] as const).map(side => <Popover key={side}><PopoverTrigger render={<Button variant="outline">{side}</Button>} /><PopoverContent side={side} className="w-auto">Opens on the {side}.</PopoverContent></Popover>)}</div>,
      "popover-form": ({ Popover, PopoverTrigger, PopoverContent, PopoverClose, Button, Input, Label }) => <Popover><PopoverTrigger render={<Button variant="outline">Rename</Button>} /><PopoverContent align="start"><form onSubmit={event => event.preventDefault()} className="flex flex-col gap-3"><Label htmlFor="popover-project-name">Project name</Label><Input id="popover-project-name" defaultValue="Redesign 2026" /><div className="flex justify-end gap-2"><PopoverClose render={<Button variant="ghost" size="sm">Cancel</Button>} /><PopoverClose render={<Button size="sm" type="submit">Save</Button>} /></div></form></PopoverContent></Popover>,
    },
  },
  tooltip: {
    preview: ({ TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button }) => <TooltipProvider><Tooltip><TooltipTrigger render={<Button variant="outline">Save</Button>} /><TooltipContent>Save your changes (⌘S)</TooltipContent></Tooltip></TooltipProvider>,
    examples: {
      "tooltip-basic": ({ TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button }) => <TooltipProvider><Tooltip><TooltipTrigger render={<Button variant="outline">Save</Button>} /><TooltipContent>Save your changes (⌘S)</TooltipContent></Tooltip></TooltipProvider>,
      "tooltip-states": ({ TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button }) => <TooltipProvider><div className="showcase-button-row"><Tooltip><TooltipTrigger render={<Button>Publish</Button>} /><TooltipContent>Publish the project now</TooltipContent></Tooltip><Tooltip><TooltipTrigger render={<span tabIndex={0} className="inline-flex rounded-md" />}><Button disabled>Publish</Button></TooltipTrigger><TooltipContent>Fill in the required fields first</TooltipContent></Tooltip></div></TooltipProvider>,
    },
  },
  drawer: {
    preview: ui => <DrawerGoal ui={ui} />,
    examples: {
      "drawer-basic": ui => <DrawerGoal ui={ui} />,
      "drawer-scroll": ({ Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, Button }) => <Drawer><DrawerTrigger render={<Button variant="outline">Release notes</Button>} /><DrawerContent><DrawerHeader><DrawerTitle>Release notes</DrawerTitle></DrawerHeader>{releaseNotes.map(note => <p key={note} className="text-sm text-muted-foreground">{note}</p>)}</DrawerContent></Drawer>,
    },
  },
  sheet: {
    preview: ui => <SheetForm ui={ui} />,
    examples: {
      "sheet-form": ui => <SheetForm ui={ui} />,
      "sheet-sides": ({ Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, Button }) => <div className="showcase-button-row">{(["top", "right", "bottom", "left"] as const).map(side => <Sheet key={side} side={side}><SheetTrigger render={<Button variant="outline">{side}</Button>} /><SheetContent><SheetHeader><SheetTitle>From the {side}</SheetTitle><SheetDescription>Swipe toward the {side} edge, press Escape or use the close button.</SheetDescription></SheetHeader></SheetContent></Sheet>)}</div>,
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
      "dropdown-menu-table": ({ DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, Button, Table, TableBody, TableRow, TableCell }) => <Table containerProps={{ className: "max-w-md" }}><TableBody>{["Redesign 2026", "Mobile app"].map(name => <TableRow key={name}><TableCell>{name}</TableCell><TableCell className="text-end"><DropdownMenu><DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={"Actions for " + name}><span aria-hidden="true">⋯</span></Button>} /><DropdownMenuContent align="end"><DropdownMenuItem>Open</DropdownMenuItem><DropdownMenuItem>Rename</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem>Archive</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell></TableRow>)}</TableBody></Table>,
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
