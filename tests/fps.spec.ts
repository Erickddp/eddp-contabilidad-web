import { test, type Page } from "@playwright/test";

// Mide fps del canvas en régimen estable: espera a que el canvas reporte, deja pasar el
// arranque (compilación de shaders, formas) y luego lee mientras hace scroll.
// Ojo: sin GPU=1, Playwright renderiza WebGL por software (SwiftShader) y el número es pesimista.
// Ver docs/DECISIONES.md.
type W = { __particlesFps?: number };

async function medir(page: Page, paso: number) {
  await page.waitForFunction(() => (window as unknown as W).__particlesFps !== undefined, null, {
    timeout: 90_000,
  });
  await page.waitForTimeout(6000);
  const lecturas: number[] = [];
  for (let i = 1; i <= 5; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * paso);
    await page.waitForTimeout(2200);
    lecturas.push(Math.round((await page.evaluate(() => (window as unknown as W).__particlesFps)) ?? 0));
  }
  return lecturas;
}

test.describe("móvil", () => {
  test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
  test("fps móvil con CPU 4x", async ({ page }) => {
    test.setTimeout(180_000);
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await page.goto("/");
    const l = await medir(page, 500);
    const info = await page.evaluate(() => {
      const gl = document.querySelector("canvas")?.getContext("webgl2");
      const ext = gl?.getExtension("WEBGL_debug_renderer_info");
      return ext && gl ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : "desconocido";
    });
    console.log(`FPS móvil (CPU 4x): ${l.join(", ")} | renderer: ${info}`);
  });
});

test.describe("desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test("fps desktop", async ({ page }) => {
    test.setTimeout(180_000);
    await page.goto("/");
    const l = await medir(page, 700);
    console.log(`FPS desktop: ${l.join(", ")}`);
  });
});
