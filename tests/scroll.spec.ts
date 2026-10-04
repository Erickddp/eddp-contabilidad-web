import { test } from "@playwright/test";

// Video corto de scroll a 375 px (continuo, como un dedo) y cuadros sueltos para revisar
// que el morph se vea fluido y que el texto siempre se lea sobre las partículas.
test.use({
  viewport: { width: 375, height: 812 },
  video: { mode: "on", size: { width: 375, height: 812 } },
});

test("scroll a 375px", async ({ page }) => {
  test.setTimeout(240_000);
  await page.goto("/");
  await page.waitForTimeout(3500);
  const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);

  // Scroll continuo: ~60 px por paso.
  let frame = 0;
  for (let y = 0; y <= total; y += 60) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(40);
    if (y % 1200 === 0) {
      await page.waitForTimeout(500);
      await page.screenshot({ path: `tests/capturas/scroll-375-${String(frame++).padStart(2, "0")}.png` });
    }
  }
  await page.waitForTimeout(1000);
  await page.close();
  await page.video()?.saveAs("tests/capturas/scroll-375.webm");
});
