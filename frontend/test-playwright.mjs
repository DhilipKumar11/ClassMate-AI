import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // listen to console
  page.on("console", msg => console.log("Browser:", msg.text()));
  page.on("pageerror", err => console.log("PageError:", err.message));

  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    return new Promise(resolve => setTimeout(resolve, 2000));
  });

  const content = await page.content();
  if (content.includes("Visual Diagram")) {
    console.log("Found Visual Diagram");
  } else {
    console.log("Did not find Visual Diagram");
  }

  await browser.close();
})();