<template>
  <div class="container container-sm">
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
      <div class="form-floating mb-5">
        <input
          type="text"
          class="form-control"
          id="roomCode"
          placeholder="Chatroom Code"
          v-model="roomCode"
        />
        <label for="roomCode">Chatroom Code</label>
      </div>
      <button type="submit" class="btn btn-chat w-100 mt-5">Join</button>
    </form>
    <br class="mt-5" />
    <!-- <p>Username : {{ username }}</p>
    <p>Chatroom : {{ chatroom }}</p> -->
  </div>
</template>

<script>
export default {
  name: "JoinChatroom",
  data() {
    return {
      username: "",
      roomCode: "",
      isLoading: false
    }
  },
  methods: {
    joinRoom: async function() {
      location.href = `/chatroom/${this.roomCode}`
    }
  }
}
</script>

<style scoped></style>
