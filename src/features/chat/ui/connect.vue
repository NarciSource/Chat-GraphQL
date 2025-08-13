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
import { watchEffect } from "vue";

import { Message, User } from "@/entities/chat/model";
import { useReceiveMessageSubscription, useSystemSubscription } from "../api/generated";
import { connected, connect_failed, disconnected } from "../service/event_helper";
import useChatStore from "../store/useChatStore";

const { room, insert_message, alarm_typing } = useChatStore();
const store = useChatStore();

const { result: message_result } = useReceiveMessageSubscription({
  roomId: room!.id!,
});
const { result: system_result } = useSystemSubscription({
  input: { roomId: room!.id! },
});
const { result: typing_result } = useReceiveMessageSubscription({
  roomId: room!.id!,
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

    const { userId: typingId } = typing_result.value?.message || {}; // 타이핑 이벤트 수신
    alarm_typing(typingId!);
  }
});
</script>
