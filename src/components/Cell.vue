<template>
  <div class="cell" :class="getClass"></div>
</template>

<script>
export default {
  name: "Cell",
  props: {
    status: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    getClass: function() {
      switch (this.status) {
        case "ship":
          if (!this.visible) {
            return "";
          }
          return "active";
        case "hit":
          return "hit";
        case "missed":
          return "missed";
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
.missed {
  background-color: yellow;
}
.hit {
  background-color: red;
}
</style>
