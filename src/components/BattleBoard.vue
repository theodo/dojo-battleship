<template>
  <div class="battle-board">
    <PlayBoard :title="'Player'" />
    <PlayBoard :title="'IA'" />
  </div>
</template>

<script>
import PlayBoard from "./PlayBoard.vue";

export default {
  name: "App",
  components: {
    PlayBoard
  }
};
</script>

<style lang="scss" scoped>
.battle-board {
  display: flex;
  justify-content: space-around;
}
</style>
