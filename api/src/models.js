const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Chat = mongoose.model(
  "Chat",
  new Schema(
    {
      message: {
        type: Object,
        required: true,
      },
      sender: {
        type: String,
        required: true,
      },
      chatroom: {
        type: Schema.Types.ObjectId,
        ref: "chatrooms",
        select: false,
      },
      category: {
        type: String,
        enum: ["notif", "message"],
        default: "notif"
      }
    },
    {
      timestamps: true,
    }
  )
)

const Chatroom = mongoose.model(
  "Chatroom",
  new Schema(
    {
      code: {
        type: String,
        unique: true,
        required: true,
      },
      members: {
        type: Schema.Types.Array,
        required: false,
        default: []
      },
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

module.exports = { Chat, Chatroom }
