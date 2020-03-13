// This file will instruct Sequelize to create a Plant model
// We'll define the fields on the model, along with their types and any
// validations we might want (e.g. cannot be null or must be greater than 0)
const Sequelize = require("sequelize");
const db = require("./db");

const Wine = db.define("wine", {
  name: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  vintage: {
    type: Sequelize.INTEGER,
    validate: { min: 1900 },
  },
});

Wine.beforeSave(function(wine) {
  const now = new Date()
  const year = now.getTheYearSomehow()
  if (wine.vintage > year) {
    throw new Error("THAT's THE FUTIRE!!~!!! 🍷")
  }
})

module.exports = Wine;
