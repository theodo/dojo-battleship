<template>
  <div class="playboard">
    <div class="title">{{ title }} {{ columnsCount }} x {{ rowsCount }}</div>
  </div>
</template>

<script>
export default {
  name: "PlayBoard",
  props: {
    title: {
      type: String,
      required: true,
    },
    columnsCount: {
      type: Number,
      default: 10,
    },
    rowsCount: {
      type: Number,
      default: 10,
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;
}
</style>
