import { Sequelize, DataTypes } from "sequelize";

// Configuration de la base de données SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite", // Nom du fichier SQLite
});

// Définir un modèle de données pour enregistrer les logs des cartes
const Product = sequelize.define("products", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Synchroniser le modèle avec la base de données (création de la table si elle n'existe pas)
sequelize.sync().then(() => {
  console.log("Database synchronized");
});

export { sequelize, Product };
