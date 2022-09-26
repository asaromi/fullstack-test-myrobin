<template>
  <div class="container container-sm">
    <div v-if="!activeUser">
      <h3>Join Chatroom</h3>
      <br />
      <form method="POST" class="mt-4" v-on:submit.prevent="joinRoom()">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="Username"
            v-model="username"
          />
          <label for="username">Username</label>
        </div>
        <div class="form-floating mb-4">
          <input
            type="text"
            class="form-control"
            id="roomCode"
            placeholder="Chatroom Code"
            v-model="roomCode"
          />
          <label for="roomCode">Chatroom Code</label>
        </div>
        <div class="mt-4 mb-5">
          <p class="mb-3">Or choose the active chatrooms</p>
          <button
            type="button"
            class="btn btn-light m-1"
            v-for="room in activeChatrooms"
            :key="room._id"
            :id="room.code"
            @click="(event) => clickRoomCode(event)"
          >
            {{ room.code }}
          </button>
        </div>
        <button type="submit" class="btn btn-chat w-100 mt-5">Join</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios"
const { VUE_APP_API: API_URL, VUE_APP_DEBUG: DEBUG } = process.env

export default {
  name: "JoinChatroom",
  data() {
    return {
      activeUser: localStorage.getItem("username"),
      username: "",
      roomCode: "",
      isLoading: false,
      activeChatrooms: [],
    }
  },
  methods: {
    joinRoom: function (session) {
      const { username, roomCode } = session || this
      axios
        .post(`${API_URL}/join`, { username, roomCode })
        .then((res) => {
          if (res.data?.success) {
            if (DEBUG) console.log("Sukses Join")
            localStorage.setItem("token", res.data.data.token)
            localStorage.setItem("username", username)
            localStorage.setItem("roomCode", roomCode)
            this.$router.push(`/chatroom/${roomCode}`)
          }
        })
        .catch((err) => {
          if (DEBUG) console.error(err)
        })
    },
    getChatroom: function (session) {
      const { roomCode, username, token } = session || this
      axios
        .get(`${API_URL}/chatroom/${roomCode}`, {
          headers: {
            ["vue-token"]: token,
          },
        })
        .then((res) => {
          if (res.data?.success) {
            const currentUser = res.data.data?.chatroom?.currentUser
            if (currentUser == username) this.$router.push(`/chatroom/${roomCode}`)
            else this.joinRoom(session)
          }
        })
        .catch((err) => {
          if (DEBUG) console.error(err)
        })
    },
    checkSession: function () {
      if (localStorage.getItem("token")) {
        this.getChatroom(localStorage)
      }
    },
    clickRoomCode: function(e) {
      document.querySelector("#roomCode").value = e.target.id
    },
    getActiveChatrooms: function () {
      axios.get(`${API_URL}/chatroom`).then((res) => {
        this.activeChatrooms = [...res.data.data]
      }).catch(err => {
        if (DEBUG) console.error(err)
      })
    },
  },
  mounted() {
    this.checkSession()
    this.getActiveChatrooms()
  },
}
</script>
