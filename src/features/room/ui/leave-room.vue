<template>
  <q-btn class="q-px-xs" flat color="red" icon="logout" title="방 나가기" @click="leave" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { Room } from "@/entities/chat/model";
import { useLeaveRoomMutation } from "../api/generated";
import useRoomStore from "../store/useRoomStore";

const { current_user, rooms, selected_room } = storeToRefs(useRoomStore());
const { room } = defineProps<{ room: Room }>();
const { mutate: leave_room } = useLeaveRoomMutation();

const leave = () => {
  // 방 나가기
  leave_room({
    userId: current_user.value!.id,
    roomId: room.id,
  });

  // 방 목록에서 제거
  rooms.value.delete(room.id);

  // 선택된 방이면 초기화
  if (selected_room.value === room) {
    selected_room.value = null;
  }
};
</script>
