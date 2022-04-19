<template>
<div class="container">
  <div
    id="box"
    @click="mouseDown"
    :style="{background: 'url('+imgurl+') no-repeat center center fixed'}"
  >
    <i
      class ="position-absolute translate-middle far fa-solid fa-magnifying-glass-plus"
      v-for ="(each, index) in boxChilds"
      :key  ="index"
      :style="each"
      @click.stop="moreInfo"
      @dblclick.stop="deleteIcon(index)"
      type="button"
    ></i>
  </div>
  <button class="relative-element btn btn-success" @click="submit">저장</button>
</div>
</template>

<script>

  import { reactive, computed } from 'vue'

  export default {
    
    setup(props) {

      const boxChilds = reactive([])
      const imgurl = reactive('https://cdn.shopify.com/s/files/1/0562/4971/2815/files/f19_m1_540x.jpg')
      function mouseDown(e) {

        const childStyle = { 
          left            : e.offsetX + 'px',
          top             : e.offsetY + 'px',
        }

        boxChilds.push(childStyle)

      }

      const moreInfo = (e) => { console.log("click") }

      const deleteIcon = (i) => {
          boxChilds.splice(i, 1);
      }

      return { boxChilds, mouseDown, moreInfo, deleteIcon, imgurl }

    }
    
  }

</script>

<style scoped>

  #box {
    position          : relative;
    left              : 50%;
    top               : 0;
    transform         : translate(-50%,10%);
    width             : 400px;
    height            : 400px;
    overflow          : hidden;
  }

  .relative-element {
    position          : relative;
    top               : 50px;
    left              : 0px;
    transform         : translate(0%,50%);
    overflow          : hidden;
  }
  
</style>