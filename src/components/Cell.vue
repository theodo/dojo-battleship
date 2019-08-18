<template>
  <div class="cell" :class="getClass"></div>
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
      type: Object,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  computed: {
    getClass: function() {
      switch (this.status) {
        case "ship":
          return "active";

        default:
          return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  background-color: black;
}
</style>
