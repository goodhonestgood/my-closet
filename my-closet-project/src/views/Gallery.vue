<template>
    <div class="container">
        <FilterNav @filter="filtered"/>
        <div v-if="true" class="row">
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
import FilterNav from '../components/FilterNav.vue'
import { ref, onUpdated, onMounted } from 'vue'
export default {
    setup() {
        const currentPage = ref("");
        let clothes = ref([]);
        const filtered = (category) => {
            currentPage.value = category
            /** 데이터베이스 조회하기
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
        }

        onUpdated(()=>{
            console.log(clothes.value ? clothes.value[0][0] : '검색 결과가 없습니다.')
        })

        onMounted(()=>{
            filtered('모두');
        })
        return {currentPage, clothes, filtered}
    },
    components : {
        FilterNav,
    }
}
</script>

<style scoped>

</style>