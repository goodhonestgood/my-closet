<template>
    <div class="container">
      <div class="mt-1 mb-3">
        <ul class="nav justify-content-center text-dark">
          <li v-for="value in clickStyle" class="nav-item">
            <button class="nav-link btn fs-4" :class="{ 'text-success' : value == currentPage }" @click="filtered(value)"> {{value}} </button>
          </li>
        </ul>
      </div>
        <div v-if="clothes.length>0" class="row">
            <div class="col-lg-4 col-md-4 col-sm-6 mb-2" v-for="data in clothes[0]" >
                <div class="card" style="width: 18rem;">
                    <img :src="data.imgurl" class="card-img-top" alt="이미지">
                    <div class="card-body">
                        <h5 class="card-title">{{data.radioCategory}}</h5>
                        <p class="card-text">{{data.checkedSeasons}}</p>
                        <p class="card-text">{{data.hashtags}}</p>
                        <a href="#" class="btn btn-primary">상세</a>
                    </div>
                </div>
            </div>
        </div>
        <div v-else> 없습니다 </div>
    </div>
</template>

<script>
import { ref, onUpdated, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router';
export default {
    setup() {
        const router = useRouter()
        const route = useRoute()

        let currentPage = computed(()=>route.params.sort)
        let clothes = ref([]);
        let clickStyle = ref(['모두','아웃웨어','드레스','상의','하의','모자','가방','신발','악세서리'])

        const filtered = (category) => {
          router.push({name:'open', params: {'sort':category}})
        }

        onUpdated(()=>{
            console.log(currentPage.value)
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

        return {currentPage, clothes, filtered, clickStyle}
    }
}
</script>

<style scoped>

</style>