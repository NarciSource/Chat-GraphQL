<template>
  <q-item class="no-padding make-room" title="방 만들기" clickable>
    <q-item-section avatar>
      <q-icon class="q-pa-md" name="meeting_room" size="2rem" />
    </q-item-section>
    <q-item-section>방 만들기</q-item-section>
    <user-list-popup :on-selected="make" />
  </q-item>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { storeToRefs } from "pinia";

import UserListPopup from "@/features/user-presence/index.vue";
import { Room, User } from "@/entities/chat/model";
import useRoomStore from "../store/useRoomStore";
import { useCreateRoomMutation, useRoomCreatedSubscription } from "../api/generated";

const { connecting, current_user, rooms, selected_room } = storeToRefs(useRoomStore());
const { mutate: make_room } = useCreateRoomMutation();

// 다대다 채팅으로 방 생성하고 초대
const make = (selected_users: User[]) => {
  make_room({
    hostId: current_user.value!.id,
    participants: selected_users.map((user) => user.id),
  });
};

const { result: room_result } = useRoomCreatedSubscription({ userId: current_user.value!.id });

watchEffect(() => {
  if (connecting.value) {
    // 방 생성 후의 이벤트 리스너 등록
    if (room_result.value) {
      const { roomId, participants } = room_result.value.roomCreated;

      const room = new Room(
        roomId,
        participants.map((name) => new User(name)),
      );

      rooms.value.set(roomId, room); // 방 정보 업데이트
      selected_room.value = room; // 선택 방 업데이트
    }
  }
});
</script>

<style scoped>
.make-room {
  background: teal;
  color: white;
}
</style>
