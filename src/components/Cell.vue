<template>
  <div class="cell">
    <div class="card" :class="getClass"></div>
  </div>
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
          return this.visible ? "active" : "";
        case "hit":
          return "hit";
        case "missed":
          return "missed";
        case "sunk":
          return "sunk";
        default:
          return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.card {
  width: 100%;
  height: 100%;
  position: absolute;
  transition: transform 1s;
  transform-style: preserve-3d;
}

.card.active {
  background-color: black;
}
.card.missed {
  background-color: aqua;
  transform: rotateY(180deg);
}
.card.hit {
  background-color: yellow;
  transform: rotateY(180deg);
}
.card.sunk {
  background-color: red;
  transform: rotateY(180deg);
}
</style>
