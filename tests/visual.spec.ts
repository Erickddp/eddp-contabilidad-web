import { test } from "@playwright/test";

// Se revisa primero 375 (mobile-first), luego 768 y 1440.
const vistas = [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
];

for (const v of vistas) {
  test(`captura home a ${v.width}px`, async ({ page }) => {
    await page.setViewportSize(v);
    await page.goto("/");
    // Entrada del hero + convergencia de la balanza.
    await page.waitForTimeout(4000);
    await page.screenshot({ path: `tests/capturas/home-${v.width}.png` });
    await page.screenshot({ path: `tests/capturas/home-${v.width}-completa.png`, fullPage: true });
  });
}
