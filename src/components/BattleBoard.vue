<template>
  <div>
    <div class="battle-board">
      <div class="title">BATTLESHIP</div>
      <PlayBoard
        title="Player"
        :rows-count="10"
        :columns-count="10"
        :board-cells="playerAssets.boardCells"
      />
    </div>
    <button class="start-button" @click="startGame">Start Game</button>
  </div>
</template>

<script>
import PlayBoard from "./PlayBoard.vue";
import { generateRandomAssets } from "../services/board-helper.js";
import Vue from "vue";

export default {
  name: "BattleBoard",
  components: {
    PlayBoard
  },
  data() {
    return {
      playerAssets: {
        boardCells: {},
        boats: {}
      },
      gameStarted: false
    };
  },
  methods: {
    startGame() {
      this.setAssets(this.playerAssets);
      this.gameStarted = true;
      console.log(this.playerAssets);
    },
    setAssets(target) {
      const targetRandomAssets = generateRandomAssets();
      Vue.set(target, "boardCells", targetRandomAssets.boardCells);
      Vue.set(target, "boats", targetRandomAssets.boats);
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
}
.battle-board {
  padding: 30px;
}
</style>
