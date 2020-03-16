// This is our seed file. We'll import our Sequelize models from
// ./database/index and create some dummy data in the database. Seeding a
// database is very useful for development.
const { blue, cyan, green, red } = require("chalk");
const { db, Plant, Box } = require("./database");

const sampleBoxes = [
  { color: "blue", height: 10, width: 2 },
  { color: "red", height: 100, width: 200 },
]

async function seed() {
  try {
    console.log(cyan("📡 Connecting to the database..."));
    // Connect to the database
    await db.sync({ force: true });
    console.log(blue("🌱 Seeding the database..."));

    // Seed the database
    const [blueBox, redBox] = await Box.bulkCreate(sampleBoxes);
    // const blueBox = await Box.create({ color: "blue", height: 10, width: 2 });
    // const redBox = await Box.create({ color: "red", height: 100, width: 200 });

    const cauliflower = await Plant.create({ name: "Cauliflower" });
    const broccoli = await Plant.create({ name: "Broccoli" });
    const carrot = await Plant.create({ name: "Carrot" });
    // const cauliflower = await Plant.create({ name: "Cauliflower", boxId: 1 });

    // Magic method method
    // console.log(redBox.__proto__)
    await cauliflower.setBox(redBox);
    await blueBox.addPlants([broccoli, carrot]);


    // 👇 This would go in an Express route!
    const firstBox = await Box.findByPk(1, {
      include: [
        {model: Plant}
      ]
    })
    console.log("firstBox:", firstBox);

    // cauliflower.boxId = redBox.id
    // await cauliflower.save()

    // Close the database connection
    console.log(green("🌲 Finished seeding the database!"));
    await db.close();
  } catch (err) {
    console.log(red("🔥 An error occured!!"));
    console.error(err);
    await db.close();
  }
}
seed();
