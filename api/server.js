const mongoose = require("mongoose")
let { mongodbUrl, host, port } = require("./config")
const { server } = require("./src/app")

host = (host && [host]) || []

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database")
  })
  .catch((err) => {
    console.log("Could not connect to database. Getting error ...")
    console.error(err)
    process.exit()
  })

server.listen(port, ...host, () =>
  console.log(
    "Server Running at " +
      ((host.length > 0 && `${host[0]}:${port}`) || `port ${port}`)
  )
)