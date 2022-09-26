<template>
  <div class="container container-sm">
    <div v-if="token">
      <h3 class="mt-4">
        <strong>Chatroom #{{ roomCode }}</strong>
      </h3>
      <div class="row">
        <div class="col-lg-12">
          <div class="card chat-app">
            <div class="chat">
              <div class="chat-header clearfix">
                <div class="row d-flex float-left">
                  <button
                    class="btn col-auto chat-primary"
                    v-on:click.prevent="leaveChatroom()"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-box-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                      />
                    </svg>
                    Leave
                  </button>
                  <div class="col d-flex align-items-center">
                    <!-- <a href="javascript:void(0);">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        alt="avatar"
                      />
                    </a> -->

                    <div
                      class="chat-about h-100 d-flex align-items-center"
                      id="username"
                    >
                      {{ username }}
                    </div>
                  </div>
                  <div
                    class="dropdown col-auto d-flex align-items-center justify-content-center"
                  >
                    <button
                      class="btn btn-normal"
                      type="button"
                      id="dropdownMenu1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Online ({{ online }})
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
                      <button
                        class="dropdown-item"
                        type="button"
                        v-for="user in activeUsers"
                        v-bind:key="user"
                      >
                        {{ user }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="chat-history alignt-items-left">
                <ul class="m-b-0">
                  <!-- all messages gone here -->
                  <li
                    v-for="msg in messages"
                    class="clearfix"
                    v-bind:key="msg.message"
                  >
                    <p v-if="msg.sender != username" class="text-start m-2">
                      {{ msg.sender }}
                    </p>
                    <div
                      v-bind:class="
                        'mb-1 message ' +
                        ((username &&
                          username == msg.sender &&
                          'my-message float-end') ||
                          'other-message float-start')
                      "
                    >
                      <p
                        v-text="msg.message"
                        class="text-start"
                        style="margin-bottom: 0px"
                      ></p>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="chat-message clearfix">
                <form>
                  <div class="input-group mb-3">
                    <textarea
                      class="form-control"
                      placeholder="Message here..."
                      v-model="yourChat"
                    ></textarea>
                    <input
                      class="btn btn-chat"
                      v-on:click.prevent="sendYourChat()"
                      type="submit"
                      value="Send"
                      id="send-chat"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>You had left the Chatroom</h3>
      <p>Click <router-link to="/">here</router-link> to join again</p>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { io } from "socket.io-client"
import "../assets/css/chat.css"
const { encrypt, decrypt } = require("../helpers/encryption")
const { VUE_APP_API: API_URL, VUE_APP_DEBUG: DEBUG } = process.env

export default {
  name: "ChatRoom",
  data() {
    return {
      socket: io("http://192.168.100.8:5000"),
      roomCode: this.$route.params.roomCode,
      yourChat: "",
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      messages: [
        {
          message:
            "Anjayy alksmd aslkdansld asjkdm alsknmalksd laksmdalks d\n asoidaosndaskda sdkjasdnkajs djkasd ajksdak sd",
          category: "notif",
          createdAt: "12 september",
          sender: "asaromi",
        },
        {
          message:
            "Anjayy alksmd aslkdansld asjkdm alsknmalksd laksmdalks d\n asoidaosndaskda sdkjasdnkajs djkasd ajksdak sd",
          category: "notif",
          createdAt: "12 september",
          sender: "asaromi001",
        },
        {
          message:
            "Anjayy alksmd aslkdansld asjkdm alsknmalksd laksmdalks d\n asoidaosndaskda sdkjasdnkajs djkasd ajksdak sd",
          category: "notif",
          createdAt: "12 september",
          sender: "others",
        },
        {
          message:
            "Anjayy alksmd aslkdansld asjkdm alsknmalksd laksmdalks d\n asoidaosndaskda sdkjasdnkajs djkasd ajksdak sd",
          category: "notif",
          createdAt: "12 september",
          sender: "asaromi001",
        },
      ],
      activeUsers: [],
      online: 0,
    }
  },
  methods: {
    sendYourChat: function () {
      axios
        .post(
          `${API_URL}/chatroom/${this.roomCode}`,
          {
            message: encrypt(this.yourChat),
          },
          {
            headers: {
              ["vue-token"]: this.token,
            },
          }
        )
        .then((res) => {
          this.messages.push({
            ...res.data?.data,
            message: decrypt(res.data?.data.message),
          })
          this.socket.emit("SEND_MESSAGE", res.data?.data)
        })
        .then(() => {
          this.scrollToLastMessage()
          document.querySelector("form").reset()
        })
        .catch((err) => {
          if (DEBUG) console.error(err)
        })
    },
    leaveChatroom: function () {
      axios
        .get(`${API_URL}/leave`, {
          headers: {
            ["vue-token"]: this.token,
          },
        })
        .then((res) => {
          if (res.data?.success) {
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("roomCode")
            location.href = "/"
          }
        })
    },
    getMessages: function () {
      axios
        .get(`${API_URL}/chatroom/${this.roomCode}`, {
          headers: {
            ["vue-token"]: this.token,
          },
        })
        .then((res) => {
          if (res.data?.success) {
            res.data.data.messages.map((msg) => {
              this.messages.push({ ...msg, message: decrypt(msg.message) })
            })
            console.log(this.messages)
            this.activeUsers = res.data.data.chatroom.members
            this.online = res.data.data.chatroom.online
          }
        })
        .catch((err) => {
          if (DEBUG) console.error(err)
        })
    },
    scrollToLastMessage: function () {
      setTimeout(() => {
        console.log(document.querySelector(".chat-history").scrollHeight)
        document.querySelector(".chat-history").scrollTo({
          top: document.querySelector(".chat-history").scrollHeight,
          behavior: "smooth",
        })
      }, 750)
    },
  },
  mounted() {
    this.getMessages()
    this.scrollToLastMessage()

    this.socket.on(`RECEIVE_MESSAGE_${this.roomCode}`, (data) => {
      // if (data.roomCode == this.roomCode) {
      let { roomCode, message, ...payload } = data
      message = decrypt(message)
      console.log(roomCode)
      this.messages.push({
        ...payload,
        message,
      })
      this.scrollToLastMessage()
      // }
    })
  },
  watch: {
    handleBtnCode: function (e) {
      if (DEBUG) alert(e.target.value)
    },
  },
}
</script>

<style scoped>
#username {
  font-size: 18pt;
}
</style>
