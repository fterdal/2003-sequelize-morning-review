// This file will tell Sequelize which database to connect to.
// It's also where we can configure the connection details.
const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/garden");

module.exports = db;
