import cron from "node-cron";
import { Product } from "./database.js";

import { scrappProducts } from "./lib/scrappProducts.js";

cron.schedule("* * * * *", async () => {
  console.log("running a task every minute");
  const products = await scrappProducts();

  await Product.bulkCreate(products);
});
