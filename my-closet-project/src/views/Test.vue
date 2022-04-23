<template>
    <div class="container">
        <div v-if="!image">
        <h5>1. 이미지 불러오기</h5>
            <input type="file" @change="getImage">
        </div>
        <div v-else>
            <canvas ref="canvas" width="500px" height="500px"></canvas>
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
        const canvas = ref(null)
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
        // 이미지 리사이즈
        const reSize = (result) => {
            
            console.log()
            /*
            const ctx = canvas.getContext('2d')
            let image = new Image()
            image.src = result
            image.onload = () => {
                ctx.drawImage(image, 150, 200, 500, 300, 60,60, 500, 500)
            }*/
        }
        
        // 이미지 지우기
        const remove = () => {
            image.value = null
        }
        // 여기부터

        return {getImage, remove, canvas}
    },
}
</script>