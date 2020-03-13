const express = require("express")
const morgan = require("morgan")
const { Plant } = require("./database")

const app = express()

// Tell Express where the static assets are
app.use(express.static("public"))

// JSON body parser
app.use(express.json())
// HTML FORM body parser
app.use(express.urlencoded({ extended: false }))

app.use(morgan("dev"))

// app.use((req, res, next) => {
//   console.log("OUR CUSTOM LOGGER")
//   console.log(req.method, req.path)
//   next()
// })

// console.log("__dirname:", __dirname);

// Homepage
// app.get("/", (req, res, next) => {
//   res.sendFile(__dirname + "/public/index.html")
// })

// app.get("/style.css", (req, res, next) => {
//   res.sendFile(__dirname + "/public/style.css")
// })

// app.get("/", (req, res, next) => {
//   res.send(`
//     <a href="/plants">Plants</a>
//     <h1>Hello 2003!</h1>
//   `)
// })

// List all plants in the database
app.get("/plants", async (req, res, next) => {
  const plants = await Plant.findAll()
  res.send(`
    <a href="/">Home</a>
    <ul>
      ${plants.map(plant => {
        return `<li>Plant: ${plant.name}</li>`
      }).join("")}
    </ul>
  `)
})

// Create a new plant
app.post("/plants", async (req, res, next) => {
  console.log("REQUEST BODY", req.body)
  const { name } = req.body
  const newPlant = await Plant.create({ name })
  res.status(201)
  res.json(newPlant)
})

app.listen(8080, () => {
  console.log(`Listening on port 8080`)
})
