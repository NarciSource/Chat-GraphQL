<template>
  <!-- 채팅 화면 -->
  <slot />

  <!-- 채팅 화면 접근 차단 -->
  <q-inner-loading
    :showing="!store.connecting"
    class="fit"
    color="teal-9"
    label="채팅 연결 대기 중..."
    label-class="text-overline text-weight-bold text-teal-9"
  />
</template>

<script setup lang="ts">
import { watch, watchEffect } from "vue";
import { storeToRefs } from "pinia";

import { Message, User } from "@/entities/chat/model";
import {
  useOnTypingSubscription,
  useReceiveMessageSubscription,
  useSystemSubscription,
} from "../api/hooks";
import { connected, connect_failed, disconnected } from "../service/event_helper";
import useChatStore from "../store/useChatStore";

const { room } = storeToRefs(useChatStore());
const { insert_message, alarm_typing } = useChatStore();
const store = useChatStore();

const { result: message_result } = useReceiveMessageSubscription(() => ({
  roomId: room.value!.id!,
}));
const { result: system_result } = useSystemSubscription(() => ({
  input: { roomId: room!.value!.id! },
}));
const { result: typing_result } = useOnTypingSubscription(() => ({
  roomId: room!.value!.id!,
}));

// room 변경 시 이전 메시지 결과 초기화
watch(room, () => {
  message_result.value = undefined;
  system_result.value = undefined;
  typing_result.value = undefined;
});

watchEffect(() => {
  if (store.connecting) {
    // 소켓 이벤트 리스너 등록
    connected(() => (store.connecting = true)); // 연결 성공
    connect_failed(() => (store.connecting = false)); // 연결 실패
    disconnected(() => (store.connecting = false)); // 연결 종료

    const { userId, content } = message_result.value?.message || {}; // 일반 메시지 수신
    const received_messaged = new Message(new User(userId!), [content!]);
    insert_message(received_messaged);

    const { content: system_content } = system_result.value?.system || {}; // 시스템 메시지 수신
    const system_message = new Message(new User("System"), [system_content!], true);
    insert_message(system_message);

    // 타이핑 이벤트 수신
    const { userId: typingId } = typing_result.value?.typing || {};
    alarm_typing(typingId!);
  }
});
</script>
