<template>
  <div class="playboard">
    <div class="title">{{ title }}</div>

    <div class="grid-container">
      <div v-for="row in rowsCount" :key="'row'.concat(row)" class="line">
        <div
          v-for="column in columnsCount"
          :key="''.concat(column).concat('-'.concat(row))"
          class="cell"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayBoard",
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
    },
    boardCells: {
      type: Object,
      default: function() {
        return {};
      }
    }
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
.playboard {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.line {
  margin: 0px;
  width: fit-content;
  display: flex;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  & + & {
    border-top: none;
  }
}
.cell {
  border-left: 1px solid black;
  border-right: 1px solid black;
  & + & {
    border-left: none;
  }
  height: 3vw;
  width: 3vw;
}
</style>
