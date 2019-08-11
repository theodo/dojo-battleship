<template>
  <div>
    <div class="title">{{ title }}</div>
    <div
      class="grid__container"
      :style="`--rows:${rowsCount}; --columns:${columnsCount};`"
    >
      <div v-for="index in cellsCount" :key="index" class="cell">
        {{ getCellName(index) }}
      </div>
    </div>
  </div>
</template>

<script>
import { getCellName, getCellIndexFromName } from "../services/board-helper.js";

export default {
  name: "Grid",
  props: {
    title: {
      type: String,
      required: true
    },
    columnsCount: {
      type: Number,
      default: 10
    },
    rowsCount: {
      type: Number,
      default: 10
    }
  },
  computed: {
    cellsCount() {
      return this.rowsCount * this.columnsCount;
    }
  },
  methods: {
    getCellName,
    getCellIndexFromName
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;
}
.grid__container {
  width: 40vw;
  height: 40vw;
  margin: auto;
  display: grid;
  border: solid 1px black;
  background-color: white;
  grid-gap: 0px;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
}
.cell {
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
