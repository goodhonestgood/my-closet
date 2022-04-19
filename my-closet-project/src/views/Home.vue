<template>
  <div class="row" style="min-height:620px;">
    <div class="col-4">
      <div class="col h-25 w-100">LOGO</div>
      <button type="button" @click="nextPage" class="col h-75 w-100"><img class="h-100" src="https://images.unsplash.com/photo-1642665258969-dd29b798a1aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt=""/></button>
    </div>
    <div class="col-6">
      <div class="col h-50 w-100">짧은 상의</div>
      <div class="col h-25 w-100">바지</div>
      <div class="col h-25 w-100">바지2</div>
    </div>
    <div class="col-2">
      <div class="col h-25 w-100">모자</div>
      <div class="col h-25 w-100">목</div>
      <div class="col h-25 w-100">팔</div>
      <div class="col h-25 w-100">신발</div>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router"

export default {
    setup() {
        const router = useRouter()
        const nextPage = () => {
            router.push('/next')
        }

        return {
            nextPage,
        }
    },
}
</script>
<style scoped>
div {
    border: 1px solid black;
}

</style>le