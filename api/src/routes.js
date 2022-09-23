const { Router } = require("express")
const router = new Router()

router.get("/", (req, res) => {
  res.status(200).json({ success: true })
})

router.post("/", )

module.exports = router
