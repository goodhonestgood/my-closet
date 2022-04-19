<template>
<div class="container">
  <div
    id="box"
    @click.self="mouseDown"
    :style="{background: 'url('+imgurl+') no-repeat center center fixed'}"
  >
    <i
      class ="position-absolute translate-middle far fa-solid fa-magnifying-glass-plus"
      v-for ="(each, index) in boxChilds"
      :key  ="index"
      :style="each"
      @click.stop="moreInfo(index)"
      @dblclick.stop="deleteIcon(index)"
      type="button"
    ></i>
    <InfoModal class="position-relative" @close="toggleModal" :modalActive ="modalActive">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="입력" aria-label="Recipient's username" aria-describedby="button-addon2">
        <button @click.stop="toggleModal" class="btn btn-outline-secondary" type="button" id="button-addon2">임시 저장</button>
    </div>
    </InfoModal>
  </div>
  <button class="relative-element btn btn-success" @click="submit">저장</button>
</div>

</template>

<script>

import { reactive, ref } from 'vue'
import InfoModal from '../components/InfoModal.vue'

export default {
    setup() {

        const boxChilds = reactive([])
        const imgurl = reactive('https://cdn.shopify.com/s/files/1/0562/4971/2815/files/f19_m1_540x.jpg')
        const mouseDown = (e) => {
            console.log('mousedown')
            if (boxChilds.length > 7) return;
            const childStyle = { 
                left            : e.offsetX + 'px',
                top             : e.offsetY + 'px',
            }
            boxChilds.push(childStyle)
            toggleModal()
        }
        let modalActive = ref(false)
        const toggleModal = () => {
            modalActive.value = !modalActive.value
            console.log(modalActive.value)
        }
        const moreInfo = (i) => {
            toggleModal()
        }
        const deleteIcon = (i) => {
            boxChilds.splice(i, 1);
        }

        return { boxChilds, mouseDown, moreInfo, deleteIcon, imgurl, modalActive, toggleModal }

    },
    components: { InfoModal }
    
}

</script>

<style lang="scss" scoped>
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

i {
    &:hover {
        color: whitesmoke;
    }
}
  
</style>