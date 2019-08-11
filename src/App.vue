<template>
  <div id="app">
    <div class="title">BATTLESHIP</div>
    <BattleBoard />
  </div>
</template>

<script>
import BattleBoard from "./components/BattleBoard.vue";

export default {
  name: "App",
  components: {
    BattleBoard
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
}
</style>
