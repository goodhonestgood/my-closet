<template>
  <div class="row">
    <div class="col-3">
      <div class="col h-25 w-100" @click="router.push('/ToCloset')"><img src="../assets/LogoSample.jpg" alt=""></div>
      <div class="col h-75 w-100" @click="nextPage('긴 상의')"><img class="w-100" src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" alt="긴 상의"/></div>
    </div>
    <div class="col-6">
      <div class="col h-50 w-100" @click="nextPage('짧은 상의')"><img class="w-100" src="https://images.unsplash.com/photo-1613461920867-9ea115fee900?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" alt="짧은 상의"/></div>
      <div class="col h-25 w-100" @click="nextPage('바지')"><img class="w-100" src="https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" alt="바지"/></div>
      <div class="col h-25 w-100" @click="nextPage('바지2')"><img class="w-100" src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" alt="바지2"/></div>
    </div>
    <div class="col-3">
      <div class="col h-25 w-100" @click="nextPage('모자')"><img class="w-100" src="https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" alt="모자"/></div>
      <div class="col h-25 w-100" @click="nextPage('목')"><img class="w-100" src="https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" alt="목"/></div>
      <div class="col h-25 w-100" @click="nextPage('가방')"><img class="w-100" src="https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" alt="가방"/></div>
      <div class="col h-25 w-100" @click="nextPage('신발')"><img class="w-100" src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" alt="신발"/></div>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router"

export default {
    setup() {
        const router = useRouter()
        const nextPage = (sort) => {
            console.log(sort)
            router.push('/Opencloset')
        }

        return {
            nextPage, router
        }
    },
}
</script>
<style scoped>
.row > div {
    max-height: 580px;
}
img {
    width:100%;
    height:100%;
}

</style>