import { test } from "@playwright/test";

// Video corto de scroll a 375 px y cuadros sueltos para revisar el morph y la legibilidad.
test.use({
  viewport: { width: 375, height: 812 },
  video: { mode: "on", size: { width: 375, height: 812 } },
});

test("scroll a 375px", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(3500);
  const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const pasos = 24;
  for (let i = 0; i <= pasos; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round((total * i) / pasos));
    await page.waitForTimeout(700);
    await page.screenshot({ path: `tests/capturas/scroll-375-${String(i).padStart(2, "0")}.png` });
  }
});
