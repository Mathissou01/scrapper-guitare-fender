import { test, expect } from "@playwright/test";
import { Product } from "../database"; // Importer le modèle Sequelize

test.setTimeout(120_000);

test("Extract Fender Telecaster guitars info", async ({ page }) => {
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

    await Product.create({
      title: title,
      price: price,
      link: link,
    })
      .then(() => {
        console.log(`Carte ${i + 1} enregistrée dans la base de données.`);
      })
      .catch((error) => {
        console.error(
          `Erreur lors de l'enregistrement de la carte ${i + 1}:`,
          error
        );
      });
  }
});
