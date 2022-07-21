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
                <div class="card">
                    <div
                        id="card-img-top"
                        class=""
                        @click.self="mouseDown"
                    >   
                        <img :src="cloth.imgsrc" alt="이미지" ref="relateImg"/>
                        <i
                        class ="position-absolute translate-middle far fa-solid fa-magnifying-glass-plus"
                        v-for ="(each, index) in cloth.points"
                        :key  ="index"
                        :style="{top:fiveToThree(each.xy[1], cloth.imgSize)+'px',left:fiveToThree(each.xy[0], cloth.imgSize)+'px'}"
                        @click.stop="moreInfo(each)"
                        type="button"
                        ></i>
                    </div>
                    <div class="card-body">
                        <div class="card-text">&nbsp;<span v-for="each in cloth.points"><span v-for="tag in each.hashtags">{{tag}}&nbsp;</span></span></div>
                        <div><button @click="removing(cloth.files_id)">remove</button></div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else> 없습니다 </div>
        <InfoModal v-if="curModal !== null"  @close="toggleModal" :modalActive ="modalActive">
            <p class="fs-5 difont">{{curModal.radioCategory}}</p>
            <p class="fs-5 difont"><a :href="curModal.link">{{curModal.link}}<span v-if="curModal.link">...</span></a></p>
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
        const relateImg = ref(null);

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

        /** 이미지 비율 조정 */
        const fiveToThree = (number, imgSize) => {
            number = number.slice(0,-2);
            var size = window.innerWidth;
            if (size <= 400) return number*300/imgSize;
            else if (size <= 700) return number*400/imgSize;
            else return number*300/imgSize;
        };

        const removing = async (files_id) => {
            //const res = await axios.post('http://localhost:8081/datas/delete', {files_id});
            if(res.data !== '') router.go(); // 새로고침
        }

        const getdatas = async (cate) => {
            /*
            const sort = { radioCategory : cate };
            const res = await axios.post('http://localhost:8081/datas', sort);
            clothes.value = res.data;
            console.log(clothes.value)*/
            clothes.value = [{"imgSize":500,"imgsrc":"/closest/img.jpg","points":[{"xy":["318px","293px"],"checkedSeasons":["가을","겨울"],"radioCategory":"상의","hashtags":["#red","#니트"],"link":"www.a.com"},{"xy":["365px","15px"],"checkedSeasons":["가을","겨울"],"radioCategory":"모자","hashtags":["#check"],"link":"www.a.com"},{"xy":["433px","357px"],"checkedSeasons":["겨울"],"radioCategory":"아우터","hashtags":["#따듯함"],"link":"www.a.com"}]}]
        };
        
        onMounted(()=>{
            getdatas(route.params.sort);
        });
        return {currentPage, clothes, filtered, clickStyle, fiveToThree, moreInfo, toggleModal, modalActive, curModal, removing, relateImg};
    }
};
</script>

<style scoped>
.difont {
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: black;
}

@media (max-width: 400px) {
    .card {
        width: 300px;
    }
}
@media (min-width: 401px) and (max-width: 700px) {
    .card {
        width: 400px;
    }
}

@media (min-width: 701px) {
    .card {
        width: 300px;
    }
}

.card img {
    width:100%;
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

</style>