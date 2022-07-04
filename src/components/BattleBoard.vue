<template>
  <div>
    <div class="battle-board">
      <div class="title">BATTLESHIP</div>
      <PlayBoard title="Player" :rows-count="10" :columns-count="10" />
    </div>
  </div>
</template>

<script>
import PlayBoard from "./PlayBoard.vue";

export default {
  name: "BattleBoard",
  components: {
    PlayBoard,
  },
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
