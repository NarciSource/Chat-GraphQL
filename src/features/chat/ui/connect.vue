<template>
  <!-- 채팅 화면 -->
  <slot />

  <!-- 채팅 화면 접근 차단 -->
  <q-inner-loading
    :showing="!connecting"
    class="fit"
    color="teal-9"
    label="채팅 연결 대기 중..."
    label-class="text-overline text-weight-bold text-teal-9"
  />
</template>

<script setup lang="ts">
import { watch } from "vue";
import { storeToRefs } from "pinia";

import { Message, User } from "@/entities/chat/model";
import {
  useOnTypingSubscription,
  useReceiveMessageSubscription,
  useSystemSubscription,
} from "../api/hooks";
import useChatStore from "../store/useChatStore";

const { current_user, room, connecting } = storeToRefs(useChatStore());
const { insert_message, alarm_typing } = useChatStore();

const { result: message_result } = useReceiveMessageSubscription(() => ({
  userId: current_user.value!.id!,
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

// 일반 메시지 수신
watch(message_result, (result) => {
  if (!result) return;

  const { roomId, userId, content } = result.message;
  insert_message(new Message(new User(userId), [content ?? ""]), roomId);
});

// 시스템 메시지 수신
watch(system_result, (result) => {
  if (!result) return;

  const { roomId, content } = result.system;
  insert_message(new Message(new User("System"), [content ?? ""]), roomId);
});

// 타이핑 이벤트 수신
watch(typing_result, (result) => {
  if (!result) return;

  alarm_typing(result.typing.userId!);
});
</script>
