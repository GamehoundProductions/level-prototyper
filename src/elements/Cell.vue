<template lang="pug">
  #Cell
    .column.cell(
          @mousedown="set_cell"
          :class="[classes, { 'no-border': currImg !== '' }]"
          @mouseover="mouseOver"
          :style="{" +
            "backgroundImage: 'url(' + cell_img + ')'," +
            "}"
          )
      template(v-if="currRouter === 'hexeditor'")
        p.has-text-centered.noselect.large-font {{currImg || name}}

</template>

<script>
export default {
  name: 'Cell',

  props: {
    name: { //use this to display tile's name in the Tiles bar or something. FIXME
      default: '',
      type: String,
    },

    img: {
      default: '',
      type: String
    },

    x: {
      default: -1,
      type: Number
    },

    y: {
      default: -1,
      type: Number
    },

    onClickEvent: {
      default: undefined,
      type: Function
    },

    classes: {
      default: 'has-border',
      type: String
    },

  },

  data() {
    return {
      border_style: '1px solid #e6e6fa',
      currImg: '',
    }
  },//data


  methods: {

    set_cell() {
      var imgName = this.img
      if (this.currImg === '') {
        this.border_style = ''
      } else {
        this.border_style = '1px solid #e6e6fa'
      }

      // This is some mess to figure out if it is an actual IMG bg or an alphabet
      if (imgName === '' && this.name !== '') {
        imgName = this.name
      }

      if (this.onClickEvent !== undefined) {
        this.onClickEvent(imgName, this)
      }
    },//set_cell


    set_img(imgName) {
      this._img = imgName
    },//set_img


    mouseOver() {
      var isMouseDown = this.$store.getters.IsMousePressed
      if(!isMouseDown)
        return

      var selectedImg = this.$store.getters.SelectedTile
      this.$store.dispatch('SET_GRID_TILE', [this.x, this.y, selectedImg])
    },//mouseOver

    getCellImg() {
      var grid = this.gridTiles
      var img = this.currImg
      //make sure the cell is in the grid's range and set its IMG value.
      //It can be a valid img name (selected from Tiles menu) or an alphabet
      if (this.x >= 0 && this.y >= 0) {
        if (this.x >= grid.length)
          return ''
        if (this.y >= grid[this.x].length)
          return ''
        var gridImg = grid[this.x][this.y]
        if (img !== gridImg)
          img = gridImg
      }else {
        img = this.img
      }
      this.currImg = img

      if(img === undefined || img === '')
        return ''

      try {
        return require('@/assets/' + img)
      }catch(err) {
        return this.currImg
      }
    }
  },

  computed: {

    cell_img() {
      return this.getCellImg()
    },

    gridTiles() {
      var grid = this.$store.getters.GridTiles
      return grid
    },

    currRouter() {
      return this.$route.params.editor
    }
  },//computed


  watch: {
    gridTiles() {
    }
  },//watch
}
</script>


<style lang="scss">
  .cell {
    width: 32px ;
    height: 32px;
    padding: 0px !important;
  }

  .has-border {
    border: 1px solid #e6e6fa;
  }

  .no-border {
    border: none;
  }

  .selected {
    border: 1px solid #468499;
    background: #e6e6fa;

  -webkit-box-shadow: 0px 6px 9px -6px rgba(0,0,0,1);
  -moz-box-shadow: 0px 6px 9px -6px rgba(0,0,0,1);
  box-shadow: 0px 6px 9px -6px rgba(0,0,0,1);
  }

  .large-font {
    font-size: 1.3em;
  }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
  }
</style>
