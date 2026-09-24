import type { NextConfig } from "next"
const config: NextConfig = { output: "export", images: { unoptimized: true }, transpilePackages: ["@zuno/showcase"] }
export default config
