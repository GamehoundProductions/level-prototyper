<template id="app" lang="pug">
  #App(style="padding: 15px;")
    NavBar
    //- .columns.is-full(style="margin-top: 3rem")
    //-   .column.is-1
    //-     p(style="padding-top:0.7rem;") Board Size
    //-   .column
    //-     BoardSize
    div(style="margin-top:4rem;")
    Tiles
    div(style="margin-top:2rem;")
    Grid(:width="boardWidth" :height="boardHeight")
    div(style="margin-top:5rem;")

</template>

<script>
import Grid from '@/components/Grid.vue'
import Tiles from '@/components/Tiles.vue'
import NavBar from '@/components/Navbar.vue'
// import BoardSize from '@/elements/BoardSize.vue'


export default {
  name: 'app',
  components: {
    Grid,
    Tiles,
    NavBar,
  },


  computed: {
    boardHeight() {
      return this.$store.getters.BoardHeight
    },

    boardWidth() {
      var size = this.$store.getters.BoardWidth
      return size
    },
  },//computed
}
</script>

<style lang="scss">

  @import "bulma";

</style>
