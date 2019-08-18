<template>
  <div class="battle-board">
    <PlayBoard :title="'Player'" :board="playerCellsBoard" />
    <PlayBoard :title="'IA'" :board="IACellsBoard" />
  </div>
</template>

<script>
import PlayBoard from "./PlayBoard.vue";
import { getRandomShips } from "../services/board-helper.js";

export default {
  name: "BattleBoard",
  components: {
    PlayBoard
  },
  data: function() {
    return {
      playerCellsBoard: {},
      IACellsBoard: {}
    };
  },
  mounted() {
    this.playerCellsBoard = getRandomShips();
    this.IACellsBoard = getRandomShips();
  }
};
</script>

<style lang="scss" scoped>
.battle-board {
  display: flex;
  justify-content: space-around;
}
</style>
