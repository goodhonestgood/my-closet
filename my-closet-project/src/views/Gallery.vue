<template>
    <div class="container">
      <div class="mt-1 mb-3">
        <ul class="nav justify-content-center text-dark">
          <li v-for="value in clickStyle" class="nav-item">
            <button class="nav-link btn fs-4" :class="{ 'text-success' : value == currentPage }" @click="filtered(value)"> {{value}} </button>
          </li>
        </ul>
      </div>
        <div v-if="Object.keys(clothes).length>0" class="row">
            <div class="col-lg-4 col-md-6 col-sm-6 mb-2" v-for="(value,key) in clothes" >
                <div class="card" style="width: 300px;">
                    <div
                        id="card-img-top"
                        class=""
                        @click.self="mouseDown"
                    >   
                        <img :src="key" alt="이미지" style="max-width:300px;"/>
                        <i
                        class ="position-absolute translate-middle far fa-solid fa-magnifying-glass-plus"
                        v-for ="(each, index) in value"
                        :key  ="index"
                        :style="{top:fiveToThree(each.xy[1])+'px',left:fiveToThree(each.xy[0])+'px'}"
                        @click.stop="moreInfo(each)"
                        type="button"
                        ></i>
                    </div>
                    <div class="card-body">
                        <p class="card-text"><span v-for="li in value">{{li.hashtags}}&nbsp;</span></p>                    </div>
                </div>
            </div>
        </div>
        <div v-else> 없습니다 </div>
        <InfoModal class="" @close="toggleModal" :modalActive ="modalActive">
            <p class="fs-4 difont" v-for="(info,key) in curModal">{{info}}</p>
        </InfoModal>
    </div>
</template>

<script>
import { ref, onUpdated, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import InfoModal from '../components/InfoModal.vue';
import data from '../assets/data.json';
export default {
    components: { InfoModal },
    setup() {
        const router = useRouter()
        const route = useRoute()
        const clothes = computed(()=>{
            let datas = data.data;
            if (currentPage.value === "모두") return datas;
            let temp = {};
            for(let d in datas) {
                for(let i = 0; i < datas[d].length; i++) {
                    if (datas[d][i].radioCategory === currentPage.value){
                        temp[d] = datas[d];
                        break;
                    }
                }
            }
            console.log(currentPage.value+'는 ', temp)
            return temp;
        })

        /**현재 카테고리 */
        let currentPage = computed(()=>route.params.sort)
        let clickStyle = ref(['모두','아웃웨어','드레스','상의','하의','모자','가방','신발','악세서리'])
        const filtered = (category) => {
          router.push({name:'open', params: {'sort':category}})
        }
        
        /**modal 관련 */
        let modalActive = ref(false)
        const toggleModal = () => {
            modalActive.value = !modalActive.value
            console.log(modalActive.value)
        }
        let curModal = ref(null)
        const moreInfo = (each) => {
            console.log('moreInfo: ',[each.xy[1], each.xy[0]])
            curModal.value = each
            toggleModal()
        }


        const fiveToThree = (number) => {
            number = number.slice(0,-2);
            return number*3/5
        }

        onUpdated(()=>{
            console.log(currentPage.value)
            console.log(clothes.value)
            if (clothes.value.length>0) {
              console.log(clothes.value[0])
            }
            /** currentPage가 바뀔 때 데이터베이스 조회하기
            fetch("/db/getdatas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({'sort':'radioCategory','data':category}),
            })
            .then(response => response.json())
            .then(json => {
                let temp = [];
                for(var object in json) {
                    temp.push(json[object]);
                };
                clothes.value = temp;
            });*/
        })
        return {currentPage, clothes, filtered, clickStyle, fiveToThree, moreInfo, toggleModal, modalActive, curModal}
    }
}
</script>

<style scoped>

.difont {
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: black;
}
</style>