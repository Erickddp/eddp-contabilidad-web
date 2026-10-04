import { test } from "@playwright/test";

// Mide fps del canvas móvil (4,000 partículas) con CPU 4× más lenta (throttling de Chrome).
// Ojo: Playwright headless renderiza WebGL por software (SwiftShader), así que el número
// es pesimista frente a un teléfono con GPU. Ver docs/DECISIONES.md.
test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

test("fps móvil con CPU 4x", async ({ page }) => {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.goto("/");
  const lecturas: number[] = [];
  for (let i = 0; i < 6; i++) {
    await page.waitForTimeout(2500);
    await page.evaluate((y) => window.scrollTo(0, y), i * 500);
    const fps = await page.evaluate(() => (window as unknown as { __particlesFps?: number }).__particlesFps);
    if (fps) lecturas.push(Math.round(fps));
  }
  const info = await page.evaluate(() => {
    const gl = document.querySelector("canvas")?.getContext("webgl2");
    const ext = gl?.getExtension("WEBGL_debug_renderer_info");
    return ext && gl ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : "desconocido";
  });
  console.log(`FPS (CPU 4x): ${lecturas.join(", ")} | renderer: ${info}`);
});
