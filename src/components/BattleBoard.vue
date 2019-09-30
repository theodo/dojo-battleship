<template>
  <div class="battle-board">
    <div v-if="winner" class="end-game-message" :class="this.winner">{{ this.winner }} wins !!!</div>
    <div v-else class="boards">
      <Boats :boats="playerBoats" />
      <PlayBoard title="Player" :board="playerCellsBoard" :ships-visible="true" />
      <PlayBoard title="IA" :board="IACellsBoard" :ships-visible="false" @play="play" />
      <Boats :boats="IABoats" />
    </div>
    <button class="start-button" @click="startGame">Start Game</button>
  </div>
</template>

<script>
import PlayBoard from "./PlayBoard.vue";
import Boats from "./Boats.vue";
import { generateRandomBoard } from "../services/board-helper.js";
import { shoot } from "../services/play-helper.js";
import { findTargetCellV2 } from "../services/ia-helper.js";

export default {
  name: "BattleBoard",
  components: {
    PlayBoard,
    Boats
  },
  data: function() {
    return {
      playerCellsBoard: {},
      playerBoats: {},
      IACellsBoard: {},
      IABoats: {},
      gameStarted: false,
      humanCanPlay: false,
      winner: null
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

      this.winner = null;
      this.gameStarted = true;
      this.humanCanPlay = true;
    },
    async play(cell) {
      if (this.gameStarted && this.humanCanPlay) {
        const isHumanShotAccepted = shoot(
          cell,
          this.IACellsBoard,
          this.IABoats
        );
        if (this.IABoats.aliveShipsCount === 0) {
          this.winner = "Player";
        }
        if (isHumanShotAccepted) {
          this.humanCanPlay = false;

          await new Promise(resolve => setTimeout(resolve, 500));
          const playerTargetCell = findTargetCellV2(this.playerCellsBoard);
          shoot(playerTargetCell, this.playerCellsBoard, this.playerBoats);
          if (this.playerBoats.aliveShipsCount === 0) {
            this.winner = "IA";
          }
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
