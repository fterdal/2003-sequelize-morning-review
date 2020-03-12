// This file will instruct Sequelize to create a Plant model
// We'll define the fields on the model, along with their types and any
// validations we might want (e.g. cannot be null or must be greater than 0)
const Sequelize = require("sequelize");
const db = require("./db");

const Plant = db.define("plant", {
  name: {
    type: Sequelize.STRING
  }
});

module.exports = Plant;
