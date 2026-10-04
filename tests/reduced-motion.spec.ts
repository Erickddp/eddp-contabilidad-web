import { test, expect } from "@playwright/test";

// Con prefers-reduced-motion: balanza estática, contenido visible de inmediato, sin pin.
test.use({ viewport: { width: 375, height: 812 }, reducedMotion: "reduce" });

test("reduced motion a 375px", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1500);
  await expect(page.locator("html")).toHaveAttribute("data-balanza", "estatica");
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.screenshot({ path: "tests/capturas/reduced-375.png" });
  await page.locator("#estrategia").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "tests/capturas/reduced-375-estrategia.png" });
});
