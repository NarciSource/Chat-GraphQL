<template>
  <q-btn class="q-px-xs" flat color="red" icon="logout" title="방 나가기" to="/" @click="leave" />
</template>

<script setup lang="ts">
import { HistoryState, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { Room } from "@/entities/chat/model";
import { useLeaveRoomMutation } from "../api/hooks";
import useRoomStore from "../store/useRoomStore";

const router = useRouter();
const { current_user, rooms } = storeToRefs(useRoomStore());
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

  router.push({
    path: `/`,
    state: { rooms: rooms.value } as unknown as HistoryState,
  }); // 방 이동 및 방 상태 전달
};
</script>
