<template>
  <div class="battle-board">
    <div class="title">BATTLESHIP</div>
    <div v-if="winner" class="end-game-message" :class="winner">
      {{ winner }} wins !!!
    </div>
    <div v-else class="boards">
      <PlayBoard
        title="Player"
        :board="playerAssets.boardCells"
        :should-display-ships="true"
      />
      <PlayBoard
        title="IA"
        :board="IAAssets.boardCells"
        :should-display-ships="false"
        @play="play"
      />
    </div>
    <button class="start-button" @click="startGame">Start Game</button>
  </div>
</template>

<script>
import PlayBoard from "./PlayBoard.vue";
import { generateRandomAssets } from "../services/board-helper.js";
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
      playerAssets: {
        boardCells: {},
        boats: {}
      },
      IAAssets: { boardCells: {}, boats: {} },
      gameStarted: false,
      humanCanPlay: false,
      winner: null
    };
  },
  methods: {
    startGame() {
      this.setAssets(this.playerAssets);
      this.setAssets(this.IAAssets);

      this.winner = null;
      this.gameStarted = true;
      this.humanCanPlay = true;
    },
    setAssets(target) {
      const targetRandomAssets = generateRandomAssets();
      Vue.set(target, "boardCells", targetRandomAssets.boardCells);
      Vue.set(target, "boats", targetRandomAssets.boats);
    },
    async play(cell) {
      if (this.gameStarted && this.humanCanPlay) {
        const isHumanShotAccepted = shoot(
          cell,
          this.IAAssets.boardCells,
          this.IAAssets.boats
        );
        if (this.IAAssets.boats.aliveShipsCount === 0) {
          this.winner = "Player";
        }
        if (isHumanShotAccepted) {
          this.humanCanPlay = false;

          await new Promise(resolve => setTimeout(resolve, 500));
          const playerTargetCell = findTargetCellV2(
            this.playerAssets.boardCells
          );
          shoot(
            playerTargetCell,
            this.playerAssets.boardCells,
            this.playerAssets.boats
          );
          if (this.playerAssets.boats.aliveShipsCount === 0) {
            this.winner = "IAAssets";
          }
          this.humanCanPlay = true;
        }
      }
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
.boards {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
}
.end-game-message {
  font-size: 100px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 30px;
}
.Player {
  color: green;
}
.IA {
  color: red;
}
</style>
