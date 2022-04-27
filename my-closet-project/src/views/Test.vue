<template>
    <div class="container">
        <div v-if="!src">
            <h5>1. 이미지 불러오기</h5>
            <input type="file" @change="getImage">
        </div>
        <div v-else>
            <img :src="src" alt=""/>
            <h5>2. 정사각형 자르기</h5>
            <canvas ref="root" width="500" height="500"></canvas>
        </div>
        <!-- <h5>3. 정보 입력하기</h5>
        <addtion v-show="newURL.length>0" :imgURL = "newURL"></addtion> -->
    </div>
</template>

<script>
import addtion from './Addition.vue'
import { onUpdated, ref } from 'vue'
export default {
    components: {
        addtion,
    },
    setup() {
        // 이미지 가져오기
        const src = ref(null)
        const getImage = (event) => {
            let file = event.target.files || event.dataTransfer.files
            if (!file) return
            let reader = new FileReader()
            reader.onload = (e) => {
                src.value = e.target.result
            }
            reader.readAsDataURL(file[0])
        }

        // 이미지 리사이즈
        const root = ref(null)
        const reSize = (src) => {
            const ctx = root.value.getContext('2d')
            let image = new Image()
            image.src = src
            
            image.onload = () => {
                let [ w, h ] = [image.width/4,image.height/4]
                ctx.drawImage(image, w,h,2*w,2*w,0,0,500,500)
                getNewImage()
            }
        }
        const newURL = ref('')
        // 캔버스 데이터
        const getNewImage = () => {
            newURL.value = root.value.toDataURL()
            console.log(newURL.value)
        }

        onUpdated(()=>{
            reSize(src.value) // src가 업데이트되면
        })

        return {getImage, root, src, newURL}
    },
}
</script>