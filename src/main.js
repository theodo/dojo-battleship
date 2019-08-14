import Vue from "vue";
import App from "./App.vue";
import filters from "./filters/filters.js";

Vue.config.productionTip = false;

// declared directly in main.js
Vue.filter("concat", function(value, concatValue) {
  if (!value) return "";
  value = value.toString();
  return value.concat(concatValue);
});

// declared from filters.js
for (const filterKey in filters) {
  Vue.filter(filterKey, filters[filterKey]);
}

new Vue({
  render: h => h(App)
}).$mount("#app");
