<template id="app" lang="pug">
  #App
    div.fieldOuter
      input.input(
              @blur="applySize"
              @keyup.enter="applySize"
              placeholder="Height"
              id="heightInput"
              v-model="heightSize"
              name="height")
      label(for="height") Height
      input.input(
              @blur="applySize"
              @keyup.enter="applySize"
              placeholder="Width"
              id="widthInput"
              v-model="widthSize"
              name="width"
              style="margin-left: 1rem;")
      label(for="width" style="left: 57px;") Width
</template>

<script>


export default {
  name: 'BoardSize',
  components: {
  },

  data() {
    return {
      heightSize: 20,
      widthSize: 20,
    }
  },

  methods: {
    // Resize the Grid by setting the store's height and width values. Cap at
    // max size 50 (or so), because it gets slow even at that size.
    applySize() {
      var max = 50
      if(this.heightSize > max)
        this.heightSize = max
      if (this.widthSize > max)
        this.widthSize = max

      this.$store.dispatch('SET_BOARD_HEIGHT', Number(this.heightSize))
      this.$store.dispatch('SET_BOARD_WIDTH', Number(this.widthSize))
    },//applySize
  },//methods

}
</script>

<style lang="scss" scoped>
//Taken from:
//https://stackoverflow.com/questions/38366411/keep-input-placeholder-always-visible
.fieldOuter {
  position: relative;
  // margin: 0 0 30px 0;
  // font-family: impact;
  font-size: 16px;
}
.fieldOuter input {
  padding: 3px;
  width: 40px;
  transition: all 1s;
  // border: 1px solid rgb(31, 27, 27);
  // font-size: 17px;
  text-align: center;
  color: #666
}
.fieldOuter label {
  position: absolute;
  left: -5px;
  top: 35px;
  line-height:25px;
  transition: all 0.5s;
  overflow: hidden;
  color: #999;
  white-space: nowrap;
  z-index: 1;
  opacity: 1;
}
.fieldOuter input:focus + label {
  opacity: 1;
  top: 48px;
}
.fieldOuter input:focus {
  outline: none;
  // border-color: rgba(82, 168, 236, 0.8);
}

</style>
