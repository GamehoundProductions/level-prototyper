import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    selectedTile: '',
    grid: [],
    mousePressed: false,
    boardHeight: 20, // this value is not a Default value!
    boardWidth: 20,  // Set defaults in BoardSize component instead
  },//state


  mutations: {
    set_tile (state, tile) {
      state.selectedTile = tile
    },

    set_grid_tile(state, coords) {
      var h = coords[0]
      var w = coords[1]
      var tile_name = coords[2]
      var newGrid = state.grid
      newGrid[h][w] = tile_name
      Vue.set(state.grid, newGrid)
    },

    set_grid(state, grid) {
      state.grid = grid
    },

    set_mouse_pressed(state, isPressed) {
      state.mousePressed = isPressed
    },

    set_board_height(state, size) {
      var diff = state.boardHeight - size
      var grid = state.grid
      if (diff < 0) { //Adding more height
        //add more rows to the grid with empty cells
        for(var i = 0; i < Math.abs(diff); i++) {
          grid.push(Array(state.boardWidth).fill(''))
        }
      }else if (diff > 0){ //reducing height
        grid = grid.slice(0, size)
      }
      state.grid = grid
      state.boardHeight = size
    },

    set_board_width(state, size) {
      var grid = state.grid
      var diff = state.boardWidth - size
      for(var h = 0; h < state.boardHeight; h++){
        if (diff < 0) {                   //adding columns
          //use ... or it will create wacky chars. IDK why. JS nonsense..
          grid[h].push(...Array(Math.abs(diff)).fill(''))
        }else if (diff > 0) {                           //reducing columns
          grid[h] = grid[h].slice(0, size)
        }
      }//for
      state.grid = grid
      state.boardWidth = size
    }
  },//mutations


  actions: {
    SET_TILE: (state, tileName) => {
      store.commit('set_tile', tileName)
    },

    SET_GRID_TILE: (state, coords) => {
      store.commit('set_grid_tile', coords)
    },

    SET_GRID: (state, grid) => {
      store.commit('set_grid', grid)
    },

    SET_MOUSE_PRESSED: (state, isPressed) => {
      store.commit('set_mouse_pressed', isPressed)
    },

    SET_BOARD_HEIGHT: (state, size) => {
      store.commit('set_board_height', size)
    },

    SET_BOARD_WIDTH: (state, size) => {
      store.commit('set_board_width', size)
    },
  },//mutations


  getters: {
    SelectedTile: state => {
      return state.selectedTile
    },

    GridTiles: state => {
      return state.grid
    },

    IsMousePressed: state => {
      return state.mousePressed
    },

    BoardHeight: state => { return state.boardHeight },
    BoardWidth: state => { return state.boardWidth }

  },//getters

})

export default store