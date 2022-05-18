<template>
  <div class="mt-1 mb-3">
    <ul class="nav justify-content-center text-dark">
      <li v-for="(key,value) of clickStyle" class="nav-item">
        <button class="nav-link btn fs-4" :class="{ 'text-success' : key }" @click="typeClick(value)"> {{value}} </button>
      </li>
    </ul>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  setup(props, {emit}) {
    let clickStyle = ref({
        '모두' : true,
        '아웃웨어' : false,
        '드레스' : false,
        '상의' : false,
        '하의' : false,
        '모자' : false,
        '가방' : false,
        '신발' : false,
        '악세서리' : false,
    })
    let curType = '모두'

    const typeClick = (type) => {
        clickStyle.value[curType] = false
        clickStyle.value[type] = true
        curType = type
        emit('filter', curType)
    }
    return { typeClick, clickStyle }
  },
}
</script>

<style scoped>
button {
  color: rgb(126, 111, 9);
}
</style>