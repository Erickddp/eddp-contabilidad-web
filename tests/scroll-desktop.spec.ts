import { test } from "@playwright/test";

// Cuadros de scroll a 1440 px (la captura de página completa no sirve con el canvas fijo).
test.use({ viewport: { width: 1440, height: 900 } });

test("scroll a 1440px", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(3500);
  const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const pasos = 16;
  for (let i = 0; i <= pasos; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round((total * i) / pasos));
    await page.waitForTimeout(700);
    await page.screenshot({ path: `tests/capturas/scroll-1440-${String(i).padStart(2, "0")}.png` });
  }
});
