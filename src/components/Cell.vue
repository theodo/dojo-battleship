<template>
  <div class="cell">
    <div class="card" :class="[status, { hidden: !visible }]" />
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
.card.ship {
  background-color: black;
}

.card.ship.hidden {
  background-color: unset;
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
