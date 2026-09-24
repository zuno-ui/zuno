// Pure, server-safe catalog data (no "use client", no JSX). Server Components import from here
// via "@zuno/showcase/meta"; the client render closures live in catalog.tsx keyed by the same ids.

export type ExampleMeta = { id: string; title: string; description: string; code: string }
export type ComponentMeta = {
  name: string
  title: string
  description: string
  registryPath: string
  reference?: string
  usage: string
  properties: [string, string, string, string][]
  states?: [string, string][]
  accessibility: string[]
  examples: ExampleMeta[]
}

export const meta: ComponentMeta[] = [
  {
    name: "button", title: "Button", registryPath: "ui/button.tsx", reference: "button",
    description: "Clear actions with accessible variants, sizes and states.",
    usage: 'import { Button } from "@/components/ui/button"\n\n<Button>Create project</Button>',
    properties: [["variant", '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"', '"default"', "Visual treatment and hierarchy of the action."], ["size", '"sm" | "default" | "lg" | "icon"', '"default"', "Button size; icon for single-icon actions."], ["loading", "boolean", "false", "Shows a spinner, disables the button and keeps its width."], ["disabled", "boolean", "false", "Disables interaction."]],
    accessibility: ["Use text that describes the action. With size=\"icon\" or an icon-only button, provide an aria-label.", "loading exposes aria-busy, prevents duplicate submissions and keeps the button width; the spinner respects prefers-reduced-motion.", "To render as a link, use Base UI's render prop: <Button render={<a href=\"…\" />}>. Set type=\"submit\" to submit a form."],
    states: [["Rest", "Surface per variant; 1 px border on outline and neutral variants."], ["Hover", "Subtle surface change with a 120 ms color transition."], ["Focus visible", "2 px outline in the ring color, merged with the border, keyboard only."], ["Active", "Press feedback without shifting the content."], ["Loading", "loading shows the Spinner, exposes aria-busy, keeps the width and prevents double submission."], ["Disabled", "disabled removes interaction and takes the button out of the Tab order."]],
    examples: [
      { id: "button-variants", title: "Action hierarchy", description: "From primary emphasis to a link, each variant brings order to the interface.", code: '<Button>Save</Button>\n<Button variant="secondary">Duplicate</Button>\n<Button variant="outline">Cancel</Button>\n<Button variant="ghost">Discard</Button>\n<Button variant="destructive">Delete</Button>\n<Button variant="link">Learn more</Button>' },
      { id: "button-sizes", title: "A size for every context", description: "Small, default, large and icon for square actions.", code: '<Button size="sm">Small</Button>\n<Button>Medium</Button>\n<Button size="lg">Large</Button>\n<Button size="icon" aria-label="Add">+</Button>' },
      { id: "button-loading", title: "Loading without layout shift", description: "The spinner replaces the text without changing the width and prevents double clicks.", code: 'const [loading, setLoading] = useState(false)\n\n<Button loading={loading} onClick={() => save()}>Save changes</Button>\n<Button variant="outline" loading>Loading</Button>' },
      { id: "button-disabled", title: "States that make sense", description: "Disabled actions with native semantics.", code: '<Button disabled>Save</Button>\n<Button variant="outline" disabled>No access</Button>' },
    ],
  },
  {
    name: "field", title: "Field", registryPath: "ui/field.tsx", reference: "field",
    description: "Label, control, description and errors wired together in a single field.",
    usage: 'import { Field, FieldLabel, FieldControl, FieldDescription } from "@/components/ui/field"\n\n<Field name="email">\n  <FieldLabel>Email</FieldLabel>\n  <FieldControl type="email" />\n  <FieldDescription>Use your work email.</FieldDescription>\n</Field>',
    properties: [["name", "string", "—", "Field name within the form."], ["invalid", "boolean", "—", "Marks the field as invalid."], ["disabled", "boolean", "false", "Disables the field's controls."]],
    accessibility: ["Use FieldLabel to name the control and FieldDescription for persistent instructions. FieldError shows the associated error; compose Field inside Base UI's Form to validate on submit.", "The placeholder complements the label. Keep focus visible and explain errors with text. Use disabled to prevent interaction and readOnly when the content should remain selectable."],
    states: [["Rest", "FieldControl with a neutral 1 px border."], ["Focus visible", "2 px ring outline; the border takes the same color."], ["Invalid", "invalid or failed validation: destructive border and an associated FieldError."], ["Invalid with focus", "2 px destructive outline; the neutral focus ring is not added."], ["Disabled", "disabled turns off the control and removes it from the Tab order."], ["Read-only", "readOnly keeps the value selectable without allowing edits."]],
    examples: [
      { id: "field-validation", title: "Forms that guide you", description: "Label, help text and validation. Try submitting an empty email.", code: 'import { Form } from "@base-ui/react/form"\n\n<Form onSubmit={(event) => event.preventDefault()}>\n  <Field name="email">\n    <FieldLabel>Email</FieldLabel>\n    <FieldControl type="email" required />\n    <FieldDescription>Your work email.</FieldDescription>\n    <FieldError match="valueMissing">Enter your email.</FieldError>\n    <FieldError match="typeMismatch">Enter a valid email.</FieldError>\n  </Field>\n  <Button type="submit">Continue</Button>\n</Form>' },
      { id: "field-description", title: "Context matters too", description: "Persistent instructions, linked to the control.", code: '<Field name="project">\n  <FieldLabel>Project name</FieldLabel>\n  <FieldControl placeholder="My next project" />\n  <FieldDescription>You can change it later.</FieldDescription>\n</Field>' },
      { id: "field-disabled", title: "Available when you need it", description: "A disabled field keeps its structure and context.", code: '<Field name="workspace" disabled>\n  <FieldLabel>Workspace</FieldLabel>\n  <FieldControl value="Acme Studio" />\n  <FieldDescription>Managed by your organization.</FieldDescription>\n</Field>' },
    ],
  },
  {
    name: "input", title: "Input", registryPath: "ui/input.tsx", reference: "input",
    description: "Text input with visible focus and validation built in with Field.",
    usage: 'import { Input } from "@/components/ui/input"\n\n<label>Name\n  <Input placeholder="Your name" />\n</label>',
    properties: [["type", "string", '"text"', "Native input type."], ["value / defaultValue", "string", "—", "Controlled value or initial value."], ["onValueChange", "(value, eventDetails) => void", "—", "Receives the updated text."], ["disabled / readOnly", "boolean", "false", "Disables editing or makes the input read-only."]],
    accessibility: ["Link the control to a label: inside Field use FieldLabel; outside Field, an associated native label. The placeholder complements the label, it does not replace it.", "Keep focus visible and explain errors with text. Use disabled to prevent interaction and readOnly when the content should remain selectable."],
    states: [["Rest", "Identifiable 1 px border (input token)."], ["Focus visible", "2 px ring outline merged with the border."], ["Invalid", "Inside Field, destructive border and a text error."], ["Disabled", "disabled prevents interaction and focus."], ["Read-only", "readOnly keeps the content selectable."]],
    examples: [
      { id: "input-validation", title: "Input with validation", description: "Linked label, help text and error. Try submitting the empty field.", code: "import { Input } from \"@/components/ui/input\"\nimport { Field, FieldLabel, FieldDescription, FieldError } from \"@/components/ui/field\"\nimport { Form } from \"@base-ui/react/form\"\nimport { Button } from \"@/components/ui/button\"\n\n<Form onSubmit={event => event.preventDefault()}>\n  <Field name=\"input\">\n    <FieldLabel>Name</FieldLabel>\n    <Input required />\n    <FieldDescription>Fill in this field.</FieldDescription>\n    <FieldError match=\"valueMissing\">This field is required.</FieldError>\n  </Field>\n  <Button type=\"submit\">Validate</Button>\n</Form>" },
      { id: "input-disabled", title: "Disabled input", description: "Keeps the content and the control's native semantics.", code: "<label>Reference\n  <Input disabled defaultValue=\"ZUNO project\" />\n</label>" },
      { id: "input-readonly", title: "Read-only input", description: "Keeps the content and the control's native semantics.", code: "<label>Reference\n  <Input readOnly defaultValue=\"ZUNO project\" />\n</label>" },
    ],
  },
  {
    name: "textarea", title: "Textarea", registryPath: "ui/textarea.tsx", reference: "field",
    description: "Multi-line text input with adjustable height and accessible states.",
    usage: 'import { Textarea } from "@/components/ui/textarea"\n\n<label>Message\n  <Textarea placeholder="Write your message…" />\n</label>',
    properties: [["rows", "number", "4", "Initial height in lines; can be resized vertically."], ["value / defaultValue", "string", "—", "Controlled value or initial value."], ["onValueChange", "(value, eventDetails) => void", "—", "Receives the updated text."], ["disabled / readOnly", "boolean", "false", "Disables editing or makes the textarea read-only."]],
    accessibility: ["Link the control to a label as with Input. Accepts native textarea props, including required, maxLength, ref and onChange.", "Keep focus visible and explain errors with text; the control grows with its content without clipping it."],
    states: [["Rest", "Identifiable 1 px border (input token)."], ["Focus visible", "2 px ring outline merged with the border."], ["Invalid", "Inside Field, destructive border and a text error."], ["Resizable", "Grows with its content; vertical resize without clipping the text."], ["Disabled", "disabled prevents interaction and focus."], ["Read-only", "readOnly keeps the content selectable."]],
    examples: [
      { id: "textarea-validation", title: "Textarea with validation", description: "Linked label, help text and error. Try submitting the empty field.", code: "import { Textarea } from \"@/components/ui/textarea\"\nimport { Field, FieldLabel, FieldDescription, FieldError } from \"@/components/ui/field\"\nimport { Form } from \"@base-ui/react/form\"\nimport { Button } from \"@/components/ui/button\"\n\n<Form onSubmit={event => event.preventDefault()}>\n  <Field name=\"textarea\">\n    <FieldLabel>Message</FieldLabel>\n    <Textarea required />\n    <FieldDescription>Fill in this field.</FieldDescription>\n    <FieldError match=\"valueMissing\">This field is required.</FieldError>\n  </Field>\n  <Button type=\"submit\">Validate</Button>\n</Form>" },
      { id: "textarea-disabled", title: "Disabled textarea", description: "Keeps the content and the control's native semantics.", code: "<label>Reference\n  <Textarea disabled defaultValue=\"ZUNO project\" />\n</label>" },
      { id: "textarea-readonly", title: "Read-only textarea", description: "Keeps the content and the control's native semantics.", code: "<label>Reference\n  <Textarea readOnly defaultValue=\"ZUNO project\" />\n</label>" },
    ],
  },
  {
    name: "container", title: "Container", registryPath: "components/container.tsx",
    description: "Width limits, side padding and reading or dashboard variants.",
    usage: 'import { Container } from "@/components/container"\n\n<Container size="content">\n  {children}\n</Container>',
    properties: [["size", '"reading" | "form" | "content" | "dashboard"', '"content"', "Maximum width and reading rhythm."], ["className", "string", "—", "Additional classes for the container."]],
    accessibility: ["A presentational container: it adds no ARIA roles and does not change DOM order.", "It controls outer placement; the content manages its own interior. Keeps the document's reading order."],
    examples: [
      { id: "container-sizes", title: "A width for every kind of content", description: "Reading, form, content and fluid dashboard.", code: '<Container size="reading">Long text</Container>\n<Container size="form">Form</Container>\n<Container size="content">Page</Container>' },
    ],
  },
  {
    name: "stack", title: "Stack", registryPath: "components/stack.tsx",
    description: "Vertical rhythm with a semantic gap, no hidden margins.",
    usage: 'import { Stack } from "@/components/stack"\n\n<Stack gap="4">\n  {children}\n</Stack>',
    properties: [["gap", '"2" | "4" | "6" | "8"', '"4"', "Vertical spacing between items."], ["align", '"start" | "center" | "stretch"', '"stretch"', "Horizontal alignment of the children."]],
    accessibility: ["A flexbox-based presentational container; it introduces no roles and does not change reading order.", "Expresses relationships through proximity: group related items with a smaller gap than the one separating them from the rest."],
    examples: [
      { id: "stack-gap", title: "Consistent vertical rhythm", description: "A semantic gap between related sections.", code: '<Stack gap="4">\n  <div>Profile</div>\n  <div>Billing</div>\n  <div>Security</div>\n</Stack>' },
    ],
  },
  {
    name: "cluster", title: "Cluster", registryPath: "components/cluster.tsx",
    description: "Horizontal grouping with wrap for actions, tags and filters.",
    usage: 'import { Cluster } from "@/components/cluster"\n\n<Cluster gap="2">\n  {children}\n</Cluster>',
    properties: [["gap", '"2" | "3" | "4"', '"2"', "Spacing between items."], ["align", '"start" | "center" | "between"', '"center"', "Horizontal alignment and distribution."]],
    accessibility: ["A presentational container with wrap; visual order follows DOM order when wrapping.", "Ideal for groups of actions or tags: keeps keyboard focus in reading order."],
    examples: [
      { id: "cluster-tags", title: "Tags that fit", description: "Wrapping group for filters and metadata.", code: '<Cluster gap="2">\n  <span>Design</span>\n  <span>Accessible</span>\n  <span>Lightweight</span>\n</Cluster>' },
      { id: "cluster-between", title: "Actions at the edges", description: "align=\"between\" separates content from actions.", code: '<Cluster align="between">\n  <span>Members</span>\n  <Button>Invite</Button>\n</Cluster>' },
    ],
  },
  {
    name: "responsive-grid", title: "ResponsiveGrid", registryPath: "components/responsive-grid.tsx",
    description: "Collections that adapt to the available width, without forcing twelve columns.",
    usage: 'import { ResponsiveGrid } from "@/components/responsive-grid"\n\n<ResponsiveGrid min="16rem" gap="6">\n  {children}\n</ResponsiveGrid>',
    properties: [["min", "string", '"16rem"', "Minimum column width before wrapping."], ["gap", '"4" | "6" | "8"', '"6"', "Spacing between cells."]],
    accessibility: ["A presentational container using CSS Grid auto-fill; visual order matches DOM order.", "Adapts to the container's actual width without forcing a fixed column grid."],
    examples: [
      { id: "grid-cards", title: "Cards that rearrange", description: "Columns adjust to the available width.", code: '<ResponsiveGrid min="12rem" gap="4">\n  <div>One</div>\n  <div>Two</div>\n  <div>Three</div>\n</ResponsiveGrid>' },
    ],
  },
  {
    name: "card", title: "Card", registryPath: "ui/card.tsx",
    description: "A surface with consistent anatomy and padding; width and outer margins are up to you.",
    usage: 'import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"\n\n<Card>\n  <CardHeader>\n    <CardTitle>Pro plan</CardTitle>\n    <CardDescription>Billed monthly.</CardDescription>\n  </CardHeader>\n  <CardContent>Content</CardContent>\n  <CardFooter>\n    <Button>Choose plan</Button>\n  </CardFooter>\n</Card>',
    properties: [["Card", "div", "—", "Container with a border and card surface."], ["CardHeader", "div", "—", "Header with title and description."], ["CardTitle", "h3", "—", "Card title."], ["CardDescription", "p", "—", "Secondary supporting text."], ["CardContent", "div", "—", "Main body."], ["CardFooter", "div", "—", "Actions or metadata at the bottom."]],
    accessibility: ["Use CardTitle as a heading for the document hierarchy; adjust the level with className or your own element.", "Card is a presentational surface: it does not capture focus or add roles. Place accessible controls inside it."],
    examples: [
      { id: "card-basic", title: "Full anatomy", description: "Header, content and footer with actions.", code: '<Card>\n  <CardHeader>\n    <CardTitle>Pro plan</CardTitle>\n    <CardDescription>Billed monthly.</CardDescription>\n  </CardHeader>\n  <CardContent>Collaboration, history and support.</CardContent>\n  <CardFooter>\n    <Button>Choose plan</Button>\n    <Button variant="outline">Compare</Button>\n  </CardFooter>\n</Card>' },
    ],
  },
  {
    name: "badge", title: "Badge", registryPath: "ui/badge.tsx",
    description: "Compact labels with contrast and a limited set of variants.",
    usage: 'import { Badge } from "@/components/ui/badge"\n\n<Badge>New</Badge>\n<Badge variant="secondary">Beta</Badge>',
    properties: [["variant", '"default" | "secondary" | "outline" | "destructive"', '"default"', "Style and visual intent."]],
    accessibility: ["Color is not the only indicator: the badge text communicates the state.", "If it represents a dynamic state, pair it with text or an aria-label in its context."],
    examples: [
      { id: "badge-variants", title: "Variants with a purpose", description: "Only the variants you need, with contrast.", code: '<Badge>New</Badge>\n<Badge variant="secondary">Beta</Badge>\n<Badge variant="outline">v1.0</Badge>\n<Badge variant="destructive">Deprecated</Badge>' },
    ],
  },
  {
    name: "separator", title: "Separator", registryPath: "ui/separator.tsx",
    description: "Structural separation that avoids unnecessary semantic roles.",
    usage: 'import { Separator } from "@/components/ui/separator"\n\n<Separator />\n<Separator orientation="vertical" />',
    properties: [["orientation", '"horizontal" | "vertical"', '"horizontal"', "Direction of the separator."], ["decorative", "boolean", "true", "When semantic, it exposes role=\"separator\"."]],
    accessibility: ["Decorative by default (role=\"none\"). Use decorative={false} when it separates meaningful groups.", "In vertical orientation, give the container a height so the separator is visible."],
    examples: [
      { id: "separator-orientation", title: "Horizontal and vertical", description: "Separates sections or inline items.", code: '<div>Section A</div>\n<Separator />\n<div>Section B</div>\n\n<div class="flex h-8 items-center gap-3">\n  Left\n  <Separator orientation="vertical" />\n  Right\n</div>' },
    ],
  },
  {
    name: "skeleton", title: "Skeleton", registryPath: "ui/skeleton.tsx",
    description: "Reserves space with reduced motion; no endless fake loading.",
    usage: 'import { Skeleton } from "@/components/ui/skeleton"\n\n<Skeleton className="h-4 w-32" />',
    properties: [["className", "string", "—", "Sets the size and shape of the block."]],
    accessibility: ["It is aria-hidden: it announces no content. Communicate the loading state with adjacent text or role=\"status\".", "Respects prefers-reduced-motion: the animation stops when reduced motion is requested."],
    states: [["Loading", "Reserves the content's space with a gentle pulse."], ["Reduced motion", "The pulse stops with prefers-reduced-motion."], ["Semantics", "aria-hidden: communicate loading with adjacent text or role=\"status\"."]],
    examples: [
      { id: "skeleton-card", title: "Reserved space", description: "Keeps the layout stable while the content loads.", code: '<div class="flex items-center gap-3">\n  <Skeleton className="size-10 rounded-full" />\n  <div class="flex flex-1 flex-col gap-2">\n    <Skeleton className="h-4 w-3/4" />\n    <Skeleton className="h-4 w-1/2" />\n  </div>\n</div>' },
    ],
  },
  {
    name: "spinner", title: "Spinner", registryPath: "ui/spinner.tsx",
    description: "A discreet indicator with an accessible, contextual description.",
    usage: 'import { Spinner } from "@/components/ui/spinner"\n\n<Spinner label="Loading projects" />',
    properties: [["label", "string", '"Loading"', "Accessible name of the status (role=\"status\")."], ["className", "string", "—", "Size and color through utilities."]],
    accessibility: ["Exposes role=\"status\" and a configurable aria-label; change the label to match the operation.", "Stops with prefers-reduced-motion; it does not communicate made-up progress or percentages."],
    states: [["Active", "Spins and exposes role=\"status\" with a configurable label."], ["Reduced motion", "Stops with prefers-reduced-motion; it does not fake progress."]],
    examples: [
      { id: "spinner-sizes", title: "Sizes and color", description: "Inherits the text color; adjust the size with utilities.", code: '<Spinner className="size-4" />\n<Spinner className="size-6" />\n<Spinner className="size-8 text-muted-foreground" />' },
    ],
  },
  {
    name: "icon", title: "Icon", registryPath: "ui/icon.tsx",
    description: "A wrapper for lucide-react icons with consistent sizes and accessible defaults.",
    usage: 'import { Icon } from "@/components/ui/icon"\nimport { Check } from "lucide-react"\n\n<Icon icon={Check} label="Completed" />',
    properties: [["icon", "ComponentType<SVGProps<SVGSVGElement>>", "—", "Icon component to render; accepts lucide-react or any SVG."], ["size", '"xs" | "sm" | "md" | "lg" | "xl"', '"sm"', "Icon size, from 12 to 32 px."], ["label", "string", "—", "Accessible name; without a label the icon is decorative (aria-hidden)."], ["className", "string", "—", "Color and additional adjustments through utilities."]],
    accessibility: ["Without a label the icon is marked aria-hidden; use this when adjacent text already conveys the meaning.", "With a label it exposes role=\"img\" and aria-label, for icons with their own meaning, such as in icon-only buttons."],
    examples: [
      { id: "icon-sizes", title: "Consistent scale", description: "From xs to xl; the icon inherits the text color.", code: 'import { Bell } from "lucide-react"\n\n<Icon icon={Bell} size="xs" />\n<Icon icon={Bell} size="sm" />\n<Icon icon={Bell} size="md" />\n<Icon icon={Bell} size="lg" />\n<Icon icon={Bell} size="xl" />' },
      { id: "icon-meaningful", title: "Meaningful icons", description: "Use label when the icon communicates on its own.", code: 'import { CircleCheck, TriangleAlert } from "lucide-react"\n\n<Icon icon={CircleCheck} label="Completed" className="text-zuno-success" />\n<Icon icon={TriangleAlert} label="Warning" className="text-zuno-warning" />' },
      { id: "icon-in-button", title: "Inside a button", description: "Icon-only button; the accessible name lives on the button and the icon is decorative.", code: 'import { Plus } from "lucide-react"\n\n<Button size="icon" aria-label="Add project"><Icon icon={Plus} /></Button>' },
    ],
  },
  {
    name: "label", title: "Label", registryPath: "ui/label.tsx",
    description: "Correct association with the control and a shared typographic hierarchy.",
    usage: 'import { Label } from "@/components/ui/label"\n\n<Label htmlFor="name">Name</Label>\n<Input id="name" />',
    properties: [["htmlFor", "string", "—", "Id of the associated control."]],
    accessibility: ["Associate the label with the control using htmlFor and the field's id, or by wrapping the control.", "Do not replace the label with the placeholder; the name must persist."],
    examples: [
      { id: "label-input", title: "Linked label and control", description: "htmlFor connects the label to the input.", code: '<Label htmlFor="name">Full name</Label>\n<Input id="name" placeholder="Your name" />' },
    ],
  },
  {
    name: "empty", title: "Empty", registryPath: "ui/empty.tsx",
    description: "Absence of data, context and the next action when there is one.",
    usage: 'import { Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyActions } from "@/components/ui/empty"\n\n<Empty>\n  <EmptyTitle>No projects</EmptyTitle>\n  <EmptyDescription>Create the first one.</EmptyDescription>\n  <EmptyActions>\n    <Button>Create</Button>\n  </EmptyActions>\n</Empty>',
    properties: [["Empty", "div", "—", "Centered container with a dashed border."], ["EmptyMedia", "div", "—", "Icon or media for the state."], ["EmptyTitle", "h3", "—", "Short title for the state."], ["EmptyDescription", "p", "—", "Explanation and context."], ["EmptyActions", "div", "—", "Suggested actions."]],
    accessibility: ["Distinguish \"zero results\" from \"no data yet\"; the text should make it clear.", "Offer the next action when there is one; never leave the user at a dead end."],
    states: [["Zero results", "The text clarifies that a search or filter returned no data."], ["No data yet", "The text indicates that no content has been created yet."], ["With action", "EmptyActions offers the next step when there is one."]],
    examples: [
      { id: "empty-basic", title: "Empty state with an action", description: "Context and a next step for the user.", code: '<Empty>\n  <EmptyMedia>◍</EmptyMedia>\n  <EmptyTitle>No projects yet</EmptyTitle>\n  <EmptyDescription>Create your first project to get started.</EmptyDescription>\n  <EmptyActions>\n    <Button>Create project</Button>\n  </EmptyActions>\n</Empty>' },
    ],
  },
  {
    name: "alert", title: "Alert", registryPath: "ui/alert.tsx",
    description: "Contextual messages with hierarchy, an icon and optional actions.",
    usage: 'import { Alert, AlertContent, AlertTitle, AlertDescription } from "@/components/ui/alert"\n\n<Alert variant="success">\n  <AlertContent>\n    <AlertTitle>Saved</AlertTitle>\n    <AlertDescription>Your changes were applied.</AlertDescription>\n  </AlertContent>\n</Alert>',
    properties: [["variant", '"default" | "success" | "warning" | "info" | "destructive"', '"default"', "Intent and semantic color."]],
    accessibility: ["Every state is understood through text, not color alone: use AlertTitle and AlertDescription.", "role=\"alert\" announces messages that appear dynamically; for static content consider removing the role."],
    states: [["Variant", "default, success, warning, info and destructive with a soft surface."], ["Static", "Message present on the page; consider removing the role."], ["Dynamic", "role=\"alert\" announces the message when it appears."]],
    examples: [
      { id: "alert-variants", title: "Semantic intents", description: "Success, warning and error with soft surfaces.", code: '<Alert variant="success"><AlertContent><AlertTitle>Changes saved</AlertTitle><AlertDescription>Your settings were updated.</AlertDescription></AlertContent></Alert>\n<Alert variant="warning"><AlertContent><AlertTitle>Storage almost full</AlertTitle><AlertDescription>You are using 90% of your storage.</AlertDescription></AlertContent></Alert>\n<Alert variant="destructive"><AlertContent><AlertTitle>Could not publish</AlertTitle><AlertDescription>Check your connection.</AlertDescription></AlertContent></Alert>' },
      { id: "alert-composed", title: "With an icon", description: "An indicator reinforces the message without relying on color.", code: '<Alert variant="info">\n  <span aria-hidden="true">ⓘ</span>\n  <AlertContent>\n    <AlertTitle>New version available</AlertTitle>\n    <AlertDescription>Update to get the latest improvements.</AlertDescription>\n  </AlertContent>\n</Alert>' },
    ],
  },
  {
    name: "page-header", title: "PageHeader", registryPath: "components/page-header.tsx",
    description: "A view's title, description and actions, with a responsive layout.",
    usage: 'import { PageHeader, PageHeaderContent, PageHeaderHeading, PageHeaderDescription, PageHeaderActions } from "@/components/page-header"\n\n<PageHeader>\n  <PageHeaderContent>\n    <PageHeaderHeading>Projects</PageHeaderHeading>\n    <PageHeaderDescription>Manage your work.</PageHeaderDescription>\n  </PageHeaderContent>\n  <PageHeaderActions>\n    <Button>New</Button>\n  </PageHeaderActions>\n</PageHeader>',
    properties: [["PageHeader", "div", "—", "Responsive row of content and actions."], ["PageHeaderContent", "div", "—", "Groups title and description."], ["PageHeaderHeading", "h1", "—", "Page title."], ["PageHeaderDescription", "p", "—", "Supporting description."], ["PageHeaderActions", "div", "—", "Right-aligned actions."]],
    accessibility: ["Use PageHeaderHeading as the view's h1; keep a single level-1 heading per page.", "On narrow screens the actions stack below the title without changing reading order."],
    examples: [
      { id: "page-header-basic", title: "View header", description: "Title, description and actions that adapt to the width.", code: '<PageHeader>\n  <PageHeaderContent>\n    <PageHeaderHeading>Projects</PageHeaderHeading>\n    <PageHeaderDescription>Manage and organize your work.</PageHeaderDescription>\n  </PageHeaderContent>\n  <PageHeaderActions>\n    <Button variant="outline">Import</Button>\n    <Button>New project</Button>\n  </PageHeaderActions>\n</PageHeader>' },
    ],
  },
  {
    name: "form-section", title: "FormSection", registryPath: "components/form-section.tsx",
    description: "Semantic form groups with a legend, description and shared spacing.",
    usage: 'import { FormSection, FormSectionHeader, FormSectionTitle, FormSectionDescription, FormSectionContent } from "@/components/form-section"\n\n<FormSection>\n  <FormSectionHeader>\n    <FormSectionTitle>Profile</FormSectionTitle>\n    <FormSectionDescription>Public information.</FormSectionDescription>\n  </FormSectionHeader>\n  <FormSectionContent>\n    {fields}\n  </FormSectionContent>\n</FormSection>',
    properties: [["FormSection", "fieldset", "—", "Groups a set of related fields."], ["FormSectionHeader", "div", "—", "Holds the legend and description."], ["FormSectionTitle", "legend", "—", "Accessible legend for the group."], ["FormSectionDescription", "p", "—", "Explanation of the group."], ["FormSectionContent", "div", "—", "Fields with consistent spacing."]],
    accessibility: ["Uses fieldset and legend to associate the group with its fields for screen readers.", "Proximity expresses relationship: fields in a group sit closer to each other than to the next group."],
    examples: [
      { id: "form-section-basic", title: "Field group", description: "Legend, description and fields with a shared rhythm.", code: '<FormSection>\n  <FormSectionHeader>\n    <FormSectionTitle>Profile</FormSectionTitle>\n    <FormSectionDescription>How others see you.</FormSectionDescription>\n  </FormSectionHeader>\n  <FormSectionContent>\n    <Field name="name"><FieldLabel>Name</FieldLabel><FieldControl /></Field>\n    <Field name="bio"><FieldLabel>Bio</FieldLabel><FieldControl /></Field>\n  </FormSectionContent>\n</FormSection>' },
    ],
  },
  {
    name: "status-badge", title: "StatusBadge", registryPath: "components/status-badge.tsx",
    description: "Semantic status with text, an optional indicator and a consistent visual variant.",
    usage: 'import { StatusBadge } from "@/components/status-badge"\n\n<StatusBadge status="success">Active</StatusBadge>\n<StatusBadge status="warning">Pending</StatusBadge>',
    properties: [["status", '"neutral" | "success" | "warning" | "info" | "error"', '"neutral"', "Semantic intent of the status."], ["indicator", "boolean", "true", "Shows a colored dot before the text."]],
    accessibility: ["The text communicates the status; the color and dot only reinforce it.", "Composed on top of Badge: it inherits its contrast and compact typography."],
    states: [["Status", "neutral, success, warning, info and error with a soft surface."], ["With indicator", "indicator adds a colored dot before the text."], ["Without indicator", "indicator={false} leaves only text and surface."]],
    examples: [
      { id: "status-badge-states", title: "Semantic statuses", description: "A soft surface and an indicator dot per status.", code: '<StatusBadge status="success">Active</StatusBadge>\n<StatusBadge status="warning">Pending</StatusBadge>\n<StatusBadge status="error">Failed</StatusBadge>\n<StatusBadge status="neutral" indicator={false}>Draft</StatusBadge>' },
    ],
  },
  {
    name: "password-input", title: "PasswordInput", registryPath: "components/password-input.tsx",
    description: "Password input with show/hide that never loses focus.",
    usage: 'import { PasswordInput } from "@/components/password-input"\n\n<PasswordInput autoComplete="current-password" />',
    properties: [["...InputProps", "—", "—", "Accepts every Input prop, including value/defaultValue."], ["autoComplete", "string", "—", "Suggested: current-password or new-password."]],
    accessibility: ["The button toggles aria-pressed and its aria-label describes the action (show/hide).", "Showing the password does not move focus out of the field; the value and cursor are preserved."],
    states: [["Hidden", "The value is masked by default."], ["Visible", "The button toggles visibility (aria-pressed)."], ["Focus preserved", "Toggling does not move the field's focus or cursor."], ["Inherits from Input", "Rest, focus, invalid and disabled as in Input."]],
    examples: [
      { id: "password-input-basic", title: "Show or hide", description: "The button reveals the password without losing context.", code: '<label>Password\n  <PasswordInput autoComplete="current-password" placeholder="••••••••" />\n</label>' },
    ],
  },
  {
    name: "search-input", title: "SearchInput", registryPath: "components/search-input.tsx",
    description: "Search with an icon, clear button and loading state; no built-in networking.",
    usage: 'import { SearchInput } from "@/components/search-input"\n\n<SearchInput value={query} onValueChange={setQuery} onClear={() => setQuery("")} loading={pending} />',
    properties: [["loading", "boolean", "false", "Shows a spinner instead of the clear button."], ["onClear", "() => void", "—", "Called when the clear button is pressed."], ["...InputProps", "—", "—", "Accepts value, onValueChange and the rest of the Input props."]],
    accessibility: ["The clear button has an aria-label; it appears only when there is text and onClear is set.", "The loading state uses a Spinner with role=\"status\"; it does not block typing."],
    states: [["Empty", "Only the search icon; no clear button."], ["With text", "The clear button (with aria-label) appears if onClear is set."], ["Loading", "loading replaces the clear button with a Spinner without blocking typing."]],
    examples: [
      { id: "search-input-basic", title: "Search and clear", description: "Icon, contextual clear and loading; your app controls the search.", code: 'const [query, setQuery] = useState("")\n\n<SearchInput\n  value={query}\n  onValueChange={setQuery}\n  onClear={() => setQuery("")}\n  placeholder="Search projects…"\n/>' },
    ],
  },
  {
    name: "copy-button", title: "CopyButton", registryPath: "components/copy-button.tsx",
    description: "Copy to clipboard with confirmation and error handling; a stable accessible name.",
    usage: 'import { CopyButton } from "@/components/copy-button"\n\n<CopyButton value="npx zunoui@latest init">Copy command</CopyButton>',
    properties: [["value", "string", "—", "Text copied to the clipboard."], ["label", "string", '"Copy"', "Stable accessible name of the button."], ["...ButtonProps", "—", "—", "Accepts variant, size and the rest of the Button props."]],
    accessibility: ["The aria-label stays stable; the result is announced with role=\"status\" text.", "The icon changes to confirmation or error, but the state is also communicated through text."],
    states: [["Rest", "Button with its stable aria-label."], ["Copied", "Confirms with an icon and role=\"status\" text; reverts after a few seconds."], ["Error", "If the clipboard fails, it says so with an icon and text."]],
    examples: [
      { id: "copy-button-basic", title: "Copy with confirmation", description: "Confirms the copy and reverts after a few seconds.", code: '<CopyButton value="npx zunoui@latest init">Copy command</CopyButton>' },
    ],
  },
  {
    name: "checkbox", title: "Checkbox", registryPath: "ui/checkbox.tsx", reference: "checkbox",
    description: "Recognizable checked and indeterminate states, even without color.",
    usage: 'import { Checkbox } from "@/components/ui/checkbox"\nimport { Label } from "@/components/ui/label"\n\n<div className="flex items-center gap-2">\n  <Checkbox id="terms" defaultChecked />\n  <Label htmlFor="terms">Accept terms</Label>\n</div>',
    properties: [["checked / defaultChecked", "boolean", "—", "Controlled or initial state."], ["onCheckedChange", "(checked: boolean) => void", "—", "Called when the state changes."], ["indeterminate", "boolean", "false", "Shows the indeterminate state."], ["disabled", "boolean", "false", "Disables the control."]],
    accessibility: ["Associate a label with htmlFor and the checkbox id; the state does not rely on color alone.", "The indeterminate state shows a dash in addition to color; it can be reached and toggled with the keyboard (Space)."],
    states: [["Rest", "Empty box with an identifiable border."], ["Checked", "checked shows the check mark, not just color."], ["Indeterminate", "indeterminate shows a dash in addition to color."], ["Focus visible", "2 px ring outline with the keyboard."], ["Disabled", "disabled removes interaction and focus."]],
    examples: [
      { id: "checkbox-states", title: "Checked, indeterminate and disabled", description: "States recognizable by icon, not just color.", code: '<div className="flex items-center gap-2"><Checkbox id="a" defaultChecked /><Label htmlFor="a">Accept terms</Label></div>\n<div className="flex items-center gap-2"><Checkbox id="b" /><Label htmlFor="b">Receive updates</Label></div>\n<div className="flex items-center gap-2"><Checkbox id="c" indeterminate /><Label htmlFor="c">Partial selection</Label></div>\n<div className="flex items-center gap-2"><Checkbox id="d" disabled /><Label htmlFor="d">Unavailable</Label></div>' },
    ],
  },
  {
    name: "switch", title: "Switch", registryPath: "ui/switch.tsx", reference: "switch",
    description: "A clear on/off state with an associated label; not a blanket replacement for checkbox.",
    usage: 'import { Switch } from "@/components/ui/switch"\nimport { Label } from "@/components/ui/label"\n\n<div className="flex items-center gap-3">\n  <Switch id="notify" defaultChecked />\n  <Label htmlFor="notify">Notifications</Label>\n</div>',
    properties: [["checked / defaultChecked", "boolean", "—", "Controlled or initial state."], ["onCheckedChange", "(checked: boolean) => void", "—", "Called when the state changes."], ["disabled", "boolean", "false", "Disables the control."]],
    accessibility: ["Use Switch for settings that take effect immediately; for options confirmed when a form is submitted, prefer Checkbox.", "Associate it with a label; the thumb position and color communicate the state."],
    states: [["Off", "Thumb on the left over a neutral surface."], ["On", "checked moves the thumb and changes the surface."], ["Focus visible", "2 px ring outline with the keyboard."], ["Disabled", "disabled removes interaction and focus."]],
    examples: [
      { id: "switch-states", title: "On, off and disabled", description: "The thumb and surface communicate the state.", code: '<div className="flex items-center gap-3"><Switch id="a" defaultChecked /><Label htmlFor="a">Notifications</Label></div>\n<div className="flex items-center gap-3"><Switch id="b" /><Label htmlFor="b">Compact mode</Label></div>\n<div className="flex items-center gap-3"><Switch id="c" disabled /><Label htmlFor="c">Sync</Label></div>' },
    ],
  },
  {
    name: "tabs", title: "Tabs", registryPath: "ui/tabs.tsx", reference: "tabs",
    description: "Sections with distinct selection and focus states.",
    usage: 'import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs"\n\n<Tabs defaultValue="account">\n  <TabsList>\n    <TabsTab value="account">Account</TabsTab>\n    <TabsTab value="security">Security</TabsTab>\n  </TabsList>\n  <TabsPanel value="account">…</TabsPanel>\n  <TabsPanel value="security">…</TabsPanel>\n</Tabs>',
    properties: [["variant", '"segmented" | "underline" | "ghost" | "solid"', '"segmented"', "Visual style of the tab group; solid fills the active tab with the brand color."], ["shape", '"rounded" | "pill"', '"rounded"', "pill fully rounds the container and the active pill; in underline it thickens the bar."], ["indicatorPosition", '"bottom" | "top"', '"bottom"', "Side of the indicator in the underline variant."], ["Tabs", "div", "—", "Root; accepts defaultValue, value and onValueChange."], ["TabsList", "div", "—", "Container for the tabs."], ["TabsTab", "button", "—", "A tab; requires value."], ["TabsPanel", "div", "—", "Content; requires a matching value."]],
    accessibility: ["Arrow keys move focus between tabs and Enter or Space activates one; the panel is focusable.", "The active tab is distinguished by background or underline and contrast, not color alone."],
    states: [["Inactive tab", "Muted text without a highlighted surface."], ["Selected", "Background or underline and contrast, not color alone."], ["Focus visible", "Keyboard outline on the tab; arrow keys move focus."], ["Active panel", "The panel is focusable so navigation can continue."], ["Disabled", "A disabled tab is skipped in the focus order."]],
    examples: [
      { id: "tabs-basic", title: "Segmented (default)", description: "A compact group on a soft surface.", code: '<Tabs defaultValue="account">\n  <TabsList aria-label="Settings">\n    <TabsTab value="account">Account</TabsTab>\n    <TabsTab value="security">Security</TabsTab>\n    <TabsTab value="notifications">Notifications</TabsTab>\n  </TabsList>\n  <TabsPanel value="account">Your account details.</TabsPanel>\n  <TabsPanel value="security">Password and sessions.</TabsPanel>\n  <TabsPanel value="notifications">Notification preferences.</TabsPanel>\n</Tabs>' },
      { id: "tabs-underline", title: "Underline", description: "A clean documentation style: a bottom indicator on the active tab.", code: '<Tabs variant="underline" defaultValue="general">\n  <TabsList aria-label="Preferences">\n    <TabsTab value="general">General</TabsTab>\n    <TabsTab value="members">Members</TabsTab>\n    <TabsTab value="billing">Billing</TabsTab>\n  </TabsList>\n  <TabsPanel value="general">General preferences.</TabsPanel>\n  <TabsPanel value="members">Manage the team.</TabsPanel>\n  <TabsPanel value="billing">Plan and payments.</TabsPanel>\n</Tabs>' },
      { id: "tabs-ghost", title: "Ghost", description: "No background surface; the active tab is highlighted minimally.", code: '<Tabs variant="ghost" defaultValue="day">\n  <TabsList aria-label="Range">\n    <TabsTab value="day">Day</TabsTab>\n    <TabsTab value="week">Week</TabsTab>\n    <TabsTab value="month">Month</TabsTab>\n  </TabsList>\n  <TabsPanel value="day">Daily view.</TabsPanel>\n  <TabsPanel value="week">Weekly view.</TabsPanel>\n  <TabsPanel value="month">Monthly view.</TabsPanel>\n</Tabs>' },
      { id: "tabs-solid", title: "Solid", description: "The active tab is filled with the brand color and contrasting text.", code: '<Tabs variant="solid" defaultValue="recent">\n  <TabsList aria-label="Filter">\n    <TabsTab value="recent">Recent</TabsTab>\n    <TabsTab value="pending">Pending</TabsTab>\n    <TabsTab value="completed">Completed</TabsTab>\n  </TabsList>\n  <TabsPanel value="recent">Recent activity.</TabsPanel>\n  <TabsPanel value="pending">Tasks to do.</TabsPanel>\n  <TabsPanel value="completed">Finished work.</TabsPanel>\n</Tabs>' },
      { id: "tabs-icons", title: "With icons", description: "Compose an Icon before the text and use gap to space it. The icon is decorative (the text already names the tab).", code: 'import { CircleCheck, Bell, TriangleAlert } from "lucide-react"\nimport { Icon } from "@/components/ui/icon"\n\n<Tabs variant="underline" defaultValue="overview">\n  <TabsList aria-label="Dashboard">\n    <TabsTab value="overview" className="gap-2"><Icon icon={CircleCheck} /> Overview</TabsTab>\n    <TabsTab value="activity" className="gap-2"><Icon icon={Bell} /> Activity</TabsTab>\n    <TabsTab value="alerts" className="gap-2"><Icon icon={TriangleAlert} /> Alerts</TabsTab>\n  </TabsList>\n  <TabsPanel value="overview">General view.</TabsPanel>\n  <TabsPanel value="activity">Recent events.</TabsPanel>\n  <TabsPanel value="alerts">Pending notices.</TabsPanel>\n</Tabs>' },
      { id: "tabs-pill", title: "Pill shape", description: "shape=\"pill\" fully rounds the container and the active pill.", code: '<Tabs variant="solid" shape="pill" defaultValue="recent">\n  <TabsList aria-label="Filter">\n    <TabsTab value="recent">Recent</TabsTab>\n    <TabsTab value="pending">Pending</TabsTab>\n    <TabsTab value="completed">Completed</TabsTab>\n  </TabsList>\n  <TabsPanel value="recent">Recent activity.</TabsPanel>\n  <TabsPanel value="pending">Tasks to do.</TabsPanel>\n  <TabsPanel value="completed">Finished work.</TabsPanel>\n</Tabs>' },
      { id: "tabs-underline-top", title: "Indicator on top", description: "indicatorPosition=\"top\" moves the bar to the top edge of the active tab.", code: '<Tabs variant="underline" indicatorPosition="top" defaultValue="general">\n  <TabsList aria-label="Preferences">\n    <TabsTab value="general">General</TabsTab>\n    <TabsTab value="members">Members</TabsTab>\n    <TabsTab value="billing">Billing</TabsTab>\n  </TabsList>\n  <TabsPanel value="general">General preferences.</TabsPanel>\n  <TabsPanel value="members">Manage the team.</TabsPanel>\n  <TabsPanel value="billing">Plan and payments.</TabsPanel>\n</Tabs>' },
      { id: "tabs-underline-pill", title: "Thick bar", description: "In underline, shape=\"pill\" thickens the bar into a rounded lozenge.", code: '<Tabs variant="underline" shape="pill" defaultValue="day">\n  <TabsList aria-label="Range">\n    <TabsTab value="day">Day</TabsTab>\n    <TabsTab value="week">Week</TabsTab>\n    <TabsTab value="month">Month</TabsTab>\n  </TabsList>\n  <TabsPanel value="day">Daily view.</TabsPanel>\n  <TabsPanel value="week">Weekly view.</TabsPanel>\n  <TabsPanel value="month">Monthly view.</TabsPanel>\n</Tabs>' },
    ],
  },
  {
    name: "avatar", title: "Avatar", registryPath: "ui/avatar.tsx", reference: "avatar",
    description: "User image with an initials fallback when it fails to load.",
    usage: 'import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"\n\n<Avatar>\n  <AvatarImage src="/ana.jpg" alt="Ana Ruiz" />\n  <AvatarFallback>AR</AvatarFallback>\n</Avatar>',
    properties: [["Avatar", "span", "—", "Round container; control its size with the size prop."], ["size", '"sm" | "default" | "lg"', '"default"', "Avatar size: 32, 40 or 48 px, with the fallback font scaled to match."], ["AvatarImage", "img", "—", "Image; fades in when loaded and hides if it fails."], ["AvatarFallback", "span", "—", "Alternative content (initials or an icon)."]],
    accessibility: ["Give AvatarImage a descriptive alt with the person's name.", "The fallback appears while the image loads or if it fails; use initials or an icon, not color alone."],
    states: [["Loading", "Shows the fallback while the image loads."], ["Loaded", "The image fades in and covers the container."], ["Fallback", "If the image fails, the initials or an icon remain."]],
    examples: [
      { id: "avatar-fallback", title: "Image with fallback", description: "If the image fails to load, the initials are shown.", code: '<Avatar>\n  <AvatarImage src="/ana.jpg" alt="Ana Ruiz" />\n  <AvatarFallback>AR</AvatarFallback>\n</Avatar>\n<Avatar>\n  <AvatarImage src="/broken.jpg" alt="Luis Mora" />\n  <AvatarFallback>LM</AvatarFallback>\n</Avatar>' },
      { id: "avatar-sizes", title: "Sizes", description: "Three sizes: sm (32 px), default (40 px) and lg (48 px). The fallback font scales with the avatar.", code: '<Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>\n<Avatar><AvatarFallback>MD</AvatarFallback></Avatar>\n<Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>' },
      { id: "avatar-group", title: "Stacked group", description: "Several overlapping avatars composed together.", code: '<div className="flex -space-x-2">\n  <Avatar className="ring-2 ring-background"><AvatarFallback>AR</AvatarFallback></Avatar>\n  <Avatar className="ring-2 ring-background"><AvatarFallback>LM</AvatarFallback></Avatar>\n  <Avatar className="ring-2 ring-background"><AvatarFallback>+3</AvatarFallback></Avatar>\n</div>' },
    ],
  },
  {
    name: "tooltip", title: "Tooltip", registryPath: "ui/tooltip.tsx", reference: "tooltip",
    description: "A short description on focus or hover; renders in a portal with the correct theme.",
    usage: 'import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"\n\n<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger render={<Button variant="outline">Save</Button>} />\n    <TooltipContent>Save your changes (⌘S)</TooltipContent>\n  </Tooltip>\n</TooltipProvider>',
    properties: [["TooltipProvider", "—", "—", "Shares the open delay between tooltips; wrap your app once."], ["Tooltip", "—", "—", "Root; accepts open, defaultOpen and onOpenChange."], ["TooltipTrigger", "button", "—", "Element that triggers the tooltip; use render to reuse a control."], ["TooltipContent", "div", "—", "Portaled content; sideOffset adjusts the distance."]],
    accessibility: ["The tooltip complements, it does not replace, the control's accessible label. Do not put actions or essential information in it.", "It appears on keyboard focus and on hover, and closes with Escape. A disabled control cannot receive focus, so wrap it if you need to explain why it is disabled."],
    states: [["Hidden", "No visible content; no cost until it opens."], ["Visible on focus", "Appears when the trigger receives keyboard focus."], ["Visible on hover", "Appears on hover after the shared delay."], ["Close", "Escape or leaving the trigger hides it."]],
    examples: [
      { id: "tooltip-basic", title: "Contextual help", description: "Shown on keyboard focus or hover.", code: '<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger render={<Button variant="outline">Save</Button>} />\n    <TooltipContent>Save your changes (⌘S)</TooltipContent>\n  </Tooltip>\n</TooltipProvider>' },
      { id: "tooltip-states", title: "On controls in different states", description: "A tooltip on an active control and on a disabled one (wrapped so it can receive focus).", code: '<TooltipProvider>\n  <div className="flex gap-3">\n    <Tooltip>\n      <TooltipTrigger render={<Button>Publish</Button>} />\n      <TooltipContent>Publish the project now</TooltipContent>\n    </Tooltip>\n    <Tooltip>\n      <TooltipTrigger render={<span tabIndex={0} />}>\n        <Button disabled>Publish</Button>\n      </TooltipTrigger>\n      <TooltipContent>Fill in the required fields first</TooltipContent>\n    </Tooltip>\n  </div>\n</TooltipProvider>' },
    ],
  },
  {
    name: "dialog", title: "Dialog", registryPath: "ui/dialog.tsx", reference: "dialog",
    description: "A modal window with focus trapping, Escape to close and a backdrop; renders in a portal.",
    usage: 'import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"\n\n<Dialog>\n  <DialogTrigger render={<Button>Edit profile</Button>} />\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Edit profile</DialogTitle>\n      <DialogDescription>Update your details.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <DialogClose render={<Button variant="outline">Cancel</Button>} />\n      <DialogClose render={<Button>Save</Button>} />\n    </DialogFooter>\n  </DialogContent>\n</Dialog>',
    properties: [["Dialog", "—", "—", "Root; accepts open, defaultOpen and onOpenChange."], ["dismissible", "boolean", "true", "When false, backdrop clicks and Escape do not close it: only the X or a DialogClose."], ["DialogTrigger", "button", "—", "Opens the dialog; use render to reuse a Button."], ["DialogContent", "div", "—", "Portaled backdrop and panel; traps focus. Includes a close button in the corner."], ["size", '"sm" | "default" | "lg"', '"default"', "Maximum panel width: 384, 512 or 672 px."], ["showClose", "boolean", "true", "Shows the close X in the corner; set it to false if the footer is the only way out."], ["DialogTitle", "h2", "—", "Accessible title of the dialog (aria-labelledby)."], ["DialogDescription", "p", "—", "Associated description (aria-describedby)."], ["DialogClose", "button", "—", "Closes the dialog."]],
    accessibility: ["Always include a DialogTitle: it names the dialog for screen readers. Use DialogDescription for context.", "Focus moves in on open, stays trapped inside and returns to the trigger on close. Escape and backdrop clicks close it; the panel uses theme tokens, so it keeps Light/Dark inside the portal."],
    states: [["Closed", "Only the trigger; the content is not mounted needlessly."], ["Open", "Portaled backdrop and panel; focus moves in and stays trapped."], ["Close", "Escape or a backdrop click closes it and returns focus (if dismissible)."], ["Non-dismissible", "dismissible={false} requires an explicit footer action."]],
    examples: [
      { id: "dialog-basic", title: "Modal dialog", description: "Title, description and actions; focus returns to the trigger on close.", code: '<Dialog>\n  <DialogTrigger render={<Button>Edit profile</Button>} />\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Edit profile</DialogTitle>\n      <DialogDescription>Change your display name. It is saved when you confirm.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <DialogClose render={<Button variant="outline">Cancel</Button>} />\n      <DialogClose render={<Button>Save changes</Button>} />\n    </DialogFooter>\n  </DialogContent>\n</Dialog>' },
      { id: "dialog-select", title: "With a Select inside", description: "Required composition: the Select popup opens correctly inside the dialog and in the active theme.", code: '<Dialog>\n  <DialogTrigger render={<Button>Move project</Button>} />\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Move project</DialogTitle>\n      <DialogDescription>Choose the destination workspace.</DialogDescription>\n    </DialogHeader>\n    <Select defaultValue="acme">\n      <SelectTrigger><SelectValue /></SelectTrigger>\n      <SelectContent>\n        <SelectItem value="acme">Acme Studio</SelectItem>\n        <SelectItem value="labs">Labs</SelectItem>\n        <SelectItem value="personal">Personal</SelectItem>\n      </SelectContent>\n    </Select>\n    <DialogFooter>\n      <DialogClose render={<Button variant="outline">Cancel</Button>} />\n      <DialogClose render={<Button>Move</Button>} />\n    </DialogFooter>\n  </DialogContent>\n</Dialog>' },
      { id: "dialog-lg", title: "Large size and long title", description: 'size="lg" widens the panel; a long title wraps without running under the X.', code: '<Dialog>\n  <DialogTrigger render={<Button variant="outline">View terms</Button>} />\n  <DialogContent size="lg">\n    <DialogHeader>\n      <DialogTitle>Platform terms of service and privacy policy</DialogTitle>\n      <DialogDescription>A wider panel for long content.</DialogDescription>\n    </DialogHeader>\n    <div className="mt-4 max-h-64 overflow-y-auto text-sm text-muted-foreground">\n      <p>Long content…</p>\n    </div>\n    <DialogFooter>\n      <DialogClose render={<Button variant="outline">Cancel</Button>} />\n      <DialogClose render={<Button>Accept</Button>} />\n    </DialogFooter>\n  </DialogContent>\n</Dialog>' },
      { id: "dialog-persistent", title: "Persistent (does not close on outside click)", description: 'dismissible={false} prevents closing on outside click and Escape; combine it with showClose={false} to require an explicit action.', code: '<Dialog dismissible={false}>\n  <DialogTrigger render={<Button variant="outline">Set up workspace</Button>} />\n  <DialogContent showClose={false}>\n    <DialogHeader>\n      <DialogTitle>Finish the setup</DialogTitle>\n      <DialogDescription>Outside clicks and Escape do not close it; you have to choose an action.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <DialogClose render={<Button variant="outline">Not now</Button>} />\n      <DialogClose render={<Button>Continue</Button>} />\n    </DialogFooter>\n  </DialogContent>\n</Dialog>' },
    ],
  },
  {
    name: "alert-dialog", title: "AlertDialog", registryPath: "ui/alert-dialog.tsx", reference: "alert-dialog",
    description: "Modal confirmation for destructive actions; requires an explicit decision.",
    usage: 'import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogClose } from "@/components/ui/alert-dialog"\n\n<AlertDialog>\n  <AlertDialogTrigger render={<Button variant="destructive">Delete</Button>} />\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Delete project?</AlertDialogTitle>\n      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogClose render={<Button variant="outline">Cancel</Button>} />\n      <AlertDialogClose render={<Button variant="destructive">Delete</Button>} />\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>',
    properties: [["AlertDialog", "—", "—", "Modal root; does not close on backdrop click or Escape."], ["AlertDialogTrigger", "button", "—", "Opens the confirmation."], ["AlertDialogContent", "div", "—", "Portaled backdrop and panel; traps focus."], ["AlertDialogTitle", "h2", "—", "Question or title of the confirmation."], ["AlertDialogDescription", "p", "—", "Consequence of the action."], ["AlertDialogClose", "button", "—", "Closes it by confirming or cancelling."]],
    accessibility: ["Use it only for decisions that justify an interruption (delete, discard). Unlike Dialog, it does not close on outside click or Escape: it forces a choice.", "Name the risky action clearly on the button (for example, \"Delete\"), not just \"OK\". Focus stays trapped and returns to the trigger on close."],
    states: [["Closed", "Only the trigger is visible."], ["Open", "Modal panel with trapped focus; the backdrop does not close it."], ["Decision", "Only an AlertDialogClose closes it: confirm or cancel."]],
    examples: [
      { id: "alert-dialog-basic", title: "Confirm a destructive action", description: "Requires a choice; it is not dismissed by an outside click.", code: '<AlertDialog>\n  <AlertDialogTrigger render={<Button variant="destructive">Delete project</Button>} />\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Delete "Redesign 2026"?</AlertDialogTitle>\n      <AlertDialogDescription>Its files and members will be removed. This action cannot be undone.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogClose render={<Button variant="outline">Cancel</Button>} />\n      <AlertDialogClose render={<Button variant="destructive">Delete</Button>} />\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>' },
    ],
  },
  {
    name: "dropdown-menu", title: "DropdownMenu", registryPath: "ui/dropdown-menu.tsx", reference: "menu",
    description: "An action menu anchored to a trigger; keyboard navigable and rendered in a portal.",
    usage: 'import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"\n\n<DropdownMenu>\n  <DropdownMenuTrigger render={<Button variant="outline">Options</Button>} />\n  <DropdownMenuContent>\n    <DropdownMenuItem>Edit</DropdownMenuItem>\n    <DropdownMenuItem>Duplicate</DropdownMenuItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem>Delete</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>',
    properties: [["DropdownMenu", "—", "—", "Root; accepts open, defaultOpen and onOpenChange."], ["DropdownMenuTrigger", "button", "—", "Opens the menu; use render to reuse a Button."], ["DropdownMenuContent", "div", "—", "Portaled popup; side, align and sideOffset adjust its position."], ["DropdownMenuItem", "div", "—", "An action; accepts onClick and disabled."], ["DropdownMenuLabel", "div", "—", "Heading for a group."], ["DropdownMenuSeparator", "div", "—", "Divides groups of actions."]],
    accessibility: ["Opens with Enter, Space or an arrow key; arrow keys move focus between items and Escape closes it, returning focus to the trigger.", "The popup uses theme tokens, so it keeps Light/Dark even when opened over a table row or another surface. Give an icon-only trigger an aria-label."],
    states: [["Closed", "Only the trigger is visible."], ["Open", "Portaled popup in the active theme; focus on the first item."], ["Highlighted item", "Arrow keys and the pointer highlight the active item."], ["Disabled item", "disabled skips the item in the focus order."], ["On close", "Escape closes it and returns focus to the trigger."]],
    examples: [
      { id: "dropdown-menu-basic", title: "Action menu", description: "Label, actions and a separator; keyboard navigable.", code: '<DropdownMenu>\n  <DropdownMenuTrigger render={<Button variant="outline">Options</Button>} />\n  <DropdownMenuContent>\n    <DropdownMenuLabel>Project</DropdownMenuLabel>\n    <DropdownMenuItem>Edit</DropdownMenuItem>\n    <DropdownMenuItem>Duplicate</DropdownMenuItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem>Delete</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>' },
      { id: "dropdown-menu-table", title: "In a table row", description: "Required composition: the row menu opens in the correct theme over the table.", code: '<table className="w-full text-sm">\n  <tbody>\n    {["Redesign 2026", "Mobile app"].map(name => (\n      <tr key={name} className="border-b border-border">\n        <td className="py-2">{name}</td>\n        <td className="py-2 text-right">\n          <DropdownMenu>\n            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={"Actions for " + name}>⋯</Button>} />\n            <DropdownMenuContent align="end">\n              <DropdownMenuItem>Open</DropdownMenuItem>\n              <DropdownMenuItem>Rename</DropdownMenuItem>\n              <DropdownMenuSeparator />\n              <DropdownMenuItem>Archive</DropdownMenuItem>\n            </DropdownMenuContent>\n          </DropdownMenu>\n        </td>\n      </tr>\n    ))}\n  </tbody>\n</table>' },
    ],
  },
  {
    name: "select", title: "Select", registryPath: "ui/select.tsx", reference: "select",
    description: "Single-option selection with a portaled popup, keyboard support and accessible states.",
    usage: 'import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"\n\n<Select defaultValue="acme">\n  <SelectTrigger><SelectValue /></SelectTrigger>\n  <SelectContent>\n    <SelectItem value="acme">Acme Studio</SelectItem>\n    <SelectItem value="labs">Labs</SelectItem>\n  </SelectContent>\n</Select>',
    properties: [["Select", "—", "—", "Root; accepts value, defaultValue, onValueChange, name and disabled."], ["SelectTrigger", "button", "—", "Button that opens the popup and shows the value."], ["SelectValue", "span", "—", "Shows the selected value or the placeholder."], ["SelectContent", "div", "—", "Portaled popup; side, align and sideOffset adjust its position."], ["SelectItem", "div", "—", "An option; requires value."]],
    accessibility: ["Associate a label with the control (inside Field with FieldLabel, or a native label). Give SelectValue a descriptive placeholder when there is no value.", "Opens and navigates with the keyboard (arrow keys, type to search, Enter to choose, Escape to close). The popup uses theme tokens and keeps the selection when opened inside a Dialog."],
    states: [["Rest", "Trigger with placeholder or value and a 1 px border."], ["Open", "Portaled popup; the trigger is expanded (aria-expanded)."], ["Highlighted option", "The keyboard or pointer highlights the focused option."], ["Selected", "The chosen option is marked inside the popup."], ["Focus visible", "2 px ring outline on the trigger."], ["Disabled", "disabled prevents opening."]],
    examples: [
      { id: "select-basic", title: "Simple selection", description: "Default value, keyboard support and visible focus.", code: '<Select defaultValue="acme">\n  <SelectTrigger><SelectValue /></SelectTrigger>\n  <SelectContent>\n    <SelectItem value="acme">Acme Studio</SelectItem>\n    <SelectItem value="labs">Labs</SelectItem>\n    <SelectItem value="personal">Personal</SelectItem>\n  </SelectContent>\n</Select>' },
      { id: "select-groups", title: "Grouped options", description: "Labeled groups and a separator inside the popup.", code: '<Select defaultValue="react">\n  <SelectTrigger><SelectValue placeholder="Choose a framework" /></SelectTrigger>\n  <SelectContent>\n    <SelectGroup>\n      <SelectGroupLabel>Frontend</SelectGroupLabel>\n      <SelectItem value="react">React</SelectItem>\n      <SelectItem value="vue">Vue</SelectItem>\n    </SelectGroup>\n    <SelectSeparator />\n    <SelectGroup>\n      <SelectGroupLabel>Meta-frameworks</SelectGroupLabel>\n      <SelectItem value="next">Next.js</SelectItem>\n    </SelectGroup>\n  </SelectContent>\n</Select>' },
    ],
  },
  {
    name: "toast", title: "Toast", registryPath: "ui/toast.tsx", reference: "toast",
    description: "A brief, non-blocking notice that appears and dismisses itself; renders in a portal.",
    usage: 'import { ToastProvider, Toaster, useToast } from "@/components/ui/toast"\n\n// At the root of the app:\n<ToastProvider>\n  {children}\n  <Toaster />\n</ToastProvider>\n\n// In any component:\nconst toast = useToast()\ntoast.add({ title: "Saved", description: "Your changes were applied." })',
    properties: [["ToastProvider", "—", "—", "Manages the queue; wrap your app once. Accepts timeout and limit."], ["Toaster", "div", "—", "Portal and viewport where toasts stack."], ["useToast()", "hook", "—", "Returns add, close, update and promise."], ["add(options)", "—", "—", "title, description, type ('success' | 'warning' | 'info' | 'error'; neutral without a type), timeout."]],
    accessibility: ["The viewport announces toasts to screen readers (aria-live policy); use priority: 'high' only for urgent notices.", "Never make a toast the only way to reach a critical action: it is ephemeral. The close button has an aria-label and the state is communicated through text, not color alone."],
    states: [["Enters", "Appears in the viewport and is announced through aria-live."], ["Types", "success, warning, info and error color the border; neutral without a type."], ["Manual close", "The close button (with aria-label) dismisses it."], ["Dismissed", "Leaves on its own when the timeout ends."]],
    examples: [
      { id: "toast-basic", title: "States: success, warning, info and error", description: "The type colors the left border (success, warning, info, error); neutral without a type. It appears, can be closed and dismisses itself.", code: 'const toast = useToast()\n\n<div className="flex gap-3">\n  <Button onClick={() => toast.add({ title: "Changes saved", type: "success" })}>Save</Button>\n  <Button variant="outline" onClick={() => toast.add({ title: "Storage almost full", type: "warning" })}>Warn</Button>\n  <Button variant="outline" onClick={() => toast.add({ title: "New version available", type: "info" })}>Inform</Button>\n  <Button variant="outline" onClick={() => toast.add({ title: "Could not publish", type: "error" })}>Publish</Button>\n</div>' },
    ],
  },
]

export const componentNames = meta.map(entry => entry.name)
export const metaByName: Record<string, ComponentMeta> = Object.fromEntries(meta.map(entry => [entry.name, entry]))
