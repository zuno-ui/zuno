import { useId, type ReactNode } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

export type ComparisonColumn = { key: string; label: ReactNode; description?: ReactNode }
export type ComparisonRow = { label: ReactNode; description?: ReactNode; values: Record<string, ReactNode> }
export type ComparisonGroup = { label: ReactNode; rows: ComparisonRow[] }

type ComparisonTableProps = {
  caption: ReactNode
  columns: ComparisonColumn[]
  rows?: ComparisonRow[]
  groups?: ComparisonGroup[]
  highlight?: string
  dimensionLabel?: ReactNode
  includedLabel?: string
  excludedLabel?: string
  density?: "comfortable" | "compact"
  className?: string
}

// Data in, markup out, so every cell gets the right header: options are column headers, dimensions are
// row headers, and groups are row-group headers. On narrow screens it scrolls with the
// dimension column pinned, instead of squeezing the options into unreadable columns.
export function ComparisonTable({ caption, columns, rows = [], groups, highlight, dimensionLabel = "Feature", includedLabel = "Included", excludedLabel = "Not included", density, className }: ComparisonTableProps) {
  const captionId = useId()
  const sections = groups ?? [{ label: null, rows }]
  const pinned = "sticky start-0 z-10 bg-background"
  const marked = (key: string) => key === highlight && "bg-muted/50"
  function value(content: ReactNode) {
    if (typeof content !== "boolean") return content
    return (
      <>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn("size-4", content ? "text-foreground" : "text-muted-foreground")}><path d={content ? "M3.5 8.5l3 3 6-7" : "M4 8h8"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span className="sr-only">{content ? includedLabel : excludedLabel}</span>
      </>
    )
  }
  return (
    <Table density={density} className={className} containerProps={{ role: "region", "aria-labelledby": captionId, tabIndex: 0 }}>
      <TableCaption id={captionId}>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col" className={cn(pinned, "min-w-40 align-bottom")}>{dimensionLabel}</TableHead>
          {columns.map(column => (
            <TableHead key={column.key} scope="col" className={cn("min-w-28 align-bottom whitespace-normal text-foreground", marked(column.key))}>
              {column.label}
              {column.description && <span className="block text-xs font-normal text-muted-foreground">{column.description}</span>}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      {sections.map((section, index) => (
        <TableBody key={index}>
          {section.label && (
            <TableRow className="hover:bg-transparent">
              <TableHead scope="rowgroup" colSpan={columns.length + 1} className="bg-muted/40 text-xs font-semibold text-foreground"><span className="sticky start-3">{section.label}</span></TableHead>
            </TableRow>
          )}
          {section.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-transparent">
              <TableHead scope="row" className={cn(pinned, "min-w-40 font-normal whitespace-normal text-foreground")}>
                {row.label}
                {row.description && <span className="block text-xs text-muted-foreground">{row.description}</span>}
              </TableHead>
              {columns.map(column => <TableCell key={column.key} className={cn(marked(column.key))}>{value(row.values[column.key])}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      ))}
    </Table>
  )
}
