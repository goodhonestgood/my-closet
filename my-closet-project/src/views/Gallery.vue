<template>
    <FilterNav @filter="filtered"/>
    <div class="container">
        <div v-if="true" class="row">
            <div class="col-lg-4 col-sm-12 col-md-4 mb-2" v-for="clothe in clothes" >
                <div class="card" style="width: 18rem;">
                    <img :src="clothe.imgsrc" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{clothe.category}}</h5>
                        <p class="card-text">{{clothe.hashtags}}</p>
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
import { ref, computed } from 'vue'
export default {
    setup() {
        const currentPage = ref("all")
        const clothes = ref([{'category':'상의','seasons':['봄'],'hashtags':['#hashtag'], 'imgsrc': 'https://images.unsplash.com/photo-1583846724527-80ceecb9b80c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'}])
        const filtered = (category) => {
            currentPage.value = category
            console.log(currentPage.value)
        }
        return {currentPage, clothes, filtered}
    },
    components : {
        FilterNav,
    }
}
</script>

<style scoped>

</style>le