<template>
    <div class="container">
      <div class="mt-1 mb-3">
        <ul class="nav justify-content-center">
          <li v-for="value in clickStyle" class="nav-item">
            <button class="nav-link btn fs-4" :class="{ 'clicked' : value == currentPage }" @click="filtered(value)"> {{value}} </button>
          </li>
        </ul>
      </div>
        <div v-if="clothes.length>0" class="row">
            <div class="col-lg-4 col-md-6 col-sm-12 mb-2" v-for="cloth in clothes" >
                <div class="card" style="width: 300px;">
                    <div
                        id="card-img-top"
                        class=""
                        @click.self="mouseDown"
                    >   
                        <img :src="'data:image/jpeg;base64,'+ cloth.imgsrc" alt="이미지" style="max-width:300px;"/>
                        <i
                        class ="position-absolute translate-middle far fa-solid fa-magnifying-glass-plus"
                        v-for ="(each, index) in cloth.points"
                        :key  ="index"
                        :style="{top:fiveToThree(each.xy[1])+'px',left:fiveToThree(each.xy[0])+'px'}"
                        @click.stop="moreInfo(each)"
                        type="button"
                        ></i>
                    </div>
                    <div class="card-body">
                        <p class="card-text">&nbsp;<span v-for="each in cloth.points"><span v-for="tag in each.hashtags">{{tag}}&nbsp;</span></span></p>                    </div>
                </div>
            </div>
        </div>

        <div v-else> 없습니다 </div>
        <InfoModal v-if="curModal !== null"  @close="toggleModal" :modalActive ="modalActive">
            <p class="fs-5 difont">{{curModal.radioCategory}}</p>
            <p class="fs-5 difont"><a :href="curModal.link">{{curModal.link.slice(0,10)}}<span v-if="curModal.link.length>10">...</span></a></p>
            <p class="fs-5 difont"><span style="background-color:beige;" v-for="(each,idx) in curModal.checkedSeasons">{{each}}<span v-if="idx !== curModal.checkedSeasons.length-1">,&nbsp;</span></span></p>
            <p class="fs-5 difont"><span style="background-color:beige;" v-for="tag in curModal.hashtags">{{tag}}&nbsp;</span></p>
        </InfoModal>
    </div>
</template>

<script>
import { ref, onUpdated, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

import InfoModal from '../components/InfoModal.vue';

export default {
    components: { InfoModal },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const clothes = ref([]);

        /**현재 카테고리 */
        let currentPage = computed(()=>route.params.sort);
        let clickStyle = ref(['모두','아웃웨어','드레스','상의','하의','모자','가방','신발','악세서리']);
        const filtered = (category) => {
            getdatas(category);
            router.push({name:'open', params: {'sort':category}});
        };
        
        /**modal 관련 */
        let modalActive = ref(false);
        const toggleModal = () => {
            modalActive.value = !modalActive.value;
            console.log(modalActive.value);
        }
        let curModal = ref(null);
        const moreInfo = (each) => {
            console.log('moreInfo: ',[each.xy[1], each.xy[0]]);
            curModal.value = each;
            toggleModal();
        }


        const fiveToThree = (number) => {
            number = number.slice(0,-2);
            return number*3/5;
        };


        const getdatas = async (cate) => {
            const sort = { radioCategory : cate };
            const res = await axios.post('http://localhost:8081/datas', sort);
            clothes.value = res.data;
        };
        
        onMounted(()=>{
            getdatas(route.params.sort);
        });
        return {currentPage, clothes, filtered, clickStyle, fiveToThree, moreInfo, toggleModal, modalActive, curModal};
    }
};
</script>

<style scoped>
.container {
    border: dashed 5px #4BAEA0;
}
.difont {
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: black;
}

button {
    color: #F0C9C9;
    text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
}

button:hover {
    color: rgba(240, 201, 201, 0.9)
}

.clicked {
    color: #B6E6BD;
}

div.row {
    margin: 0 auto;
}
</style>