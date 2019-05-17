<template lang='pug'>
  #NavBar.header.navbar.is-fixed-top.is-light
    .navbar-brand
      a.navbar-burger.burger(role='button' aria-label='menu'
                              aria-expanded='false' data-target='navbarMenuInput'
                              @click="toggleBurgerMenu")
        span(aria-hidden='true')
        span(aria-hidden='true')
        span(aria-hidden='true')

    .navbar-menu(id="navbarMenuInput")
      .navbar-start
        .navbar-item.field(id="navbarInputItem")
          router-link.button(to="/" :class="{'is-info': currentRoute === '2deditor'}") 2D Designer
          router-link.button(to="/hexeditor" style="margin-left: 1rem;" :class="{'is-info': currentRoute === 'hexeditor'}") Hex Designer
          a.button.is-warning.is-inverted(v-if="currentRoute == 'hexeditor'"
                style="margin-left: 5rem;"
                @click="downloadDesign()") Download
      .navbar-end
        .navbar-item.field(id="navbarInputItem")
          BoardSize
          img.img-link(
            @click="newWindowRedirect('https://twitter.com/zvbender')"
            style="margin-left: 15rem;"
            src="https://img.icons8.com/color/48/000000/twitter.png"
            )
          img.img-link(
            @click="newWindowRedirect('https://github.com/GamehoundProductions/level-prototyper')"
            style="margin-right: 2rem; margin-left: 1.5rem;"
            src="https://img.icons8.com/windows/32/000000/github.png"
            )
</template>

<script>
import BoardSize from '@/elements/BoardSize.vue'

export default {
  name: 'NavBar',

  components: {
    BoardSize
  },

  /* **************** props ****************** */

  props: {
  },//props

  /* **************** data ****************** */

  data() {
    return{
    }
  },//data


  /* **************** methods ****************** */

  methods: {
    toggleBurgerMenu() {
      var nav = document.getElementById('navbarMenuInput')
      var navbarInputItem = document.getElementById('navbarInputItem')
      nav.classList.toggle('is-active')
      navbarInputItem.classList.toggle('is-active-burger')
    },

    newWindowRedirect(target) {
      window.open(target, '_blank')
    },

    // Generates a String character map of the current state of the grid. Empty
    // cells treated as spaces. Use cell's img name for nonempy ones.
    generateLevelContext() {
      var text = ''
      var grid = this.grid
      for(var h in grid) {
        for(var w in grid[h]) {
          if (grid[h][w] === '')
            text += ' '
          else
            text += grid[h][w]
        }
        text += '\n'
      }
      return text
    },

    // Generate level string and prompt user to download a file with the context.
    downloadDesign() {
      var text = this.generateLevelContext()
      var filename = 'hexed_level.txt'
      var element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
      element.setAttribute('download', filename)

      element.style.display = 'none'
      document.body.appendChild(element)

      element.click()

      document.body.removeChild(element)
    },//downloadDesign
  },//methods

  /* **************** computed ****************** */

  computed: {
    currentRoute() {
      return this.$route.params.editor
    },

    grid() {
      return this.$store.getters.GridTiles
    }
  },//computed

  /* **************** watch ****************** */

  watch: {
    vendors: {
    }
  }

}
</script>

<style lang='scss' scoped>

  .img-link:hover {
    cursor: pointer;
  }
</style>