const { Chatroom, Chat } = require("./models")
const { sign: jwtSign, verify: jwtVerify } = require("jsonwebtoken")
const { jwtSecret } = require("../config")
const { errorResponse, successResponse } = require("./helpers")

exports.headerChatroom = async (req, res, next) => {
  try {
    const { username, code } = jwtVerify(req.headers["vue-token"], jwtSecret, {
      complete: true,
    }).payload

    req.chatroom = {
      ...(await Chatroom.findOne({ code, username })
        .select("_id code online members")
        .lean()),
      currentUser: username,
    }

    next()
  } catch (error) {
    return errorResponse(res)(500, error)
  }
}

exports.joinChatroom = async (req, res) => {
  try {
    const { roomCode: code, username } = req.body
    let chatroom = await Chatroom.findOneAndUpdate(
      { code, members: { $nin: username } },
      { $push: { members: username }, $inc: { online: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    if (!chatroom) {
      throw {
        code: 400,
        message: "Username has been used",
      }
    }

    return successResponse(res)(201, {
      roomCode: code,
      members: [...chatroom.members, username],
      online: chatroom.online + 1,
      token: jwtSign({ username, code }, jwtSecret),
    })
  } catch (error) {
    return errorResponse(res)(500, error)
  }
}

exports.leaveChatroom = async (req, res) => {
  try {
    const { code, currentUser: members } = req.chatroom
    const chatroom = await Chatroom.findOneAndUpdate(
      { code, members },
      { $pullAll: { members: [members] }, $inc: { online: -1 } }
    )

    if (!chatroom) {
      throw {
        code: 404,
        message: "Not Found : You had left from the Chatroom",
      }
    }

    return successResponse(res)(200, "Success in leaving Chatroom")
  } catch (error) {
    return errorResponse(res)(500, error)
  }
}

exports.getActiveChatrooms = async (req, res) => {
  try {
    const chatrooms = await Chatroom.find({ online: true })
      .select("code")
      .lean()

    return successResponse(res)(200, { ...chatrooms })
  } catch (error) {
    return errorResponse(res)(500)
  }
}

exports.sendMessage = async (req, res) => {
  try {
    const { code, _id: chatroom, currentUser: sender } = req.chatroom
    if (code !== req.params.roomCode) {
      throw {
        code: 400,
        message: "You are not in the Chatroom anymore",
      }
    }
    
    const message = await Chat.create({ message: req.body.message, sender, chatroom, category: "message" })

    return successResponse(res)(201, { ...message.toObject(), roomCode: code })
  } catch (error) {
    return errorResponse(res)(500)
  }
}

exports.getChatroomMessages = async (req, res) => {
  try {
    const { code, _id: chatroom } = req.chatroom
    if (code !== req.params.roomCode) {
      throw {
        code: 400,
        message: "You are not in the Chatroom anymore",
      }
    }
    // if (debug) console.log(chatroom)
    let messages = await Chat.find({ chatroom }).lean()
    messages = { messages, chatroom: req.chatroom }

    return successResponse(res)(200, { ...messages })
  } catch (error) {
    return errorResponse(res)(500, error)
  }
}
