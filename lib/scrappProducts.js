import { chromium } from "@playwright/test";

export async function scrappProducts() {
  const browser = await chromium.launch({ headless: true, channel: "chrome" });

  const page = await browser.newPage();

  // Étape 1 : Aller sur Google avec votre recherche initiale
  await page.goto("https://www.google.com/search?q=fender+telecaster");
  await page.getByRole("button", { name: "Tout accepter" }).click(); // Accepter les cookies
  await page.getByRole("link", { name: "Produits", exact: true }).click();

  // Étape 2 : Attendre que les résultats soient chargés
  await page.waitForLoadState("networkidle");

  // await page.pause();

  // Étape 3 : Récupérer toutes les cartes
  const innerCards = await page.locator("g-inner-card");
  const cardCount = await innerCards.count(); // Compter les cartes trouvées

  console.log(`Nombre de cartes trouvées : ${cardCount}`);
  const products = [];

  // Parcourir chaque carte pour extraire et loguer toutes les infos brutes
  for (let i = 0; i < cardCount; i++) {
    const card = innerCards.nth(i);

    await card.click();
    await page.waitForTimeout(Math.floor(Math.random() * 2000));

    const title = await card.locator("[title]").getAttribute("title");

    const link = await page
      .locator("[data-attrid='organic_offers_grid']")
      .getByRole("link")
      .first()
      .getAttribute("href");

    const price = await card
      .locator("[aria-label^='Prix']")
      .first()
      .innerText();

    products.push({
      title: title,
      price: price,
      link: link,
    });
  }

  return products;
}
