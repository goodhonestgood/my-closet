<template>
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
      @click.stop="moreInfo(each)"
      @dblclick.stop="deleteIcon(index)"
      type="button"
    ></i>
  </div>
  <InfoModal class="" @close="toggleModal2" :modalActive ="modalActive">
        <div v-for="cate in categories" class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" :value="cate" v-model="temporary.radioCategory">
            <label class="form-check-label">{{cate}}</label>
        </div>
        <hr />
        <div v-for="sea in seasons" class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" name="inlineRadioOptions" :value="sea" v-model="temporary.checkedSeasons">
            <label class="form-check-label">{{sea}}</label>
        </div>
        <hr />
        <div class="mb-3">
            <input type="text" class="form-control mb-2" placeholder="해시태그" v-model="temporary.hashtags"/>
            <input type="text" class="form-control" placeholder="링크" v-model="temporary.link"/>
        </div>
        <button @click.stop="tempStore" class="btn btn-outline-secondary" type="button" id="button-addon2">임시 저장</button>
    </InfoModal>
  <button class="relative-element btn btn-success" @click="submit">저장</button>
  <p class="relative-element" >{{}}</p>
</template>

<script>

import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import InfoModal from '../components/InfoModal.vue'

export default {
    props: ['imgURL',],
    setup(props) {
        const router = useRouter()

        /**임시 저장 */
        let temporary = {
            'radioCategory': null,
            'checkedSeasons': [],
            'hashtags': null,
            'link': null,
        }
        const tempValues = ref({})
        const tempStore = () => {
            tempValues.value[curModal.value] = {
                'radioCategory': temporary.radioCategory,
                'checkedSeasons': temporary.checkedSeasons,
                'hashtags': temporary.hashtags,
                'link': temporary.link,
            }
            console.log(tempValues.value)
            toggleModal2()
        }
        const initTemp = () => {
            // 초기화
            temporary['radioCategory'] = null
            temporary['checkedSeasons'] = []
            temporary['hashtags'] = null
            temporary['link'] = null
        }

        /**이미지 불러오기 */
        const imgurl = (props.imgURL)
        
        /**이미지 위에 버튼 만들기 */
        const boxChilds = reactive([])
        const mouseDown = (e) => {
            console.log('mousedown')
            if (boxChilds.length > 7) return;
            const childStyle = { 
                left            : e.offsetX + 'px',
                top             : e.offsetY + 'px',
            }
            boxChilds.push(childStyle)
            moreInfo(boxChilds[boxChilds.length-1])
        }

        /**modal 관련 */
        let modalActive = ref(false)
        const toggleModal = () => {
            modalActive.value = !modalActive.value
            console.log(modalActive.value)
        }
        const toggleModal2 = () => {
            initTemp()
            toggleModal()
        }
        let curModal = ref(null)
        const moreInfo = (each) => {
            console.log('moreInfo: ',[each.top, each.left])
            curModal.value = [each.top, each.left]
            toggleModal()
        }
        const deleteIcon = (index) => {
            boxChilds.splice(index, 1);
        }


        // 데이터베이스에 입력
        const submit = () => {
            console.log("데이터베이스에 입력")
            router.push('/')
            /*tempValues.value['imgurl'] = imgurl.slice(-10,imgurl.length);
            fetch("/db/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tempValues.value)
            }).then((res)=> console.log(res))*/
        }

        const categories = reactive(['상의','하의','드레스','아우터','악세서리','모자','신발','가방'])
        const seasons = reactive(['봄','여름','가을','겨울'])
        return { tempStore, temporary, seasons, categories, boxChilds, mouseDown, moreInfo, deleteIcon, imgurl, modalActive, toggleModal, toggleModal2, submit }

    },
    components: { InfoModal }
    
}

</script>

<style lang="scss" scoped>
#box {
    position          : relative;
    left              : 50%;
    top               : 0;
    transform         : translate(-50%,0%);
    width             : 500px;
    height            : 500px;
    overflow          : hidden;
}

@media ( max-width: 520px ) {
    #box {
        width:400px;
        height:400px;
    }
}

.relative-element {
position          : relative;
top               : 10px;
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