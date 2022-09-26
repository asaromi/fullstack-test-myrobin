const { Router } = require("express")
const {
  joinChatroom,
  leaveChatroom,
  headerChatroom,
  getChatroomMessages,
  sendMessage,
  getActiveChatrooms,
} = require("./controllers")
const router = new Router()

router.get("/", (req, res) => {
  return res.status(200).json({ success: true })
})

router.post("/join", joinChatroom)
router.get("/leave", headerChatroom, leaveChatroom)
router.get("/chatroom", getActiveChatrooms)
router.get("/chatroom/:roomCode", headerChatroom, getChatroomMessages)
router.post("/chatroom/:roomCode", headerChatroom, sendMessage)

module.exports = router
