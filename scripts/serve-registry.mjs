import { createServer } from "node:http"
import { readFile } from "node:fs/promises"
createServer(async (req, res) => {
  if (!/^\/r\/[a-z0-9-]+\.json$/.test(req.url ?? "")) { res.writeHead(404).end(); return }
  try {
    const body = await readFile("apps/docs/public" + req.url)
    res.writeHead(200, { "content-type": "application/json" }).end(body)
  } catch { res.writeHead(404).end() }
}).listen(4310, "127.0.0.1", () => console.log("Registry: http://127.0.0.1:4310/r/{name}.json"))
