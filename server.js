const express = require("express");
const morgan = require("morgan");
const { Plant, Box } = require("./database");

const app = express();

// JSON body parser
app.use(express.json());
// HTML FORM body parser
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use(async (req, res, next) => {
  try {
    const allPlants = await Plant.findAll();
    throw new Error("Oh No! The plants are on fire!")
    // req.plants = allPlants;
    // res.send("Your plants are ready"); // Cannot set headers after they are sent
    // next();
  } catch (err) {
    next(err);
  }
});

app.get("/", (req, res, next) => {
  res.send(`
    <a href="/plants">Plants</a>
    <h1>Hello 2003!</h1>
  `);
});

// List all plants in the database
app.get("/plants", async (req, res, next) => {
  // const plants = await Plant.findAll();
  res.send(`
    <a href="/">Home</a>
    <ul>
      ${req.plants
        .map(plant => {
          return `<li>Plant: ${plant.name}</li>`;
        })
        .join("")}
    </ul>
  `);
});

// Get a single plant in the database
app.get("/box/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const box = await Box.findByPk(id, {
      include: [{ model: Plant }]
    });
    res.send(`
      <h1>${box.color} Box</h1>
      <h2>Capacity: ${box.capacity}</h2>
      <ul>
        ${box.plants
          .map(plant => {
            return `<li>Plant: ${plant.name}</li>`;
          })
          .join("")}
      </ul>
    `);
  } catch (err) {
    next(err);
  }
});

// Create a new plant
app.post("/plants", async (req, res, next) => {
  console.log("REQUEST BODY", req.body);
  const { name } = req.body;
  const newPlant = await Plant.create({ name });
  res.status(201);
  res.json(newPlant);
});

app.listen(8080, () => {
  console.log(`Listening on port 8080`);
});
