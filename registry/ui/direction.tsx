"use client"

// Base UI components read the reading direction from this context: arrow keys in Tabs, RadioGroup,
// ToggleGroup and Slider, and which side popups open on. It does not set the dir attribute, so set
// dir on <html> (or the same subtree) as well; ZUNO styles use logical properties and follow it.
export { DirectionProvider, useDirection, type TextDirection } from "@base-ui/react/direction-provider"
