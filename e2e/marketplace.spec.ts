import { expect, test } from "@playwright/test";

test.describe("Marketplace discovery", () => {
  test("loads homepage with catalog", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Juega al instante/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Explorar todo/i })).toBeVisible();
  });

  test("filters by category", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: /Categorías/i }).getByRole("button", { name: "carreras" }).click();
    await expect(page).toHaveURL(/category=carreras/);
    await expect(page.getByText(/HexGL/i).first()).toBeVisible();
  });

  test("searches games", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("searchbox", { name: /Buscar juegos y apps/i }).fill("snake");
    await expect(page).toHaveURL(/query=snake/);
    await expect(page.getByText(/Retro Snake/i)).toBeVisible();
  });

  test("shows empty state and clears filters", async ({ page }) => {
    await page.goto("/?query=xyznonexistent");
    await expect(page.getByText(/No encontramos resultados/i)).toBeVisible();
    await page.getByRole("button", { name: /Limpiar filtros/i }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: /Explorar todo/i })).toBeVisible();
  });
});

test.describe("Preview and player", () => {
  test("opens preview via deep link", async ({ page }) => {
    await page.goto("/?app=13");
    const dialog = page.getByRole("dialog", { name: /Vista previa de app/i });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: /Retro Snake/i })).toBeVisible();
  });

  test("plays local demo and adds to recents", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("region", { name: /Explorar todo/i })
      .getByRole("article", { name: /Ver detalles de Retro Snake/i })
      .click();
    await page.getByRole("button", { name: /Jugar ahora/i }).click();
    const player = page.getByRole("dialog", { name: /Reproductor de app/i });
    await expect(player).toBeVisible();
    await expect(player.getByText(/Cargando juego/i)).toBeVisible();
    await page.getByRole("button", { name: /Cerrar reproductor/i }).click();
    await expect(page.getByRole("heading", { name: /Jugados recientemente/i })).toBeVisible();
    await expect(page.getByRole("article", { name: /Ver detalles de Retro Snake/i }).first()).toBeVisible();
  });
});

test.describe("Favorites", () => {
  test("toggles favorite from catalog", async ({ page }) => {
    await page.goto("/");
    const firstCard = page.getByRole("article").first();
    await firstCard.getByRole("button", { name: /Añadir a favoritos/i }).click();
    await expect(page.getByRole("heading", { name: /Tus favoritos/i })).toBeVisible();
    await firstCard.getByRole("button", { name: /Quitar de favoritos/i }).click();
    await expect(page.getByRole("heading", { name: /Tus favoritos/i })).not.toBeVisible();
  });
});

test.describe("Security hardening", () => {
  test("ignores malicious localStorage recents", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem("poki-recents", JSON.stringify(["<script>alert(1)</script>"]));
      localStorage.setItem("poki-favorites", JSON.stringify([1, 2, 3]));
    });
    await page.reload();
    await expect(page.getByRole("heading", { name: /Jugados recientemente/i })).not.toBeVisible();
    await expect(page.getByRole("heading", { name: /Tus favoritos/i })).toBeVisible();
  });

  test("player does not render invalid javascript: URL", async ({ page }) => {
    await page.goto("/?app=13");
    await page.getByRole("button", { name: /Jugar ahora/i }).click();
    await expect(page.locator("iframe[src^='javascript:']")).toHaveCount(0);
  });
});
