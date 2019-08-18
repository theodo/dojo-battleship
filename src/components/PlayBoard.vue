<template>
  <div>
    <div class="title">{{ title }}</div>

    <div class="grid-container">
      <div class="column">
        <div v-for="index in rowsCount" :key="index" class="legend">
          {{ index }}
        </div>
      </div>
      <div>
        <div class="line letter-line">
          <div v-for="index in columnsCount" :key="index" class="legend">
            {{ String.fromCharCode(index - 1 + charCodeOffset) }}
          </div>
        </div>
        <div v-for="row in rowsCount" :key="'row'.concat(row)" class="line">
          <Cell
            v-for="column in columnsCount"
            :key="getCell(row, column)"
            :neighbors="getNeighbors(row, column)"
            :row="row"
            :column="column"
            :name="getCell(row, column)"
            :status="
              board[getCell(row, column)] ? board[getCell(row, column)] : ''
            "
            class="cell"
          ></Cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCell,
  getNeighbors,
  charCodeOffset
} from "../services/board-helper.js";
import Cell from "./Cell.vue";

export default {
  name: "PlayBoard",
  components: {
    Cell
  },
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
    board: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      charCodeOffset: charCodeOffset
    };
  },
  computed: {
    cellsCount() {
      return this.rowsCount * this.columnsCount;
    }
  },

  methods: {
    getCell,
    getNeighbors
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
.grid-container {
  display: flex;
}
.line {
  margin: 0px;
  display: flex;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  & + & {
    border-top: none;
  }
  &.letter-line {
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
.legend {
  height: 3vw;
  width: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1px;
  margin-right: 1px;
}
.column {
  padding-top: 3vw;
}
</style>
