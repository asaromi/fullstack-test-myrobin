<template>
  <div class="container container-sm">
    <h3>Chatroom #{{ roomCode }}</h3>
  </div>
</template>

<script>
export default {
  name: "ChatRoom",
  data() {
    return {
      roomCode: this.$route.params.roomCode,
    }
  },
  methods: {},
}
</script>

<style scoped></style>
