<template>
    <div class="container">
        <div v-if="!image">
        <h5>1. 이미지 불러오기</h5>
            <input type="file" @change="getImage">
        </div>
        <div>
            <canvas ref="root" width="500" height="500"></canvas>
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
        // 이미지 가져오기
        const getImage = (event) => {
            let file = event.target.files || event.dataTransfer.files
            if (!file) return
            let reader = new FileReader()
            reader.onload = (e) => {
                reSize(e.target.result)
            }
            reader.readAsDataURL(file[0])
        }
        const root = ref(null)
      
        const reSize = (src) => {
            const ctx = root.value.getContext('2d')
            let image = new Image()
            image.src = src
            let [ w, h ] = [image.width/4,image.height/4] // 여기 고치기
            image.onload = () => {
                ctx.drawImage(image, w,h,500,500,0,0,500,500)
            }
        }
        
        // 이미지 지우기
        const remove = () => {
            image.value = null
        }
        // 여기부터

        return {getImage, remove, root}
    },
}
</script>