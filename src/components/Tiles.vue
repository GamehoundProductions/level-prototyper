<template lang="pug">
  #Tiles
    .columns
      .column.is-2
        a.button(
          @click="select_tile('')"
          :class="selectedTile === '' ? 'is-danger is-outlined' : ''") Eraser (shortcut: ` )

      .column.is-2
        a.button(@click="fillBlanks") Fill blanks
      .column.is-2
        a.button(@click="cleanBoard") Clean Board

    .columns(v-if="currentRoute === '2deditor'")
      Cell(v-for='i in 14'
          :key="getName(i-1)"
          :img="getName(i-1)"
          :onClickEvent="select_tile"
          :classes="getName(i-1) === selectedTile ? 'selected' : ''"
          )

    .columns(v-if="currentRoute === 'hexeditor'")
          Cell(v-for='i in hexTiles'
              :key="i"
              :onClickEvent="select_tile"
              :name="i"
              :classes="i === selectedTile ? 'selected' : ''"
              )

</template>

<script>

import Cell from '@/elements/Cell'

export default {
  name: 'Tiles',

  components: {
    Cell
  },//components

  props: {
  },

  data() {
    return {
      tilesState: []
    }
  },//data


  created() {
    window.addEventListener('keyup', this.anyClick)
  },


  methods: {
    select_tile(tileName) {
      this.$store.dispatch('SET_TILE', tileName)
    },

    getName(index) {
      var n = 'proto_' + index + '.png'
      return n
    },


    anyClick(e) {
      if (e.which === 192) {
        this.$store.dispatch('SET_TILE', '')
        return
      }

      if(this.currentRoute !== 'hexeditor')
        return

      var keyName = String.fromCharCode(e.which)
      this.$store.dispatch('SET_TILE', keyName)
    },

    cleanBoard() {
      this.$store.dispatch('SET_GRID', [])
      location.reload()
    },//cleanBoard

    fillBlanks() {
      var grid = this.grid
      for(var h = 0; h < this.boardHeight; h++) {
        for(var w = 0; w < this.boardWidth; w++) {
          if (grid[h][w] === '' || grid[h][w] === undefined) {
            this.$store.dispatch('SET_GRID_TILE', [h, w, this.selectedTile])
          }
        }
      }
    },//fillBlanks

    getHexTiles() {
      if (this.tilesState !== undefined && this.tilesState.length > 0)
        return this.tilesState

      var result = []
      for (var i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
        var thingy = String.fromCharCode(i)
        thingy = thingy.toUpperCase()
        result.push(thingy)
      }
      this.tilesState = result
      return this.tilesState
    },
  },

  computed: {
    selectedTile() {
      return this.$store.getters.SelectedTile
    },


    hexTiles() { return this.getHexTiles() },

    cell_img() {
      if (this.selectedTile === '' || this.selectedTile === undefined)
        return ''

      if (this.currentRoute !== 'hexeditor')
        // return require('@/assets/' + this.selectedTile)
        return '/static/' + this.selectedTile
      else
        return this.selectedTile
    },

    currentRoute() {
      return this.$route.params.editor
    },



    grid() {
      return this.$store.getters.GridTiles
    },

    boardHeight() {
      return this.$store.getters.BoardHeight
    },

    boardWidth() {
      return this.$store.getters.BoardWidth
    }
  },//computed

  watch: {
    selectedTile() {
    }
  },//watch

}
</script>


<style scoped lang="scss">
 .is-outlined {
  -webkit-box-shadow: 0px 6px 9px -6px rgba(0,0,0,1);
  -moz-box-shadow: 0px 6px 9px -6px rgba(0,0,0,1);
  box-shadow: 0px 6px 9px -6px rgba(0,0,0,1);
 }
</style>
