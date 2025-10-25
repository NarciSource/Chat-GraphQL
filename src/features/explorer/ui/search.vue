<template>
  <q-input
    v-model="keyword"
    label="검색"
    class="absolute-top-right q-px-md"
    rounded
    standout="bg-teal text-white"
    @keyup.enter="send"
  >
    <template #append>
      <q-btn title="검색" flat round icon="search" @click="() => send()" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { useSearchKeywordQuery } from "@/features/explorer/api/hooks";
import { Message, User } from "@/entities/chat/model";
import useExplorerStore from "../store/useExplorerStore";

const { current_user, search_result } = storeToRefs(useExplorerStore());
const keyword = ref("");

const { result, refetch: send } = useSearchKeywordQuery(
  () => ({
    userId: current_user.value!.id,
    keyword: keyword.value,
  }),
  () => ({
    enabled: !!current_user.value,
  }),
);

watch(result, (new_result) => {
  if (!new_result) return;

  search_result.value = new_result.search.reduce(
    (acc, { roomId, userId, content, createdAt }) => {
      const message = new Message(new User(userId), [content ?? ""], false, new Date(createdAt));

      (acc[roomId] ||= []).push(message);
      return acc;
    },
    {} as Record<string, Message[]>,
  );
});
</script>
