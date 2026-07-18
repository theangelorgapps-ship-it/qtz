import { expect, test, type Page } from "@playwright/test";

function collectConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

test("loads the prompt-led Quaotz landing page", async ({ page }) => {
  const errors = collectConsoleErrors(page);
  await page.goto("/");
  await expect(page).toHaveTitle(/Quaotz/);
  await expect(page.getByRole("heading", { name: /Post the service/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Browse services" }).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("discovers a service and submits a bid", async ({ page }) => {
  const errors = collectConsoleErrors(page);
  await page.goto("/app/discover");
  await expect(page.getByRole("heading", { name: "Book a local service by bidding your price." })).toBeVisible();
  await expect(page.getByText("Friday evening office clean, up to 3 hours")).toBeVisible();

  await page.getByText("Friday evening office clean, up to 3 hours").click();
  await expect(page.getByRole("heading", { name: "Friday evening office clean, up to 3 hours" })).toBeVisible();
  await page.getByRole("button", { name: "Place a bid" }).click();
  await page.getByLabel("Tell the Business what you need").fill("Manchester city centre. Access is available from 6pm and our site contact is Priya.");
  await page.getByRole("button", { name: "Review and submit bid" }).click();
  await expect(page.getByRole("heading", { name: "You are in the running" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("switches use cases and business plan billing", async ({ page }) => {
  const errors = collectConsoleErrors(page);
  await page.goto("/");

  await page.getByRole("button", { name: "Show Retail Installers" }).click();
  await expect(page.getByRole("heading", { name: "Retail Installers" })).toBeVisible();

  await page.getByRole("switch", { name: "Switch between yearly and monthly billing" }).click();
  await expect(page.getByText("$29.99", { exact: false })).toBeVisible();

  await page.goto("/protection");
  await expect(page.getByRole("heading", { name: "A longer review window when the job needs one." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Choose before you pay." })).toBeVisible();
  expect(errors).toEqual([]);
});

test("shows mobile marketplace navigation", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Mobile navigation check");
  await page.goto("/app/discover");
  const mobileNav = page.getByRole("navigation", { name: "Mobile app navigation" });
  await expect(mobileNav).toBeVisible();
  await expect(mobileNav.getByText("Discover")).toBeVisible();
  await expect(mobileNav.getByText("Bids")).toBeVisible();
});
