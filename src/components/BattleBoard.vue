<template>
  <div class="battle-board">
    <div class="boards">
      <PlayBoard :title="'Player'" :board="playerCellsBoard" :ships-visible="true" />
      <PlayBoard :title="'IA'" :board="IACellsBoard" :ships-visible="false" @play="play" />
    </div>
    <button class="start-button" @click="startGame">Start Game</button>
  </div>
</template>

<script>
import PlayBoard from "./PlayBoard.vue";
import { generateRandomBoard } from "../services/board-helper.js";
import { findTargetCell } from "../services/board-helper.js";

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
      const {
        boardCells: playerCellsBoard,
        boats: playerBoats
      } = generateRandomBoard();
      this.playerCellsBoard = playerCellsBoard;
      this.playerBoats = playerBoats;

      const {
        boardCells: IACellsBoard,
        boats: IABoats
      } = generateRandomBoard();
      this.IACellsBoard = IACellsBoard;
      this.IABoats = IABoats;

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
