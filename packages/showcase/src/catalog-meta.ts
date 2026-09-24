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
    description: "Acciones claras con variantes, tamaños y estados accesibles.",
    usage: 'import { Button } from "@/components/ui/button"\n\n<Button>Crear proyecto</Button>',
    properties: [["variant", '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"', '"default"', "Tratamiento visual y jerarquía de la acción."], ["size", '"sm" | "default" | "lg" | "icon"', '"default"', "Tamaño del botón; icon para acciones de un solo icono."], ["loading", "boolean", "false", "Muestra un spinner, deshabilita y conserva el ancho."], ["disabled", "boolean", "false", "Deshabilita la interacción."]],
    accessibility: ["Usa un texto que describa la acción. Con size=\"icon\" o un botón de solo icono, proporciona aria-label.", "loading expone aria-busy, evita envíos duplicados y no cambia el ancho del botón; el spinner respeta prefers-reduced-motion.", "Para renderizar como enlace, usa el render de Base UI: <Button render={<a href=\"…\" />}>. Define type=\"submit\" para enviar un formulario."],
    states: [["Reposo", "Superficie según variante; borde de 1 px en outline y neutrales."], ["Hover", "Cambio sutil de superficie con transición de color de 120 ms."], ["Foco visible", "Contorno de 2 px del color ring, integrado al borde, solo con teclado."], ["Activo", "Realimentación al pulsar, sin desplazar el contenido."], ["Cargando", "loading muestra el Spinner, expone aria-busy, conserva el ancho e impide el doble envío."], ["Deshabilitado", "disabled quita la interacción y sale del recorrido de Tab."]],
    examples: [
      { id: "button-variants", title: "Jerarquía de acciones", description: "Del énfasis principal al enlace, cada variante ordena la interfaz.", code: '<Button>Guardar</Button>\n<Button variant="secondary">Duplicar</Button>\n<Button variant="outline">Cancelar</Button>\n<Button variant="ghost">Descartar</Button>\n<Button variant="destructive">Eliminar</Button>\n<Button variant="link">Saber más</Button>' },
      { id: "button-sizes", title: "Un tamaño para cada contexto", description: "Small, default, large e icon para acciones cuadradas.", code: '<Button size="sm">Pequeño</Button>\n<Button>Mediano</Button>\n<Button size="lg">Grande</Button>\n<Button size="icon" aria-label="Añadir">+</Button>' },
      { id: "button-loading", title: "Carga sin saltos", description: "El spinner sustituye al texto sin cambiar el ancho; impide el doble clic.", code: 'const [loading, setLoading] = useState(false)\n\n<Button loading={loading} onClick={() => save()}>Guardar cambios</Button>\n<Button variant="outline" loading>Cargando</Button>' },
      { id: "button-disabled", title: "Estados que se entienden", description: "Acciones deshabilitadas con semántica nativa.", code: '<Button disabled>Guardar</Button>\n<Button variant="outline" disabled>Sin acceso</Button>' },
    ],
  },
  {
    name: "field", title: "Field", registryPath: "ui/field.tsx", reference: "field",
    description: "Etiqueta, control, descripción y errores conectados en un solo campo.",
    usage: 'import { Field, FieldLabel, FieldControl, FieldDescription } from "@/components/ui/field"\n\n<Field name="email">\n  <FieldLabel>Correo electrónico</FieldLabel>\n  <FieldControl type="email" />\n  <FieldDescription>Usa tu correo de trabajo.</FieldDescription>\n</Field>',
    properties: [["name", "string", "—", "Nombre del campo en el formulario."], ["invalid", "boolean", "—", "Marca el campo como inválido."], ["disabled", "boolean", "false", "Deshabilita los controles del campo."]],
    accessibility: ["Usa FieldLabel para nombrar el control y FieldDescription para instrucciones persistentes. FieldError presenta el error asociado; compón Field dentro de Form de Base UI para validar al enviar.", "El placeholder complementa la etiqueta. Conserva el foco visible y explica los errores con texto. Usa disabled para impedir la interacción y readOnly cuando el contenido deba seguir siendo seleccionable."],
    states: [["Reposo", "FieldControl con borde de 1 px neutral."], ["Foco visible", "Contorno de 2 px en ring; el borde adopta el mismo color."], ["Inválido", "invalid o validación fallida: borde en destructive y FieldError asociado."], ["Inválido con foco", "Contorno de 2 px en destructive; no se añade el foco neutral."], ["Deshabilitado", "disabled desactiva el control y lo saca del Tab."], ["Solo lectura", "readOnly conserva el valor seleccionable sin permitir edición."]],
    examples: [
      { id: "field-validation", title: "Formularios que te acompañan", description: "Label, ayuda y validación. Prueba enviar un correo vacío.", code: 'import { Form } from "@base-ui/react/form"\n\n<Form onSubmit={(event) => event.preventDefault()}>\n  <Field name="email">\n    <FieldLabel>Correo electrónico</FieldLabel>\n    <FieldControl type="email" required />\n    <FieldDescription>Tu correo de trabajo.</FieldDescription>\n    <FieldError match="valueMissing">Escribe tu correo.</FieldError>\n    <FieldError match="typeMismatch">Escribe un correo válido.</FieldError>\n  </Field>\n  <Button type="submit">Continuar</Button>\n</Form>' },
      { id: "field-description", title: "El contexto también importa", description: "Instrucciones persistentes, vinculadas al control.", code: '<Field name="project">\n  <FieldLabel>Nombre del proyecto</FieldLabel>\n  <FieldControl placeholder="Mi próximo proyecto" />\n  <FieldDescription>Puedes cambiarlo después.</FieldDescription>\n</Field>' },
      { id: "field-disabled", title: "Disponible cuando lo necesites", description: "Un campo deshabilitado conserva su estructura y contexto.", code: '<Field name="workspace" disabled>\n  <FieldLabel>Espacio de trabajo</FieldLabel>\n  <FieldControl value="Acme Studio" />\n  <FieldDescription>Administrado por tu organización.</FieldDescription>\n</Field>' },
    ],
  },
  {
    name: "input", title: "Input", registryPath: "ui/input.tsx", reference: "input",
    description: "Entrada de texto con foco visible y validación integrada con Field.",
    usage: 'import { Input } from "@/components/ui/input"\n\n<label>Nombre\n  <Input placeholder="Tu nombre" />\n</label>',
    properties: [["type", "string", '"text"', "Tipo nativo de entrada."], ["value / defaultValue", "string", "—", "Valor controlado o valor inicial."], ["onValueChange", "(value, eventDetails) => void", "—", "Recibe el texto actualizado."], ["disabled / readOnly", "boolean", "false", "Deshabilita la edición o permite solo lectura."]],
    accessibility: ["Vincula el control a una etiqueta: dentro de Field usa FieldLabel; fuera de Field, una etiqueta nativa asociada. El placeholder complementa la etiqueta, no la sustituye.", "Conserva el foco visible y explica los errores con texto. Usa disabled para impedir la interacción y readOnly cuando el contenido deba seguir siendo seleccionable."],
    states: [["Reposo", "Borde de 1 px identificable (token input)."], ["Foco visible", "Contorno de 2 px en ring integrado al borde."], ["Inválido", "Dentro de Field, borde en destructive y error por texto."], ["Deshabilitado", "disabled impide la interacción y el foco."], ["Solo lectura", "readOnly mantiene el contenido seleccionable."]],
    examples: [
      { id: "input-validation", title: "Input con validación", description: "Etiqueta, ayuda y error vinculados. Prueba enviar el campo vacío.", code: "import { Input } from \"@/components/ui/input\"\nimport { Field, FieldLabel, FieldDescription, FieldError } from \"@/components/ui/field\"\nimport { Form } from \"@base-ui/react/form\"\nimport { Button } from \"@/components/ui/button\"\n\n<Form onSubmit={event => event.preventDefault()}>\n  <Field name=\"input\">\n    <FieldLabel>Nombre</FieldLabel>\n    <Input required />\n    <FieldDescription>Completa este campo.</FieldDescription>\n    <FieldError match=\"valueMissing\">Este campo es obligatorio.</FieldError>\n  </Field>\n  <Button type=\"submit\">Validar</Button>\n</Form>" },
      { id: "input-disabled", title: "Input deshabilitado", description: "Conserva el contenido y la semántica nativa del control.", code: "<label>Referencia\n  <Input disabled defaultValue=\"Proyecto ZUNO\" />\n</label>" },
      { id: "input-readonly", title: "Input de solo lectura", description: "Conserva el contenido y la semántica nativa del control.", code: "<label>Referencia\n  <Input readOnly defaultValue=\"Proyecto ZUNO\" />\n</label>" },
    ],
  },
  {
    name: "textarea", title: "Textarea", registryPath: "ui/textarea.tsx", reference: "field",
    description: "Entrada de texto multilínea con altura ajustable y estados accesibles.",
    usage: 'import { Textarea } from "@/components/ui/textarea"\n\n<label>Mensaje\n  <Textarea placeholder="Escribe tu mensaje…" />\n</label>',
    properties: [["rows", "number", "4", "Altura inicial en líneas; permite redimensionar verticalmente."], ["value / defaultValue", "string", "—", "Valor controlado o valor inicial."], ["onValueChange", "(value, eventDetails) => void", "—", "Recibe el texto actualizado."], ["disabled / readOnly", "boolean", "false", "Deshabilita la edición o permite solo lectura."]],
    accessibility: ["Vincula el control a una etiqueta como en Input. Acepta las propiedades nativas de textarea, incluidas required, maxLength, ref y onChange.", "Conserva el foco visible y explica los errores con texto; el control crece con el contenido sin recortarlo."],
    states: [["Reposo", "Borde de 1 px identificable (token input)."], ["Foco visible", "Contorno de 2 px en ring integrado al borde."], ["Inválido", "Dentro de Field, borde en destructive y error por texto."], ["Redimensionable", "Crece con el contenido; resize vertical sin recortar el texto."], ["Deshabilitado", "disabled impide la interacción y el foco."], ["Solo lectura", "readOnly mantiene el contenido seleccionable."]],
    examples: [
      { id: "textarea-validation", title: "Textarea con validación", description: "Etiqueta, ayuda y error vinculados. Prueba enviar el campo vacío.", code: "import { Textarea } from \"@/components/ui/textarea\"\nimport { Field, FieldLabel, FieldDescription, FieldError } from \"@/components/ui/field\"\nimport { Form } from \"@base-ui/react/form\"\nimport { Button } from \"@/components/ui/button\"\n\n<Form onSubmit={event => event.preventDefault()}>\n  <Field name=\"textarea\">\n    <FieldLabel>Mensaje</FieldLabel>\n    <Textarea required />\n    <FieldDescription>Completa este campo.</FieldDescription>\n    <FieldError match=\"valueMissing\">Este campo es obligatorio.</FieldError>\n  </Field>\n  <Button type=\"submit\">Validar</Button>\n</Form>" },
      { id: "textarea-disabled", title: "Textarea deshabilitado", description: "Conserva el contenido y la semántica nativa del control.", code: "<label>Referencia\n  <Textarea disabled defaultValue=\"Proyecto ZUNO\" />\n</label>" },
      { id: "textarea-readonly", title: "Textarea de solo lectura", description: "Conserva el contenido y la semántica nativa del control.", code: "<label>Referencia\n  <Textarea readOnly defaultValue=\"Proyecto ZUNO\" />\n</label>" },
    ],
  },
  {
    name: "container", title: "Container", registryPath: "components/container.tsx",
    description: "Límites de ancho, padding lateral y variantes de lectura o dashboard.",
    usage: 'import { Container } from "@/components/container"\n\n<Container size="content">\n  {children}\n</Container>',
    properties: [["size", '"reading" | "form" | "content" | "dashboard"', '"content"', "Ancho máximo y ritmo de lectura."], ["className", "string", "—", "Clases adicionales para el contenedor."]],
    accessibility: ["Es un contenedor presentacional: no añade roles ARIA ni altera el orden del DOM.", "Controla la posición exterior; el contenido gestiona su interior. Conserva el orden de lectura del documento."],
    examples: [
      { id: "container-sizes", title: "Un ancho para cada contenido", description: "Lectura, formulario, contenido y dashboard fluido.", code: '<Container size="reading">Texto largo</Container>\n<Container size="form">Formulario</Container>\n<Container size="content">Página</Container>' },
    ],
  },
  {
    name: "stack", title: "Stack", registryPath: "components/stack.tsx",
    description: "Ritmo vertical con gap semántico, sin márgenes ocultos.",
    usage: 'import { Stack } from "@/components/stack"\n\n<Stack gap="4">\n  {children}\n</Stack>',
    properties: [["gap", '"2" | "4" | "6" | "8"', '"4"', "Separación vertical entre elementos."], ["align", '"start" | "center" | "stretch"', '"stretch"', "Alineación horizontal de los hijos."]],
    accessibility: ["Contenedor presentacional basado en flexbox; no introduce roles ni cambia el orden de lectura.", "Expresa relación mediante proximidad: agrupa lo relacionado con un gap menor que el que lo separa del resto."],
    examples: [
      { id: "stack-gap", title: "Ritmo vertical consistente", description: "Un gap semántico entre secciones relacionadas.", code: '<Stack gap="4">\n  <div>Perfil</div>\n  <div>Facturación</div>\n  <div>Seguridad</div>\n</Stack>' },
    ],
  },
  {
    name: "cluster", title: "Cluster", registryPath: "components/cluster.tsx",
    description: "Agrupación horizontal con wrap para acciones, tags y filtros.",
    usage: 'import { Cluster } from "@/components/cluster"\n\n<Cluster gap="2">\n  {children}\n</Cluster>',
    properties: [["gap", '"2" | "3" | "4"', '"2"', "Separación entre elementos."], ["align", '"start" | "center" | "between"', '"center"', "Alineación y distribución horizontal."]],
    accessibility: ["Contenedor presentacional con wrap; el orden visual sigue el orden del DOM al envolver.", "Ideal para grupos de acciones o etiquetas: conserva el foco por teclado en el orden de lectura."],
    examples: [
      { id: "cluster-tags", title: "Etiquetas que se acomodan", description: "Agrupación con wrap para filtros y metadatos.", code: '<Cluster gap="2">\n  <span>Diseño</span>\n  <span>Accesible</span>\n  <span>Ligero</span>\n</Cluster>' },
      { id: "cluster-between", title: "Acciones a los extremos", description: "align=\"between\" separa contenido y acciones.", code: '<Cluster align="between">\n  <span>Miembros</span>\n  <Button>Invitar</Button>\n</Cluster>' },
    ],
  },
  {
    name: "responsive-grid", title: "ResponsiveGrid", registryPath: "components/responsive-grid.tsx",
    description: "Colecciones adaptables al ancho disponible, sin imponer doce columnas.",
    usage: 'import { ResponsiveGrid } from "@/components/responsive-grid"\n\n<ResponsiveGrid min="16rem" gap="6">\n  {children}\n</ResponsiveGrid>',
    properties: [["min", "string", '"16rem"', "Ancho mínimo de columna antes de envolver."], ["gap", '"4" | "6" | "8"', '"6"', "Separación entre celdas."]],
    accessibility: ["Contenedor presentacional con CSS Grid auto-fill; el orden visual coincide con el del DOM.", "Se adapta al ancho real del contenedor sin forzar una retícula fija de columnas."],
    examples: [
      { id: "grid-cards", title: "Tarjetas que se reacomodan", description: "Las columnas se ajustan al ancho disponible.", code: '<ResponsiveGrid min="12rem" gap="4">\n  <div>Uno</div>\n  <div>Dos</div>\n  <div>Tres</div>\n</ResponsiveGrid>' },
    ],
  },
  {
    name: "card", title: "Card", registryPath: "ui/card.tsx",
    description: "Superficie con anatomía y padding coherentes; ancho y márgenes externos libres.",
    usage: 'import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"\n\n<Card>\n  <CardHeader>\n    <CardTitle>Plan Pro</CardTitle>\n    <CardDescription>Facturación mensual.</CardDescription>\n  </CardHeader>\n  <CardContent>Contenido</CardContent>\n  <CardFooter>\n    <Button>Elegir plan</Button>\n  </CardFooter>\n</Card>',
    properties: [["Card", "div", "—", "Contenedor con borde y superficie de tarjeta."], ["CardHeader", "div", "—", "Encabezado con título y descripción."], ["CardTitle", "h3", "—", "Título de la tarjeta."], ["CardDescription", "p", "—", "Texto de apoyo secundario."], ["CardContent", "div", "—", "Cuerpo principal."], ["CardFooter", "div", "—", "Acciones o metadatos al pie."]],
    accessibility: ["Usa CardTitle como encabezado para la jerarquía del documento; ajusta el nivel con className o un elemento propio.", "Card es una superficie presentacional: no captura foco ni añade roles. Coloca controles accesibles en su interior."],
    examples: [
      { id: "card-basic", title: "Anatomía completa", description: "Encabezado, contenido y pie con acciones.", code: '<Card>\n  <CardHeader>\n    <CardTitle>Plan Pro</CardTitle>\n    <CardDescription>Facturación mensual.</CardDescription>\n  </CardHeader>\n  <CardContent>Colaboración, historial y soporte.</CardContent>\n  <CardFooter>\n    <Button>Elegir plan</Button>\n    <Button variant="outline">Comparar</Button>\n  </CardFooter>\n</Card>' },
    ],
  },
  {
    name: "badge", title: "Badge", registryPath: "ui/badge.tsx",
    description: "Etiquetas compactas con contraste y variantes limitadas.",
    usage: 'import { Badge } from "@/components/ui/badge"\n\n<Badge>Nuevo</Badge>\n<Badge variant="secondary">Beta</Badge>',
    properties: [["variant", '"default" | "secondary" | "outline" | "destructive"', '"default"', "Estilo e intención visual."]],
    accessibility: ["El color no es el único indicador: el texto del badge comunica el estado.", "Si representa un estado dinámico, acompáñalo de texto o un aria-label en su contexto."],
    examples: [
      { id: "badge-variants", title: "Variantes con propósito", description: "Solo las variantes necesarias, con contraste.", code: '<Badge>Nuevo</Badge>\n<Badge variant="secondary">Beta</Badge>\n<Badge variant="outline">v1.0</Badge>\n<Badge variant="destructive">Obsoleto</Badge>' },
    ],
  },
  {
    name: "separator", title: "Separator", registryPath: "ui/separator.tsx",
    description: "Separación estructural, evitando roles semánticos innecesarios.",
    usage: 'import { Separator } from "@/components/ui/separator"\n\n<Separator />\n<Separator orientation="vertical" />',
    properties: [["orientation", '"horizontal" | "vertical"', '"horizontal"', "Dirección del separador."], ["decorative", "boolean", "true", "Si es semántico, expone role=\"separator\"."]],
    accessibility: ["Por defecto es decorativo (role=\"none\"). Usa decorative={false} cuando separe grupos con significado.", "En orientación vertical, dale altura al contenedor para que el separador sea visible."],
    examples: [
      { id: "separator-orientation", title: "Horizontal y vertical", description: "Separa secciones o elementos en línea.", code: '<div>Sección A</div>\n<Separator />\n<div>Sección B</div>\n\n<div class="flex h-8 items-center gap-3">\n  Izquierda\n  <Separator orientation="vertical" />\n  Derecha\n</div>' },
    ],
  },
  {
    name: "skeleton", title: "Skeleton", registryPath: "ui/skeleton.tsx",
    description: "Reserva de espacio con movimiento reducido; sin carga simulada infinita.",
    usage: 'import { Skeleton } from "@/components/ui/skeleton"\n\n<Skeleton className="h-4 w-32" />',
    properties: [["className", "string", "—", "Define el tamaño y la forma del bloque."]],
    accessibility: ["Es aria-hidden: no anuncia contenido. Comunica el estado de carga con un texto o role=\"status\" adyacente.", "Respeta prefers-reduced-motion: la animación se detiene con movimiento reducido."],
    states: [["Cargando", "Reserva el espacio del contenido con un pulso suave."], ["Movimiento reducido", "El pulso se detiene con prefers-reduced-motion."], ["Semántica", "aria-hidden: comunica la carga con un texto o role=\"status\" adyacente."]],
    examples: [
      { id: "skeleton-card", title: "Reserva de espacio", description: "Mantiene el layout mientras carga el contenido.", code: '<div class="flex items-center gap-3">\n  <Skeleton className="size-10 rounded-full" />\n  <div class="flex flex-1 flex-col gap-2">\n    <Skeleton className="h-4 w-3/4" />\n    <Skeleton className="h-4 w-1/2" />\n  </div>\n</div>' },
    ],
  },
  {
    name: "spinner", title: "Spinner", registryPath: "ui/spinner.tsx",
    description: "Indicador discreto con descripción contextual accesible.",
    usage: 'import { Spinner } from "@/components/ui/spinner"\n\n<Spinner label="Cargando proyectos" />',
    properties: [["label", "string", '"Cargando"', "Nombre accesible del estado (role=\"status\")."], ["className", "string", "—", "Tamaño y color mediante utilidades."]],
    accessibility: ["Expone role=\"status\" y un aria-label configurable; cambia el label según la operación.", "Se detiene con prefers-reduced-motion; no comunica progreso ni porcentajes inventados."],
    states: [["Activo", "Gira y expone role=\"status\" con un label configurable."], ["Movimiento reducido", "Se detiene con prefers-reduced-motion; no simula progreso."]],
    examples: [
      { id: "spinner-sizes", title: "Tamaños y color", description: "Hereda el color del texto; ajusta el tamaño con utilidades.", code: '<Spinner className="size-4" />\n<Spinner className="size-6" />\n<Spinner className="size-8 text-muted-foreground" />' },
    ],
  },
  {
    name: "icon", title: "Icon", registryPath: "ui/icon.tsx",
    description: "Envoltura para iconos de lucide-react con tamaños consistentes y accesibilidad por defecto.",
    usage: 'import { Icon } from "@/components/ui/icon"\nimport { Check } from "lucide-react"\n\n<Icon icon={Check} label="Completado" />',
    properties: [["icon", "ComponentType<SVGProps<SVGSVGElement>>", "—", "Componente de icono a renderizar; acepta lucide-react o cualquier SVG."], ["size", '"xs" | "sm" | "md" | "lg" | "xl"', '"sm"', "Tamaño del icono, de 12 a 32 px."], ["label", "string", "—", "Nombre accesible; sin label el icono es decorativo (aria-hidden)."], ["className", "string", "—", "Color y ajustes adicionales mediante utilidades."]],
    accessibility: ["Sin label el icono se marca aria-hidden; úsalo cuando el texto adyacente ya comunica el significado.", "Con label expone role=\"img\" y aria-label para iconos con significado propio, como en botones de un solo icono."],
    examples: [
      { id: "icon-sizes", title: "Escala consistente", description: "De xs a xl; el icono hereda el color del texto.", code: 'import { Bell } from "lucide-react"\n\n<Icon icon={Bell} size="xs" />\n<Icon icon={Bell} size="sm" />\n<Icon icon={Bell} size="md" />\n<Icon icon={Bell} size="lg" />\n<Icon icon={Bell} size="xl" />' },
      { id: "icon-meaningful", title: "Iconos con significado", description: "Usa label cuando el icono comunica por sí mismo.", code: 'import { CircleCheck, TriangleAlert } from "lucide-react"\n\n<Icon icon={CircleCheck} label="Completado" className="text-zuno-success" />\n<Icon icon={TriangleAlert} label="Advertencia" className="text-zuno-warning" />' },
      { id: "icon-in-button", title: "Dentro de un botón", description: "Botón de un solo icono; el nombre accesible vive en el botón y el icono es decorativo.", code: 'import { Plus } from "lucide-react"\n\n<Button size="icon" aria-label="Añadir proyecto"><Icon icon={Plus} /></Button>' },
    ],
  },
  {
    name: "label", title: "Label", registryPath: "ui/label.tsx",
    description: "Asociación correcta al control y jerarquía tipográfica común.",
    usage: 'import { Label } from "@/components/ui/label"\n\n<Label htmlFor="name">Nombre</Label>\n<Input id="name" />',
    properties: [["htmlFor", "string", "—", "Id del control asociado."]],
    accessibility: ["Asocia el label al control con htmlFor y el id del campo, o envolviendo el control.", "No sustituyas la etiqueta por el placeholder; el nombre debe persistir."],
    examples: [
      { id: "label-input", title: "Etiqueta y control vinculados", description: "htmlFor conecta el label con el input.", code: '<Label htmlFor="name">Nombre completo</Label>\n<Input id="name" placeholder="Tu nombre" />' },
    ],
  },
  {
    name: "empty", title: "Empty", registryPath: "ui/empty.tsx",
    description: "Ausencia de datos, contexto y siguiente acción cuando corresponda.",
    usage: 'import { Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyActions } from "@/components/ui/empty"\n\n<Empty>\n  <EmptyTitle>Sin proyectos</EmptyTitle>\n  <EmptyDescription>Crea el primero.</EmptyDescription>\n  <EmptyActions>\n    <Button>Crear</Button>\n  </EmptyActions>\n</Empty>',
    properties: [["Empty", "div", "—", "Contenedor centrado con borde punteado."], ["EmptyMedia", "div", "—", "Icono o medio del estado."], ["EmptyTitle", "h3", "—", "Título breve del estado."], ["EmptyDescription", "p", "—", "Explicación y contexto."], ["EmptyActions", "div", "—", "Acciones sugeridas."]],
    accessibility: ["Diferencia \"cero resultados\" de \"sin información\"; el texto debe dejarlo claro.", "Ofrece la siguiente acción cuando exista; no dejes al usuario sin salida."],
    states: [["Cero resultados", "El texto aclara que una búsqueda o filtro no arrojó datos."], ["Sin información", "El texto indica que aún no hay contenido creado."], ["Con acción", "EmptyActions ofrece el siguiente paso cuando existe."]],
    examples: [
      { id: "empty-basic", title: "Estado vacío con acción", description: "Contexto y siguiente paso para el usuario.", code: '<Empty>\n  <EmptyMedia>◍</EmptyMedia>\n  <EmptyTitle>Sin proyectos todavía</EmptyTitle>\n  <EmptyDescription>Crea tu primer proyecto para empezar.</EmptyDescription>\n  <EmptyActions>\n    <Button>Crear proyecto</Button>\n  </EmptyActions>\n</Empty>' },
    ],
  },
  {
    name: "alert", title: "Alert", registryPath: "ui/alert.tsx",
    description: "Mensajes contextuales con jerarquía, icono y acciones opcionales.",
    usage: 'import { Alert, AlertContent, AlertTitle, AlertDescription } from "@/components/ui/alert"\n\n<Alert variant="success">\n  <AlertContent>\n    <AlertTitle>Guardado</AlertTitle>\n    <AlertDescription>Tus cambios se aplicaron.</AlertDescription>\n  </AlertContent>\n</Alert>',
    properties: [["variant", '"default" | "success" | "warning" | "info" | "destructive"', '"default"', "Intención y color semántico."]],
    accessibility: ["Todo estado se entiende por texto, no solo por color: usa AlertTitle y AlertDescription.", "role=\"alert\" anuncia mensajes que aparecen dinámicamente; para contenido estático valora quitar el rol."],
    states: [["Variante", "default, success, warning, info y destructive con superficie suave."], ["Estático", "Mensaje presente en la página; valora quitar el rol."], ["Dinámico", "role=\"alert\" anuncia el mensaje cuando aparece."]],
    examples: [
      { id: "alert-variants", title: "Intenciones semánticas", description: "Éxito, advertencia y error con superficies suaves.", code: '<Alert variant="success"><AlertContent><AlertTitle>Cambios guardados</AlertTitle><AlertDescription>Tu configuración se actualizó.</AlertDescription></AlertContent></Alert>\n<Alert variant="warning"><AlertContent><AlertTitle>Espacio casi lleno</AlertTitle><AlertDescription>Usas el 90% del almacenamiento.</AlertDescription></AlertContent></Alert>\n<Alert variant="destructive"><AlertContent><AlertTitle>No se pudo publicar</AlertTitle><AlertDescription>Revisa tu conexión.</AlertDescription></AlertContent></Alert>' },
      { id: "alert-composed", title: "Con icono", description: "Un indicador refuerza el mensaje sin depender del color.", code: '<Alert variant="info">\n  <span aria-hidden="true">ⓘ</span>\n  <AlertContent>\n    <AlertTitle>Nueva versión disponible</AlertTitle>\n    <AlertDescription>Actualiza para las últimas mejoras.</AlertDescription>\n  </AlertContent>\n</Alert>' },
    ],
  },
  {
    name: "page-header", title: "PageHeader", registryPath: "components/page-header.tsx",
    description: "Título, descripción y acciones de una vista, con adaptación responsive.",
    usage: 'import { PageHeader, PageHeaderContent, PageHeaderHeading, PageHeaderDescription, PageHeaderActions } from "@/components/page-header"\n\n<PageHeader>\n  <PageHeaderContent>\n    <PageHeaderHeading>Proyectos</PageHeaderHeading>\n    <PageHeaderDescription>Gestiona tu trabajo.</PageHeaderDescription>\n  </PageHeaderContent>\n  <PageHeaderActions>\n    <Button>Nuevo</Button>\n  </PageHeaderActions>\n</PageHeader>',
    properties: [["PageHeader", "div", "—", "Fila responsive de contenido y acciones."], ["PageHeaderContent", "div", "—", "Agrupa título y descripción."], ["PageHeaderHeading", "h1", "—", "Título de la página."], ["PageHeaderDescription", "p", "—", "Descripción de apoyo."], ["PageHeaderActions", "div", "—", "Acciones alineadas a la derecha."]],
    accessibility: ["Usa PageHeaderHeading como el h1 de la vista; mantén un solo encabezado de nivel 1 por página.", "En pantallas estrechas las acciones se apilan bajo el título sin alterar el orden de lectura."],
    examples: [
      { id: "page-header-basic", title: "Encabezado de vista", description: "Título, descripción y acciones que se adaptan al ancho.", code: '<PageHeader>\n  <PageHeaderContent>\n    <PageHeaderHeading>Proyectos</PageHeaderHeading>\n    <PageHeaderDescription>Gestiona y organiza tu trabajo.</PageHeaderDescription>\n  </PageHeaderContent>\n  <PageHeaderActions>\n    <Button variant="outline">Importar</Button>\n    <Button>Nuevo proyecto</Button>\n  </PageHeaderActions>\n</PageHeader>' },
    ],
  },
  {
    name: "form-section", title: "FormSection", registryPath: "components/form-section.tsx",
    description: "Grupos semánticos de formulario con leyenda, descripción y espaciado común.",
    usage: 'import { FormSection, FormSectionHeader, FormSectionTitle, FormSectionDescription, FormSectionContent } from "@/components/form-section"\n\n<FormSection>\n  <FormSectionHeader>\n    <FormSectionTitle>Perfil</FormSectionTitle>\n    <FormSectionDescription>Información pública.</FormSectionDescription>\n  </FormSectionHeader>\n  <FormSectionContent>\n    {campos}\n  </FormSectionContent>\n</FormSection>',
    properties: [["FormSection", "fieldset", "—", "Agrupa un conjunto de campos relacionados."], ["FormSectionHeader", "div", "—", "Contiene leyenda y descripción."], ["FormSectionTitle", "legend", "—", "Leyenda accesible del grupo."], ["FormSectionDescription", "p", "—", "Explicación del grupo."], ["FormSectionContent", "div", "—", "Campos con espaciado consistente."]],
    accessibility: ["Usa fieldset y legend para asociar el grupo con sus campos ante lectores de pantalla.", "La proximidad expresa relación: los campos del grupo están más cerca entre sí que del siguiente grupo."],
    examples: [
      { id: "form-section-basic", title: "Grupo de campos", description: "Leyenda, descripción y campos con ritmo común.", code: '<FormSection>\n  <FormSectionHeader>\n    <FormSectionTitle>Perfil</FormSectionTitle>\n    <FormSectionDescription>Cómo te ven los demás.</FormSectionDescription>\n  </FormSectionHeader>\n  <FormSectionContent>\n    <Field name="name"><FieldLabel>Nombre</FieldLabel><FieldControl /></Field>\n    <Field name="bio"><FieldLabel>Bio</FieldLabel><FieldControl /></Field>\n  </FormSectionContent>\n</FormSection>' },
    ],
  },
  {
    name: "status-badge", title: "StatusBadge", registryPath: "components/status-badge.tsx",
    description: "Estado semántico con texto, indicador opcional y variante visual coherente.",
    usage: 'import { StatusBadge } from "@/components/status-badge"\n\n<StatusBadge status="success">Activo</StatusBadge>\n<StatusBadge status="warning">Pendiente</StatusBadge>',
    properties: [["status", '"neutral" | "success" | "warning" | "info" | "error"', '"neutral"', "Intención semántica del estado."], ["indicator", "boolean", "true", "Muestra un punto de color antes del texto."]],
    accessibility: ["El texto comunica el estado; el color y el punto solo lo refuerzan.", "Compón sobre Badge: hereda su contraste y tipografía compacta."],
    states: [["Estado", "neutral, success, warning, info y error con superficie suave."], ["Con indicador", "indicator añade un punto de color antes del texto."], ["Sin indicador", "indicator={false} deja solo texto y superficie."]],
    examples: [
      { id: "status-badge-states", title: "Estados semánticos", description: "Superficie suave y punto indicador por estado.", code: '<StatusBadge status="success">Activo</StatusBadge>\n<StatusBadge status="warning">Pendiente</StatusBadge>\n<StatusBadge status="error">Fallido</StatusBadge>\n<StatusBadge status="neutral" indicator={false}>Borrador</StatusBadge>' },
    ],
  },
  {
    name: "password-input", title: "PasswordInput", registryPath: "components/password-input.tsx",
    description: "Entrada de contraseña con mostrar/ocultar sin perder el foco.",
    usage: 'import { PasswordInput } from "@/components/password-input"\n\n<PasswordInput autoComplete="current-password" />',
    properties: [["...InputProps", "—", "—", "Acepta todas las props de Input, incluida value/defaultValue."], ["autoComplete", "string", "—", "Sugerido: current-password o new-password."]],
    accessibility: ["El botón alterna aria-pressed y su aria-label describe la acción (mostrar/ocultar).", "Mostrar la contraseña no mueve el foco fuera del campo; el valor y el cursor se conservan."],
    states: [["Oculta", "El valor se muestra enmascarado por defecto."], ["Visible", "El botón alterna la visibilidad (aria-pressed)."], ["Foco conservado", "Alternar no mueve el foco ni el cursor del campo."], ["Hereda de Input", "Reposo, foco, inválido y deshabilitado como en Input."]],
    examples: [
      { id: "password-input-basic", title: "Mostrar u ocultar", description: "El botón revela la contraseña sin perder el contexto.", code: '<label>Contraseña\n  <PasswordInput autoComplete="current-password" placeholder="••••••••" />\n</label>' },
    ],
  },
  {
    name: "search-input", title: "SearchInput", registryPath: "components/search-input.tsx",
    description: "Búsqueda con icono, limpiar y estado de carga; sin red incorporada.",
    usage: 'import { SearchInput } from "@/components/search-input"\n\n<SearchInput value={query} onValueChange={setQuery} onClear={() => setQuery("")} loading={pending} />',
    properties: [["loading", "boolean", "false", "Muestra un spinner en lugar del botón limpiar."], ["onClear", "() => void", "—", "Se invoca al pulsar el botón limpiar."], ["...InputProps", "—", "—", "Acepta value, onValueChange y demás props de Input."]],
    accessibility: ["El botón limpiar tiene aria-label; aparece solo cuando hay texto y hay onClear.", "El estado de carga usa un Spinner con role=\"status\"; no bloquea la escritura."],
    states: [["Vacío", "Solo el icono de búsqueda; sin botón limpiar."], ["Con texto", "Aparece el botón limpiar (con aria-label) si hay onClear."], ["Cargando", "loading sustituye el limpiar por un Spinner sin bloquear la escritura."]],
    examples: [
      { id: "search-input-basic", title: "Buscar y limpiar", description: "Icono, limpiar contextual y carga; la búsqueda la controla tu app.", code: 'const [query, setQuery] = useState("")\n\n<SearchInput\n  value={query}\n  onValueChange={setQuery}\n  onClear={() => setQuery("")}\n  placeholder="Buscar proyectos…"\n/>' },
    ],
  },
  {
    name: "copy-button", title: "CopyButton", registryPath: "components/copy-button.tsx",
    description: "Copiar al portapapeles con confirmación y manejo de error; nombre accesible estable.",
    usage: 'import { CopyButton } from "@/components/copy-button"\n\n<CopyButton value="npx zunoui@latest init">Copiar comando</CopyButton>',
    properties: [["value", "string", "—", "Texto que se copia al portapapeles."], ["label", "string", '"Copiar"', "Nombre accesible estable del botón."], ["...ButtonProps", "—", "—", "Acepta variant, size y demás props de Button."]],
    accessibility: ["El aria-label permanece estable; el resultado se anuncia con un texto role=\"status\".", "El icono cambia a confirmación o error, pero el estado también se comunica por texto."],
    states: [["Reposo", "Botón con su aria-label estable."], ["Copiado", "Confirma con icono y un texto role=\"status\"; revierte tras unos segundos."], ["Error", "Si el portapapeles falla, lo indica por icono y texto."]],
    examples: [
      { id: "copy-button-basic", title: "Copiar con confirmación", description: "Confirma al copiar y revierte tras unos segundos.", code: '<CopyButton value="npx zunoui@latest init">Copiar comando</CopyButton>' },
    ],
  },
  {
    name: "checkbox", title: "Checkbox", registryPath: "ui/checkbox.tsx", reference: "checkbox",
    description: "Selección y estado intermedio reconocibles, también sin color.",
    usage: 'import { Checkbox } from "@/components/ui/checkbox"\nimport { Label } from "@/components/ui/label"\n\n<div className="flex items-center gap-2">\n  <Checkbox id="terms" defaultChecked />\n  <Label htmlFor="terms">Aceptar términos</Label>\n</div>',
    properties: [["checked / defaultChecked", "boolean", "—", "Estado controlado o inicial."], ["onCheckedChange", "(checked: boolean) => void", "—", "Se invoca al cambiar el estado."], ["indeterminate", "boolean", "false", "Muestra el estado intermedio."], ["disabled", "boolean", "false", "Deshabilita el control."]],
    accessibility: ["Asocia una etiqueta con htmlFor y el id del checkbox; el estado no depende solo del color.", "El estado intermedio muestra un guion además del color; se navega y acciona por teclado (Espacio)."],
    states: [["Reposo", "Casilla vacía con borde identificable."], ["Marcado", "checked muestra el check, no solo color."], ["Intermedio", "indeterminate muestra un guion además del color."], ["Foco visible", "Contorno de 2 px en ring con teclado."], ["Deshabilitado", "disabled quita interacción y foco."]],
    examples: [
      { id: "checkbox-states", title: "Marcado, intermedio y deshabilitado", description: "Estados reconocibles con icono, no solo por color.", code: '<div className="flex items-center gap-2"><Checkbox id="a" defaultChecked /><Label htmlFor="a">Aceptar términos</Label></div>\n<div className="flex items-center gap-2"><Checkbox id="b" /><Label htmlFor="b">Recibir novedades</Label></div>\n<div className="flex items-center gap-2"><Checkbox id="c" indeterminate /><Label htmlFor="c">Selección parcial</Label></div>\n<div className="flex items-center gap-2"><Checkbox id="d" disabled /><Label htmlFor="d">No disponible</Label></div>' },
    ],
  },
  {
    name: "switch", title: "Switch", registryPath: "ui/switch.tsx", reference: "switch",
    description: "Estado on/off claro y label asociado; no sustituye a checkbox indiscriminadamente.",
    usage: 'import { Switch } from "@/components/ui/switch"\nimport { Label } from "@/components/ui/label"\n\n<div className="flex items-center gap-3">\n  <Switch id="notify" defaultChecked />\n  <Label htmlFor="notify">Notificaciones</Label>\n</div>',
    properties: [["checked / defaultChecked", "boolean", "—", "Estado controlado o inicial."], ["onCheckedChange", "(checked: boolean) => void", "—", "Se invoca al cambiar el estado."], ["disabled", "boolean", "false", "Deshabilita el control."]],
    accessibility: ["Usa Switch para activar o desactivar de inmediato; para opciones que se confirman al enviar un formulario, prefiere Checkbox.", "Asócialo a una etiqueta; la posición del pulgar y el color comunican el estado."],
    states: [["Apagado", "Pulgar a la izquierda sobre superficie neutra."], ["Encendido", "checked desplaza el pulgar y cambia la superficie."], ["Foco visible", "Contorno de 2 px en ring con teclado."], ["Deshabilitado", "disabled quita interacción y foco."]],
    examples: [
      { id: "switch-states", title: "Encendido, apagado y deshabilitado", description: "El pulgar y la superficie comunican el estado.", code: '<div className="flex items-center gap-3"><Switch id="a" defaultChecked /><Label htmlFor="a">Notificaciones</Label></div>\n<div className="flex items-center gap-3"><Switch id="b" /><Label htmlFor="b">Modo compacto</Label></div>\n<div className="flex items-center gap-3"><Switch id="c" disabled /><Label htmlFor="c">Sincronización</Label></div>' },
    ],
  },
  {
    name: "tabs", title: "Tabs", registryPath: "ui/tabs.tsx", reference: "tabs",
    description: "Secciones con selección y foco diferenciados.",
    usage: 'import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs"\n\n<Tabs defaultValue="cuenta">\n  <TabsList>\n    <TabsTab value="cuenta">Cuenta</TabsTab>\n    <TabsTab value="seguridad">Seguridad</TabsTab>\n  </TabsList>\n  <TabsPanel value="cuenta">…</TabsPanel>\n  <TabsPanel value="seguridad">…</TabsPanel>\n</Tabs>',
    properties: [["variant", '"segmented" | "underline" | "ghost" | "solid"', '"segmented"', "Estilo visual del grupo de pestañas; solid rellena la activa con el color de marca."], ["shape", '"rounded" | "pill"', '"rounded"', "pill redondea del todo el contenedor y la píldora; en underline engrosa la barra."], ["indicatorPosition", '"bottom" | "top"', '"bottom"', "Lado del indicador en la variante underline."], ["Tabs", "div", "—", "Raíz; acepta defaultValue, value y onValueChange."], ["TabsList", "div", "—", "Contenedor de las pestañas."], ["TabsTab", "button", "—", "Pestaña; requiere value."], ["TabsPanel", "div", "—", "Contenido; requiere un value coincidente."]],
    accessibility: ["Las flechas mueven el foco entre pestañas y Enter o Espacio la activan; el panel es enfocable.", "La pestaña activa se distingue por fondo o subrayado y contraste, no solo por color."],
    states: [["Pestaña inactiva", "Texto atenuado sin superficie destacada."], ["Seleccionada", "Fondo o subrayado y contraste, no solo color."], ["Foco visible", "Contorno de teclado en la pestaña; las flechas mueven el foco."], ["Panel activo", "El panel es enfocable para continuar la navegación."], ["Deshabilitada", "Una pestaña deshabilitada se omite en el recorrido."]],
    examples: [
      { id: "tabs-basic", title: "Segmentadas (por defecto)", description: "Grupo compacto sobre una superficie suave.", code: '<Tabs defaultValue="cuenta">\n  <TabsList aria-label="Configuración">\n    <TabsTab value="cuenta">Cuenta</TabsTab>\n    <TabsTab value="seguridad">Seguridad</TabsTab>\n    <TabsTab value="notificaciones">Notificaciones</TabsTab>\n  </TabsList>\n  <TabsPanel value="cuenta">Datos de tu cuenta.</TabsPanel>\n  <TabsPanel value="seguridad">Contraseña y sesiones.</TabsPanel>\n  <TabsPanel value="notificaciones">Preferencias de aviso.</TabsPanel>\n</Tabs>' },
      { id: "tabs-underline", title: "Subrayadas", description: "Estilo limpio de documentación: indicador inferior en la activa.", code: '<Tabs variant="underline" defaultValue="general">\n  <TabsList aria-label="Ajustes">\n    <TabsTab value="general">General</TabsTab>\n    <TabsTab value="miembros">Miembros</TabsTab>\n    <TabsTab value="facturacion">Facturación</TabsTab>\n  </TabsList>\n  <TabsPanel value="general">Preferencias generales.</TabsPanel>\n  <TabsPanel value="miembros">Gestiona el equipo.</TabsPanel>\n  <TabsPanel value="facturacion">Plan y pagos.</TabsPanel>\n</Tabs>' },
      { id: "tabs-ghost", title: "Ligeras (ghost)", description: "Sin superficie de fondo; la activa se resalta al mínimo.", code: '<Tabs variant="ghost" defaultValue="dia">\n  <TabsList aria-label="Rango">\n    <TabsTab value="dia">Día</TabsTab>\n    <TabsTab value="semana">Semana</TabsTab>\n    <TabsTab value="mes">Mes</TabsTab>\n  </TabsList>\n  <TabsPanel value="dia">Vista diaria.</TabsPanel>\n  <TabsPanel value="semana">Vista semanal.</TabsPanel>\n  <TabsPanel value="mes">Vista mensual.</TabsPanel>\n</Tabs>' },
      { id: "tabs-solid", title: "Rellenas (solid)", description: "La pestaña activa se rellena con el color de marca y texto de contraste.", code: '<Tabs variant="solid" defaultValue="recientes">\n  <TabsList aria-label="Filtro">\n    <TabsTab value="recientes">Recientes</TabsTab>\n    <TabsTab value="pendientes">Pendientes</TabsTab>\n    <TabsTab value="completadas">Completadas</TabsTab>\n  </TabsList>\n  <TabsPanel value="recientes">Actividad reciente.</TabsPanel>\n  <TabsPanel value="pendientes">Tareas por hacer.</TabsPanel>\n  <TabsPanel value="completadas">Trabajo terminado.</TabsPanel>\n</Tabs>' },
      { id: "tabs-icons", title: "Con iconos", description: "Compón un Icon antes del texto; usa gap para separarlo. El icono es decorativo (el texto ya nombra la pestaña).", code: 'import { CircleCheck, Bell, TriangleAlert } from "lucide-react"\nimport { Icon } from "@/components/ui/icon"\n\n<Tabs variant="underline" defaultValue="resumen">\n  <TabsList aria-label="Panel">\n    <TabsTab value="resumen" className="gap-2"><Icon icon={CircleCheck} /> Resumen</TabsTab>\n    <TabsTab value="actividad" className="gap-2"><Icon icon={Bell} /> Actividad</TabsTab>\n    <TabsTab value="alertas" className="gap-2"><Icon icon={TriangleAlert} /> Alertas</TabsTab>\n  </TabsList>\n  <TabsPanel value="resumen">Vista general.</TabsPanel>\n  <TabsPanel value="actividad">Eventos recientes.</TabsPanel>\n  <TabsPanel value="alertas">Avisos pendientes.</TabsPanel>\n</Tabs>' },
      { id: "tabs-pill", title: "Forma píldora (pill)", description: "shape=\"pill\" redondea del todo el contenedor y la píldora activa.", code: '<Tabs variant="solid" shape="pill" defaultValue="recientes">\n  <TabsList aria-label="Filtro">\n    <TabsTab value="recientes">Recientes</TabsTab>\n    <TabsTab value="pendientes">Pendientes</TabsTab>\n    <TabsTab value="completadas">Completadas</TabsTab>\n  </TabsList>\n  <TabsPanel value="recientes">Actividad reciente.</TabsPanel>\n  <TabsPanel value="pendientes">Tareas por hacer.</TabsPanel>\n  <TabsPanel value="completadas">Trabajo terminado.</TabsPanel>\n</Tabs>' },
      { id: "tabs-underline-top", title: "Indicador arriba", description: "indicatorPosition=\"top\" mueve la barra al borde superior de la activa.", code: '<Tabs variant="underline" indicatorPosition="top" defaultValue="general">\n  <TabsList aria-label="Ajustes">\n    <TabsTab value="general">General</TabsTab>\n    <TabsTab value="miembros">Miembros</TabsTab>\n    <TabsTab value="facturacion">Facturación</TabsTab>\n  </TabsList>\n  <TabsPanel value="general">Preferencias generales.</TabsPanel>\n  <TabsPanel value="miembros">Gestiona el equipo.</TabsPanel>\n  <TabsPanel value="facturacion">Plan y pagos.</TabsPanel>\n</Tabs>' },
      { id: "tabs-underline-pill", title: "Barra gruesa", description: "En underline, shape=\"pill\" engrosa la barra a una lozenge redondeada.", code: '<Tabs variant="underline" shape="pill" defaultValue="dia">\n  <TabsList aria-label="Rango">\n    <TabsTab value="dia">Día</TabsTab>\n    <TabsTab value="semana">Semana</TabsTab>\n    <TabsTab value="mes">Mes</TabsTab>\n  </TabsList>\n  <TabsPanel value="dia">Vista diaria.</TabsPanel>\n  <TabsPanel value="semana">Vista semanal.</TabsPanel>\n  <TabsPanel value="mes">Vista mensual.</TabsPanel>\n</Tabs>' },
    ],
  },
  {
    name: "avatar", title: "Avatar", registryPath: "ui/avatar.tsx", reference: "avatar",
    description: "Imagen de usuario con fallback por iniciales cuando no carga.",
    usage: 'import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"\n\n<Avatar>\n  <AvatarImage src="/ana.jpg" alt="Ana Ruiz" />\n  <AvatarFallback>AR</AvatarFallback>\n</Avatar>',
    properties: [["Avatar", "span", "—", "Contenedor redondo; controla su medida con la prop size."], ["size", '"sm" | "default" | "lg"', '"default"', "Tamaño del avatar: 32, 40 o 48 px, con la fuente del fallback a escala."], ["AvatarImage", "img", "—", "Imagen; se funde al cargar y se oculta si falla."], ["AvatarFallback", "span", "—", "Contenido alternativo (iniciales o icono)."]],
    accessibility: ["Da a AvatarImage un alt descriptivo con el nombre de la persona.", "El fallback aparece mientras la imagen carga o si falla; usa iniciales o un icono, no solo color."],
    states: [["Cargando", "Muestra el fallback mientras la imagen carga."], ["Cargada", "La imagen se funde al cargar y cubre el contenedor."], ["Fallback", "Si la imagen falla, quedan las iniciales o un icono."]],
    examples: [
      { id: "avatar-fallback", title: "Imagen con fallback", description: "Si la imagen no carga, se muestran las iniciales.", code: '<Avatar>\n  <AvatarImage src="/ana.jpg" alt="Ana Ruiz" />\n  <AvatarFallback>AR</AvatarFallback>\n</Avatar>\n<Avatar>\n  <AvatarImage src="/roto.jpg" alt="Luis Mora" />\n  <AvatarFallback>LM</AvatarFallback>\n</Avatar>' },
      { id: "avatar-sizes", title: "Tamaños", description: "Tres medidas: sm (32 px), default (40 px) y lg (48 px). La fuente del fallback escala con el avatar.", code: '<Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>\n<Avatar><AvatarFallback>MD</AvatarFallback></Avatar>\n<Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>' },
      { id: "avatar-group", title: "Grupo apilado", description: "Composición de varios avatares con solape.", code: '<div className="flex -space-x-2">\n  <Avatar className="ring-2 ring-background"><AvatarFallback>AR</AvatarFallback></Avatar>\n  <Avatar className="ring-2 ring-background"><AvatarFallback>LM</AvatarFallback></Avatar>\n  <Avatar className="ring-2 ring-background"><AvatarFallback>+3</AvatarFallback></Avatar>\n</div>' },
    ],
  },
  {
    name: "tooltip", title: "Tooltip", registryPath: "ui/tooltip.tsx", reference: "tooltip",
    description: "Descripción breve al enfocar o pasar el puntero; renderiza en un portal con el tema correcto.",
    usage: 'import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"\n\n<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger render={<Button variant="outline">Guardar</Button>} />\n    <TooltipContent>Guarda los cambios (⌘S)</TooltipContent>\n  </Tooltip>\n</TooltipProvider>',
    properties: [["TooltipProvider", "—", "—", "Comparte el tiempo de apertura entre tooltips; envuélvelo una vez."], ["Tooltip", "—", "—", "Raíz; acepta open, defaultOpen y onOpenChange."], ["TooltipTrigger", "button", "—", "Elemento que dispara el tooltip; usa render para reutilizar un control."], ["TooltipContent", "div", "—", "Contenido en portal; sideOffset ajusta la distancia."]],
    accessibility: ["El tooltip complementa, no sustituye, una etiqueta accesible del control. No pongas en él acciones ni información esencial.", "Aparece con foco de teclado y con el puntero; se cierra con Escape. Un control deshabilitado no recibe foco, así que envuélvelo si necesitas explicar por qué lo está."],
    states: [["Oculto", "Sin contenido visible; sin coste hasta abrir."], ["Visible por foco", "Aparece al enfocar el disparador con teclado."], ["Visible por puntero", "Aparece al pasar el puntero tras el retardo compartido."], ["Cierre", "Escape o salir del disparador lo oculta."]],
    examples: [
      { id: "tooltip-basic", title: "Ayuda contextual", description: "Se muestra al enfocar con teclado o pasar el puntero.", code: '<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger render={<Button variant="outline">Guardar</Button>} />\n    <TooltipContent>Guarda los cambios (⌘S)</TooltipContent>\n  </Tooltip>\n</TooltipProvider>' },
      { id: "tooltip-states", title: "En controles con distintos estados", description: "Tooltip sobre un control activo y sobre uno deshabilitado (envuelto para recibir foco).", code: '<TooltipProvider>\n  <div className="flex gap-3">\n    <Tooltip>\n      <TooltipTrigger render={<Button>Publicar</Button>} />\n      <TooltipContent>Publica el proyecto ahora</TooltipContent>\n    </Tooltip>\n    <Tooltip>\n      <TooltipTrigger render={<span tabIndex={0} />}>\n        <Button disabled>Publicar</Button>\n      </TooltipTrigger>\n      <TooltipContent>Completa los campos requeridos primero</TooltipContent>\n    </Tooltip>\n  </div>\n</TooltipProvider>' },
    ],
  },
  {
    name: "dialog", title: "Dialog", registryPath: "ui/dialog.tsx", reference: "dialog",
    description: "Ventana modal con foco atrapado, cierre por Escape y fondo; renderiza en un portal.",
    usage: 'import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"\n\n<Dialog>\n  <DialogTrigger render={<Button>Editar perfil</Button>} />\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Editar perfil</DialogTitle>\n      <DialogDescription>Actualiza tus datos.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <DialogClose render={<Button variant="outline">Cancelar</Button>} />\n      <DialogClose render={<Button>Guardar</Button>} />\n    </DialogFooter>\n  </DialogContent>\n</Dialog>',
    properties: [["Dialog", "—", "—", "Raíz; acepta open, defaultOpen y onOpenChange."], ["dismissible", "boolean", "true", "Si es false, el clic en el fondo y Escape no cierran: solo la X o un DialogClose."], ["DialogTrigger", "button", "—", "Abre el diálogo; usa render para reutilizar un Button."], ["DialogContent", "div", "—", "Fondo y panel en portal; atrapa el foco. Incluye un botón de cerrar en la esquina."], ["size", '"sm" | "default" | "lg"', '"default"', "Ancho máximo del panel: 384, 512 o 672 px."], ["showClose", "boolean", "true", "Muestra la X de cerrar en la esquina; ponlo en false si el pie es la única salida."], ["DialogTitle", "h2", "—", "Título accesible del diálogo (aria-labelledby)."], ["DialogDescription", "p", "—", "Descripción asociada (aria-describedby)."], ["DialogClose", "button", "—", "Cierra el diálogo."]],
    accessibility: ["Incluye siempre un DialogTitle: nombra el diálogo para lectores de pantalla. Usa DialogDescription para el contexto.", "El foco entra al abrir, queda atrapado dentro y vuelve al disparador al cerrar. Escape y clic en el fondo cierran; el panel usa tokens de tema, así que conserva Light/Dark dentro del portal."],
    states: [["Cerrado", "Solo el disparador; el contenido no se monta de más."], ["Abierto", "Fondo y panel en portal; el foco entra y queda atrapado."], ["Cierre", "Escape o clic en el fondo cierran y devuelven el foco (si dismissible)."], ["No descartable", "dismissible={false} exige una acción explícita del pie."]],
    examples: [
      { id: "dialog-basic", title: "Diálogo modal", description: "Título, descripción y acciones; el foco vuelve al disparador al cerrar.", code: '<Dialog>\n  <DialogTrigger render={<Button>Editar perfil</Button>} />\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Editar perfil</DialogTitle>\n      <DialogDescription>Cambia tu nombre visible. Se guarda al confirmar.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <DialogClose render={<Button variant="outline">Cancelar</Button>} />\n      <DialogClose render={<Button>Guardar cambios</Button>} />\n    </DialogFooter>\n  </DialogContent>\n</Dialog>' },
      { id: "dialog-select", title: "Con un Select dentro", description: "Composición obligatoria: el popup del Select se abre correctamente dentro del diálogo y en el tema activo.", code: '<Dialog>\n  <DialogTrigger render={<Button>Mover proyecto</Button>} />\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Mover proyecto</DialogTitle>\n      <DialogDescription>Elige el espacio de destino.</DialogDescription>\n    </DialogHeader>\n    <Select defaultValue="acme">\n      <SelectTrigger><SelectValue /></SelectTrigger>\n      <SelectContent>\n        <SelectItem value="acme">Acme Studio</SelectItem>\n        <SelectItem value="labs">Labs</SelectItem>\n        <SelectItem value="personal">Personal</SelectItem>\n      </SelectContent>\n    </Select>\n    <DialogFooter>\n      <DialogClose render={<Button variant="outline">Cancelar</Button>} />\n      <DialogClose render={<Button>Mover</Button>} />\n    </DialogFooter>\n  </DialogContent>\n</Dialog>' },
      { id: "dialog-lg", title: "Tamaño grande y título largo", description: 'size="lg" ensancha el panel; un título largo envuelve sin pasar por debajo de la X.', code: '<Dialog>\n  <DialogTrigger render={<Button variant="outline">Ver términos</Button>} />\n  <DialogContent size="lg">\n    <DialogHeader>\n      <DialogTitle>Términos del servicio y política de privacidad de la plataforma</DialogTitle>\n      <DialogDescription>Un panel más ancho para contenido largo.</DialogDescription>\n    </DialogHeader>\n    <div className="mt-4 max-h-64 overflow-y-auto text-sm text-muted-foreground">\n      <p>Contenido extenso…</p>\n    </div>\n    <DialogFooter>\n      <DialogClose render={<Button variant="outline">Cancelar</Button>} />\n      <DialogClose render={<Button>Aceptar</Button>} />\n    </DialogFooter>\n  </DialogContent>\n</Dialog>' },
      { id: "dialog-persistente", title: "Persistente (no se cierra al hacer clic afuera)", description: 'dismissible={false} evita el cierre por clic fuera y Escape; combínalo con showClose={false} para forzar una acción explícita.', code: '<Dialog dismissible={false}>\n  <DialogTrigger render={<Button variant="outline">Configurar espacio</Button>} />\n  <DialogContent showClose={false}>\n    <DialogHeader>\n      <DialogTitle>Termina la configuración</DialogTitle>\n      <DialogDescription>El clic fuera y Escape no cierran; hay que elegir una acción.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <DialogClose render={<Button variant="outline">Ahora no</Button>} />\n      <DialogClose render={<Button>Continuar</Button>} />\n    </DialogFooter>\n  </DialogContent>\n</Dialog>' },
    ],
  },
  {
    name: "alert-dialog", title: "AlertDialog", registryPath: "ui/alert-dialog.tsx", reference: "alert-dialog",
    description: "Confirmación modal para acciones destructivas; exige una decisión explícita.",
    usage: 'import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogClose } from "@/components/ui/alert-dialog"\n\n<AlertDialog>\n  <AlertDialogTrigger render={<Button variant="destructive">Eliminar</Button>} />\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>¿Eliminar proyecto?</AlertDialogTitle>\n      <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogClose render={<Button variant="outline">Cancelar</Button>} />\n      <AlertDialogClose render={<Button variant="destructive">Eliminar</Button>} />\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>',
    properties: [["AlertDialog", "—", "—", "Raíz modal; no se cierra por clic en el fondo ni Escape."], ["AlertDialogTrigger", "button", "—", "Abre la confirmación."], ["AlertDialogContent", "div", "—", "Fondo y panel en portal; atrapa el foco."], ["AlertDialogTitle", "h2", "—", "Pregunta o título de la confirmación."], ["AlertDialogDescription", "p", "—", "Consecuencia de la acción."], ["AlertDialogClose", "button", "—", "Cierra confirmando o cancelando."]],
    accessibility: ["Úsalo solo para decisiones que interrumpen con motivo (borrar, descartar). A diferencia de Dialog, no se cierra por clic fuera ni Escape: obliga a elegir una acción.", "Nombra la acción de riesgo con claridad en el botón (por ejemplo, «Eliminar»), no solo «Aceptar». El foco queda atrapado y vuelve al disparador al cerrar."],
    states: [["Cerrado", "Solo el disparador visible."], ["Abierto", "Panel modal con foco atrapado; el fondo no cierra."], ["Decisión", "Solo un AlertDialogClose cierra: confirmar o cancelar."]],
    examples: [
      { id: "alert-dialog-basic", title: "Confirmar acción destructiva", description: "Requiere elegir; no se descarta por clic fuera.", code: '<AlertDialog>\n  <AlertDialogTrigger render={<Button variant="destructive">Eliminar proyecto</Button>} />\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>¿Eliminar «Rediseño 2026»?</AlertDialogTitle>\n      <AlertDialogDescription>Se eliminarán sus archivos y miembros. Esta acción no se puede deshacer.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogClose render={<Button variant="outline">Cancelar</Button>} />\n      <AlertDialogClose render={<Button variant="destructive">Eliminar</Button>} />\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>' },
    ],
  },
  {
    name: "dropdown-menu", title: "DropdownMenu", registryPath: "ui/dropdown-menu.tsx", reference: "menu",
    description: "Menú de acciones anclado a un disparador; navegable por teclado y renderizado en un portal.",
    usage: 'import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"\n\n<DropdownMenu>\n  <DropdownMenuTrigger render={<Button variant="outline">Opciones</Button>} />\n  <DropdownMenuContent>\n    <DropdownMenuItem>Editar</DropdownMenuItem>\n    <DropdownMenuItem>Duplicar</DropdownMenuItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem>Eliminar</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>',
    properties: [["DropdownMenu", "—", "—", "Raíz; acepta open, defaultOpen y onOpenChange."], ["DropdownMenuTrigger", "button", "—", "Abre el menú; usa render para reutilizar un Button."], ["DropdownMenuContent", "div", "—", "Popup en portal; side, align y sideOffset ajustan la posición."], ["DropdownMenuItem", "div", "—", "Acción; acepta onClick y disabled."], ["DropdownMenuLabel", "div", "—", "Encabezado de un grupo."], ["DropdownMenuSeparator", "div", "—", "Divide grupos de acciones."]],
    accessibility: ["Se abre con Enter, Espacio o flecha; las flechas mueven el foco entre elementos y Escape cierra devolviendo el foco al disparador.", "El popup usa tokens de tema, así que conserva Light/Dark aunque se abra sobre una fila de tabla u otra superficie. Da a un disparador de solo icono un aria-label."],
    states: [["Cerrado", "Solo el disparador visible."], ["Abierto", "Popup en portal en el tema activo; foco en el primer ítem."], ["Ítem resaltado", "Las flechas y el puntero resaltan el ítem activo."], ["Ítem deshabilitado", "disabled omite el ítem del recorrido."], ["Al cerrar", "Escape cierra y devuelve el foco al disparador."]],
    examples: [
      { id: "dropdown-menu-basic", title: "Menú de acciones", description: "Etiqueta, acciones y separador; navegable por teclado.", code: '<DropdownMenu>\n  <DropdownMenuTrigger render={<Button variant="outline">Opciones</Button>} />\n  <DropdownMenuContent>\n    <DropdownMenuLabel>Proyecto</DropdownMenuLabel>\n    <DropdownMenuItem>Editar</DropdownMenuItem>\n    <DropdownMenuItem>Duplicar</DropdownMenuItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem>Eliminar</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>' },
      { id: "dropdown-menu-table", title: "En una fila de tabla", description: "Composición obligatoria: el menú de la fila se abre en el tema correcto sobre la tabla.", code: '<table className="w-full text-sm">\n  <tbody>\n    {["Rediseño 2026", "App móvil"].map(name => (\n      <tr key={name} className="border-b border-border">\n        <td className="py-2">{name}</td>\n        <td className="py-2 text-right">\n          <DropdownMenu>\n            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={"Acciones de " + name}>⋯</Button>} />\n            <DropdownMenuContent align="end">\n              <DropdownMenuItem>Abrir</DropdownMenuItem>\n              <DropdownMenuItem>Renombrar</DropdownMenuItem>\n              <DropdownMenuSeparator />\n              <DropdownMenuItem>Archivar</DropdownMenuItem>\n            </DropdownMenuContent>\n          </DropdownMenu>\n        </td>\n      </tr>\n    ))}\n  </tbody>\n</table>' },
    ],
  },
  {
    name: "select", title: "Select", registryPath: "ui/select.tsx", reference: "select",
    description: "Selección de una opción con popup en portal, teclado y estados accesibles.",
    usage: 'import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"\n\n<Select defaultValue="acme">\n  <SelectTrigger><SelectValue /></SelectTrigger>\n  <SelectContent>\n    <SelectItem value="acme">Acme Studio</SelectItem>\n    <SelectItem value="labs">Labs</SelectItem>\n  </SelectContent>\n</Select>',
    properties: [["Select", "—", "—", "Raíz; acepta value, defaultValue, onValueChange, name y disabled."], ["SelectTrigger", "button", "—", "Botón que abre el popup y muestra el valor."], ["SelectValue", "span", "—", "Muestra el valor seleccionado o el placeholder."], ["SelectContent", "div", "—", "Popup en portal; side, align y sideOffset ajustan la posición."], ["SelectItem", "div", "—", "Opción; requiere value."]],
    accessibility: ["Asocia una etiqueta al control (dentro de Field con FieldLabel, o una etiqueta nativa). Da a SelectValue un placeholder descriptivo cuando no haya valor.", "Se abre y navega por teclado (flechas, escritura para buscar, Enter para elegir, Escape para cerrar). El popup usa tokens de tema y mantiene la selección al abrirse dentro de un Dialog."],
    states: [["Reposo", "Disparador con placeholder o valor y borde de 1 px."], ["Abierto", "Popup en portal; el disparador queda expandido (aria-expanded)."], ["Opción resaltada", "El teclado o el puntero resaltan la opción bajo foco."], ["Seleccionada", "La opción elegida se marca dentro del popup."], ["Foco visible", "Contorno de 2 px en ring en el disparador."], ["Deshabilitado", "disabled bloquea la apertura."]],
    examples: [
      { id: "select-basic", title: "Selección simple", description: "Valor por defecto, teclado y foco visible.", code: '<Select defaultValue="acme">\n  <SelectTrigger><SelectValue /></SelectTrigger>\n  <SelectContent>\n    <SelectItem value="acme">Acme Studio</SelectItem>\n    <SelectItem value="labs">Labs</SelectItem>\n    <SelectItem value="personal">Personal</SelectItem>\n  </SelectContent>\n</Select>' },
      { id: "select-groups", title: "Opciones agrupadas", description: "Grupos con etiqueta y separador dentro del popup.", code: '<Select defaultValue="react">\n  <SelectTrigger><SelectValue placeholder="Elige un framework" /></SelectTrigger>\n  <SelectContent>\n    <SelectGroup>\n      <SelectGroupLabel>Frontend</SelectGroupLabel>\n      <SelectItem value="react">React</SelectItem>\n      <SelectItem value="vue">Vue</SelectItem>\n    </SelectGroup>\n    <SelectSeparator />\n    <SelectGroup>\n      <SelectGroupLabel>Meta-frameworks</SelectGroupLabel>\n      <SelectItem value="next">Next.js</SelectItem>\n    </SelectGroup>\n  </SelectContent>\n</Select>' },
    ],
  },
  {
    name: "toast", title: "Toast", registryPath: "ui/toast.tsx", reference: "toast",
    description: "Aviso breve no bloqueante que aparece y se descarta; renderiza en un portal.",
    usage: 'import { ToastProvider, Toaster, useToast } from "@/components/ui/toast"\n\n// En la raíz de la app:\n<ToastProvider>\n  {children}\n  <Toaster />\n</ToastProvider>\n\n// En cualquier componente:\nconst toast = useToast()\ntoast.add({ title: "Guardado", description: "Tus cambios se aplicaron." })',
    properties: [["ToastProvider", "—", "—", "Gestiona la cola; envuélvelo una vez. Acepta timeout y limit."], ["Toaster", "div", "—", "Portal y viewport donde se apilan los toasts."], ["useToast()", "hook", "—", "Devuelve add, close, update y promise."], ["add(options)", "—", "—", "title, description, type ('success' | 'warning' | 'info' | 'error'; sin type es neutral), timeout."]],
    accessibility: ["El viewport anuncia los toasts a lectores de pantalla (política de aria-live); usa priority: 'high' solo para avisos urgentes.", "No pongas en un toast la única vía para una acción crítica: es efímero. El botón cerrar tiene aria-label y el estado se comunica por texto, no solo por color."],
    states: [["Entra", "Aparece en el viewport y se anuncia por aria-live."], ["Tipos", "success, warning, info y error colorean el borde; sin type queda neutral."], ["Cierre manual", "El botón cerrar (con aria-label) lo descarta."], ["Descartado", "Se retira solo al cumplirse el timeout."]],
    examples: [
      { id: "toast-basic", title: "Estados: éxito, aviso, info y error", description: "El type colorea el borde izquierdo (success, warning, info, error); sin type queda neutral. Aparece, se puede cerrar y se descarta solo.", code: 'const toast = useToast()\n\n<div className="flex gap-3">\n  <Button onClick={() => toast.add({ title: "Cambios guardados", type: "success" })}>Guardar</Button>\n  <Button variant="outline" onClick={() => toast.add({ title: "Espacio casi lleno", type: "warning" })}>Avisar</Button>\n  <Button variant="outline" onClick={() => toast.add({ title: "Nueva versión disponible", type: "info" })}>Informar</Button>\n  <Button variant="outline" onClick={() => toast.add({ title: "No se pudo publicar", type: "error" })}>Publicar</Button>\n</div>' },
    ],
  },
]

export const componentNames = meta.map(entry => entry.name)
export const metaByName: Record<string, ComponentMeta> = Object.fromEntries(meta.map(entry => [entry.name, entry]))
