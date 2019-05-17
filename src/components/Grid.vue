<template lang="pug">
  #Grid(@mousedown="mouseClicked(true)" @mouseup="mouseClicked(false)" @keyup.meta="anyClick")
    .div(style="height: 10px; margin: 15px;")
    .columns.is-centered(v-for='h in height')
      Cell(v-for='w in width'
          :onClickEvent="set_tile"
          :x="h-1"
          :y="w-1"
          )
</template>

<script>

import Cell from '..//elements/Cell'

export default {
  name: 'Grid',
  components: {
    Cell
  },

  props: {
    width: Number,
    height: Number
  },//props


  mounted() {
    var grid = [...Array(this.width).fill('')].map(e => Array(this.height).fill(''));
    this.$store.dispatch('SET_GRID', grid)
  },


  methods: {
    set_tile(tile_name, cell) {
      var tn = this.selectedTile
      this.$store.dispatch('SET_GRID_TILE', [cell.x, cell.y, tn])
    },//set_tile

    mouseClicked(isPressed) {
      this.$store.dispatch('SET_MOUSE_PRESSED', isPressed)
    },
  },//methods

  computed: {
    selectedTile() {
      return this.$store.getters.SelectedTile
    },

    currentRoute() {
      return this.$route.params.editor
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
