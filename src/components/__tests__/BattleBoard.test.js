import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BattleBoard from "../BattleBoard.vue";

describe("BattleBoard", () => {
  it("renders properly", () => {
    const wrapper = mount(BattleBoard);
    expect(wrapper.text()).toContain("BATTLESHIP");
  });
});
