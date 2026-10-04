import { test } from "@playwright/test";

const anchos = [375, 768, 1440];

for (const width of anchos) {
  test(`captura home a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 800 ? 812 : 900 });
    await page.goto("/");
    // Espera a que termine la secuencia de entrada del hero (≈3.3 s).
    await page.waitForTimeout(3800);
    await page.screenshot({ path: `tests/capturas/home-${width}.png`, fullPage: true });
  });
}
