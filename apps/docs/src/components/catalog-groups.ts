import type { CatalogEntry } from "@zuno/showcase"

// Docs-only navigation grouping. A component missing from this map still shows up, under "Other",
// so adding one to the catalog never hides it from the site.
const groups: [string, string[]][] = [
  ["Actions", ["button", "button-group", "toggle", "toggle-group", "copy-button", "confirm-action"]],
  ["Forms", ["field", "form-section", "label", "input", "input-group", "input-otp", "password-input", "search-input", "textarea", "native-select", "select", "combobox", "checkbox", "radio-group", "switch", "slider", "calendar", "date-picker"]],
  ["Layout", ["container", "stack", "cluster", "responsive-grid", "aspect-ratio", "separator", "scroll-area", "card", "item", "page-header", "section-header", "sidebar", "split-layout", "direction"]],
  ["Navigation", ["breadcrumb", "pagination", "tabs", "navigation-menu", "command", "command-palette", "page-navigation", "stepper", "user-menu", "workspace-switcher"]],
  ["Data display", ["table", "data-toolbar", "bulk-actions-bar", "comparison-table", "timeline", "description-list", "stat-card", "badge", "status-badge", "avatar", "kbd", "typography", "icon", "accordion", "collapsible"]],
  ["Feedback", ["alert", "toast", "progress", "spinner", "skeleton", "empty", "save-indicator", "connection-status"]],
  ["Overlays", ["dialog", "alert-dialog", "drawer", "sheet", "popover", "tooltip", "dropdown-menu"]],
]

export function groupCatalog(entries: CatalogEntry[]) {
  const byName = new Map(entries.map(entry => [entry.name, entry]))
  const result = groups.map(([label, names]) => ({ label, entries: names.flatMap(name => byName.get(name) ?? []).sort((a, b) => a.title.localeCompare(b.title)) }))
  const grouped = new Set(groups.flatMap(([, names]) => names))
  result.push({ label: "Other", entries: entries.filter(entry => !grouped.has(entry.name)) })
  return result.filter(group => group.entries.length > 0)
}
