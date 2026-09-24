import { test } from "node:test"
import assert from "node:assert/strict"
import { execFile } from "node:child_process"
import { promisify } from "node:util"

const exec = promisify(execFile)

test("Button preserves link and native button semantics", async () => {
  const script = `
    import { createElement } from "react"
    import { renderToStaticMarkup } from "react-dom/server"
    import { Button } from "./registry/ui/button"
    const render = (props, label) => renderToStaticMarkup(createElement(Button, props, label))
    console.log(JSON.stringify({
      link: render({ render: createElement("a", { href: "/docs" }) }, "Read docs"),
      disabledLink: render({ render: createElement("a", { href: "/docs" }), disabled: true }, "Read docs"),
      button: render({ type: "submit" }, "Save"),
      customButton: render({ render: createElement("div"), nativeButton: false }, "Act"),
    }))
  `
  const { stdout } = await exec("bun", ["-e", script])
  const { link, disabledLink, button, customButton } = JSON.parse(stdout)
  assert.match(link, /^<a\b/)
  assert.match(link, /href="\/docs"/)
  assert.doesNotMatch(link, /role="button"/)
  assert.match(disabledLink, /aria-disabled="true"/)
  assert.match(disabledLink, /tabindex="-1"/)
  assert.match(button, /^<button\b/)
  assert.match(button, /type="submit"/)
  assert.match(customButton, /^<div\b/)
  assert.match(customButton, /role="button"/)
})
