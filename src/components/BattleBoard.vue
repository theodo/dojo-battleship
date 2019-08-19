<template>
  <div class="battle-board">
    <div class="boards">
      <PlayBoard
        :title="'Player'"
        :board="playerCellsBoard"
        :ships-visible="true"
      />
      <PlayBoard
        :title="'IA'"
        :board="IACellsBoard"
        :ships-visible="false"
        @play="play"
      />
    </div>
    <button class="start-button" @click="startGame">Start Game</button>
  </div>
</template>

<script>
import PlayBoard from "./PlayBoard.vue";
import { getRandomShips, findTargetCell } from "../services/board-helper.js";
import Vue from "vue";

export default {
  name: "BattleBoard",
  components: {
    PlayBoard
  },
  data: function() {
    return {
      playerCellsBoard: {},
      IACellsBoard: {},
      gameStarted: false
    };
  },
  methods: {
    startGame() {
      this.playerCellsBoard = getRandomShips();
      this.IACellsBoard = getRandomShips();
      this.gameStarted = true;
    },
    async play(cell) {
      if (this.gameStarted) {
        this.shoot(cell, this.IACellsBoard);
        await new Promise(resolve => setTimeout(resolve, 500));
        const playerTargetCell = findTargetCell(this.playerCellsBoard);
        this.shoot(playerTargetCell, this.playerCellsBoard);
      }
    },
    shoot(cell, board) {
      if (board[cell] === "ship") {
        board[cell] = "hit";
      }
      if (board[cell] === undefined) {
        Vue.set(board, cell, "missed");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.battle-board {
  padding: 30px;
}
.boards {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
}
</style>
