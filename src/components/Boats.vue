<template>
  <div>
    <ol class="boats-liste">
      <li
        v-for="boat in boatsInfos"
        :key="boat.name"
        v-bind:class="{sunk: boat.isSunk}"
      >{{boat.name}} ({{boat.nbCells}})</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "Boats",
  props: {
    boats: {
      type: Object,
      required: true
    }
  },
  computed: {
    boatsInfos: function() {
      const x = Object.keys(this.boats)
        .filter(name => !!this.boats[name].cells)
        .map(name => ({
          name,
          nbCells: this.boats[name].cells.length,
          isSunk: this.boats[name].nbOfAliveCells === 0
        }))
        .sort((boat1, boat2) =>
          boat1.nbCells < boat2.nbCells ||
          (boat1.nbCells === boat2.nbCells && boat1.name < boat2.name)
            ? 1
            : -1
        );
      return x;
    }
  }
};
</script>

<style lang="scss" scoped>
.sunk {
  text-decoration: line-through;
  color: red;
}
.boats-liste {
  list-style: none;
  padding: 100% 0;
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}
</style>
