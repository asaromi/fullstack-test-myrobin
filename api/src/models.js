const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Chat = mongoose.model(
  "Chat",
  new mongoose.Schema(
    {
      message: {
        type: String,
        required: true,
      },
      sender: {
        type: String,
        required: true,
      },
      chatroom: {
        type: Schema.Types.ObjectId,
        ref: "chatrooms",
      },
    },
    {
      timestamps: true,
    }
  )
)

const Chatroom = mongoose.model(
  "Chatroom",
  new mongoose.Schema(
    {
      code: {
        type: String,
        unique: true,
        required: true,
      },
      chats: [
        {
          type: Schema.Types.ObjectId,
          ref: "chats",
        },
      ],
      members: [
        {
          type: String,
          unique: true,
        },
      ],
      online: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  )
)

module.exports = { Chatroom }
