<template>
  <q-input v-model="message_input" label="메시지 입력" @keyup.enter="send" />
  <q-btn class="float-right" color="yellow" text-color="black" :disable="is_empty" @click="send">
    전송
  </q-btn>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";

import useChatStore from "../store/useChatStore";
import { useSendMessageMutation, useSendTypingMutation } from "../api/hooks";

// 반응형 변수
const message_input = ref("");
const is_empty = computed(() => message_input.value === "");
const { current_user, room } = storeToRefs(useChatStore());
const { mutate: send_message } = useSendMessageMutation();
const { mutate: typing_message } = useSendTypingMutation();

// 메시지 전송 함수
const send = () => {
  if (is_empty.value) {
    return; // 메시지가 비어있으면 전송하지 않음
  }

  // 메시지 전송
  send_message({
    roomId: room.value!.id,
    userId: current_user.value!.id,
    content: message_input.value,
  });

  message_input.value = ""; // 입력폼 초기화
};

// 타이핑 이벤트
watch(message_input, () => {
  typing_message({
    roomId: room.value!.id,
    userId: current_user.value!.id,
  });
});
</script>
