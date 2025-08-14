<template>
  <user-list-popup :on-selected="invite" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import UserListPopup from "@/features/user-presence/index.vue";
import { User } from "@/entities/chat/model";
import { useJoinRoomMutation } from "../api/generated";
import useRoomStore from "../store/useRoomStore";

const { selected_room } = storeToRefs(useRoomStore());
const { mutate: invite_user } = useJoinRoomMutation();

const invite = (selected_users: User[]) => {
  const last = selected_users.pop(); // 마지막 선택 사용자만 <- 서버 문제
  invite_user({ roomId: selected_room.value!.id, userId: last!.id });
};
</script>
