import { createRouter, createWebHistory } from "vue-router"
import JoinChatroom from "../views/JoinChatroom.vue"
import ChatRoom from "../views/ChatRoom.vue"

const routes = [
  {
    path: "/",
    component: JoinChatroom,
    name: "home",
  },
  {
    path: "/chatroom/:roomCode",
    component: ChatRoom,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
