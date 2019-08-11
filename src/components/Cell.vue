<template>
  <div class="cell"></div>
</template>

<script>
export default {
  name: "Cell",
  props: {
    name: {
      type: String,
      required: true
    },
    row: {
      type: Number,
      required: true
    },
    column: {
      type: Number,
      required: true
    },
    neighbors: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
