import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueApexCharts from "vue3-apexcharts";

import { loadFonts } from "./plugins/webfontloader";
import { createRulesPlugin } from "vuetify/labs/rules";

loadFonts();

createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueApexCharts)
  .use(
    createRulesPlugin(
      {
        /* options */
      },
      vuetify.locale
    )
  )
  .mount("#app");
