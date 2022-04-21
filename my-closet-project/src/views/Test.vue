<template>
    <div class="container">
        <div v-if="!image">
        <h5>1. 이미지 불러오기</h5>
            <input type="file" @change="getImage">
        </div>
        <div v-else>
            <img :src="image" class="rounded"/>
            <button @click="remove">Remove image</button>
        </div>
        <h5>2. 정사각형 자르기</h5>

        <h5>3. 정보 입력하기</h5>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const image = ref(null)
        const getImage = (event) => {
            let file = event.target.files || event.dataTransfer.files
            if (!file) return
            let img = new Image()
            let reader = new FileReader()
            reader.onload = (e) => {
                image.value = e.target.result
            }
            reader.readAsDataURL(file[0])
        }
        const remove = () => {
            image.value = null
        }
        // 여기부터
        const resize = () => {

        }

        return {getImage, image, remove}
    },
}
</script>