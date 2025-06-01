import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createRulesPlugin } from "vuetify/labs/rules";

loadFonts();

createApp(App)
  .use(router)
  .use(vuetify)
  .use(
    createRulesPlugin(
      {
        /* options */
      },
      vuetify.locale
    )
  )
  .mount("#app");
