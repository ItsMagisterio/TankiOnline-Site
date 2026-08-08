import path from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const root = import.meta.dirname;
const port = Number(process.env.PORT) || 5173;
const base = process.env.BASE_PATH || "/";

export default defineConfig({
root,
base,

plugins: [
react(),
tailwindcss()
],

resolve: {
alias: {
"@": path.resolve(root, "src"),
"@assets": path.resolve(root, "../../attached_assets")
},
dedupe: ["react", "react-dom"]
},

build: {
outDir: path.resolve(root, "dist/public"),
emptyOutDir: true
},

server: {
host: "127.0.0.1",
port,
strictPort: true,
allowedHosts: [".replit.dev"]
},

preview: {
host: "127.0.0.1",
port,
strictPort: true
}
});
