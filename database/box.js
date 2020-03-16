const Sequelize = require("sequelize")
const db = require("./db")

const Box = db.define("box", {
  // FIELDS
  color: {
    type: Sequelize.ENUM("brown", "white", "red", "blue")
  },
  height: {
    type: Sequelize.INTEGER
  },
  width: {
    type: Sequelize.INTEGER
  },
  capacity: {
    type: Sequelize.VIRTUAL,
    get: function() {
      return this.height * this.width
    }
  }
})

module.exports = Box
