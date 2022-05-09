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
        'All' : true,
        'Outwear' : false,
        'Dress' : false,
        'Shirts' : false,
        'Pants' : false,
        'Headgear' : false,
        'Bags' : false,
        'Footwear' : false,
        'Bags' : false,
    })
    let curType = 'All'

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