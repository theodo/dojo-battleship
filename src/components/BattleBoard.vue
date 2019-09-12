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
import { shoot } from "../services/play-helper.js";
import { findTargetCellV2 } from "../services/ia-helper.js";

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
      gameStarted: false,
      humanCanPlay: true
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
      if (this.gameStarted && this.humanCanPlay) {
        const isHumanShotAccepted = shoot(
          cell,
          this.IACellsBoard,
          this.IABoats
        );

        if (isHumanShotAccepted) {
          this.humanCanPlay = false;

          await new Promise(resolve => setTimeout(resolve, 500));
          const playerTargetCell = findTargetCellV2(this.playerCellsBoard);
          shoot(playerTargetCell, this.playerCellsBoard, this.playerBoats);

          this.humanCanPlay = true;
        }
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
