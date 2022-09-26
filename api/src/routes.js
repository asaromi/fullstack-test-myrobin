const { Router } = require("express")
const {
  joinChatroom,
  leaveChatroom,
  headerChatroom,
  getChatroomMessages,
  sendMessage,
} = require("./controllers")
const router = new Router()

router.get("/", (req, res) => {
  console.log("anjas")
  res.status(200).json({ success: true })
})

router.post("/join", joinChatroom)
router.get("/leave", headerChatroom, leaveChatroom)
router.get("/chatroom/:roomCode", headerChatroom, getChatroomMessages)
router.post("/chatroom/:roomCode", headerChatroom, sendMessage)

module.exports = router
