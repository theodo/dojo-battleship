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
import { findTargetCell } from "../services/ia-helper.js";

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
        this.shoot(cell, this.IACellsBoard, this.IABoats);
        await new Promise(resolve => setTimeout(resolve, 500));
        const playerTargetCell = findTargetCell(this.playerCellsBoard);
        this.shoot(playerTargetCell, this.playerCellsBoard, this.playerBoats);
      }
    },
    shoot(cell, board, boats) {
      if (board[cell].status === "ship") {
        const shipName = board[cell].shipName;
        boats[shipName].nbOfAliveCells = boats[shipName].nbOfAliveCells - 1;

        if (boats[shipName].nbOfAliveCells === 0) {
          boats[shipName].cells.forEach(cell => {
            board[cell].status = "sunk";
          });
        } else {
          board[cell].status = "hit";
        }
      }
      if (board[cell].status === "empty") {
        board[cell].status = "missed";
        // Vue.set(board, cell, "missed");
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
