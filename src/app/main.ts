/* eslint-disable import/order */
import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";

import App from "./App.vue";
import Apollo from "./apolloPlugin";

import "quasar/src/css/index.sass";
import "@quasar/extras/material-icons/material-icons.css";

const Pinia = createPinia();

// Vue 플러그인 사용
createApp(App)
  .use(Pinia) // 상태 관리
  .use(Quasar) // UI 라이브러리
  .use(Apollo) // Apollo(GraphQL) 클라이언트 설정
  .mount("#app");
