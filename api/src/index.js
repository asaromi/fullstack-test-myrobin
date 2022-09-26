const express = require("express")
const bodyParser = require("body-parser")
const multer = require("multer")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()
const routes = require("./src/routes/index")

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT, APP_PORT } = process.env
mongoose
  .connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to database")
  })
  .catch((err) => {
    console.log("Could not connect to database. Getting error ...", err)
    process.exit()
  })

app.use(cors())

// parsing application/json & application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// parsing multipart/form-data
app.use(multer().array())

app.use("/", routes)

app.listen(APP_PORT, () => console.log("Server Running at port "+APP_PORT))
