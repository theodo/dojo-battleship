<template>
  <div class="cell" :class="[status, { hidden: !visible }]"></div>
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
.ship {
  background-color: black;
}
.ship.hidden {
  background-color: unset;
}
.missed {
  background-color: blue;
}
.hit {
  background-color: yellow;
}
.sunk {
  background-color: red;
}
</style>
