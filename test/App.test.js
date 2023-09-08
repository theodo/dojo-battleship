import { describe, it } from "vitest";
import { mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("Mount app", () => {
  it("Should render", () => {
    mount(App);
  });
});
