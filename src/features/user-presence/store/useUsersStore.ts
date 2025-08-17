import { defineStore } from "pinia";
import { onUnmounted, ref } from "vue";

import { apolloClient } from "@/app/apolloPlugin";
import User from "@/entities/chat/model/User";
import { dto_to_user } from "@/entities/chat/service/mapper/user";
import { UserPresenceDocument } from "../api/hooks";

export default defineStore("users", () => {
  const users = ref<User[]>([]);

  const init_users = () => {
    const subscription = apolloClient.subscribe({ query: UserPresenceDocument }).subscribe({
      next: ({ data }) => {
        users.value = dto_to_user(data?.userPresence || []);
      },
      error: (err) => console.error("subscription error:", err),
    });

    onUnmounted(() => {
      subscription.unsubscribe();
    });
  };

  return { users, init_users };
});
