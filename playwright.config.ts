import { defineConfig } from "@playwright/test";

// Puerto propio (3100) para no chocar con `npm run dev` en el 3000.
const PORT = 3100;

export default defineConfig({
  testDir: "./tests",
  timeout: 120_000,
  workers: 1,
  use: {
    baseURL: `http://localhost:${PORT}`,
    // GPU=1 usa la GPU real (D3D11) para medir fps; por defecto, SwiftShader (estable en CI).
    launchOptions: {
      args: process.env.GPU
        ? ["--enable-gpu", "--ignore-gpu-blocklist", "--use-angle=d3d11"]
        : ["--enable-webgl", "--ignore-gpu-blocklist", "--use-angle=swiftshader"],
    },
  },
  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 240_000,
  },
});
