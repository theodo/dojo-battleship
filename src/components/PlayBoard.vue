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
            {{ getColumnLegend(index) }}
          </div>
        </div>
        <div v-for="row in rowsCount" :key="'row'.concat(row)" class="line">
          <Cell
            v-for="column in columnsCount"
            :key="getCell(row, column)"
            :status="getCellStatus(row, column)"
            :visible="shouldDisplayShips"
            class="cell"
            @click.native="$emit('play', getCell(row, column))"
          ></Cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCell, CHAR_CODE_OFFSET } from "../services/board-helper.js";
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
      default: function() {
        return {};
      }
    },
    shouldDisplayShips: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      CHAR_CODE_OFFSET: CHAR_CODE_OFFSET
    };
  },
  computed: {
    cellsCount() {
      return this.rowsCount * this.columnsCount;
    }
  },

  methods: {
    getCell,
    getColumnLegend(index) {
      return String.fromCharCode(index - 1 + CHAR_CODE_OFFSET);
    },
    getCellStatus(row, column) {
      return this.board[this.getCell(row, column)]
        ? this.board[this.getCell(row, column)].status
        : "";
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
