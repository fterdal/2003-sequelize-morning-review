// This file is useful for collecting all of our models and exporting them in
// one place. It's also a good place to define associations (e.g. one-to-many)
const db = require('./db')
const Plant = require('./plant')
const Box = require('./box')

// One to Many
Plant.belongsTo(Box)
Box.hasMany(Plant)

// Many to Many
// Plant.belongsToMany(Box, { through: "plant_box" })
// Box.belongsToMany(Plant, { through: "plant_box" })

module.exports = {
  db,
  Plant,
  Box,
}
