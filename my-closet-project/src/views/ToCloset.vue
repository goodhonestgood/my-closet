<template>
    <div class="container">
        <div class="mb-4">
            <button @click="currentPage = 1" type="button" class="btn fs-4" :class="{'btnColor':currentPage==1}">1. 이미지 불러오기</button>
            <button v-if="src" @click="currentPage = 2" type="button" class="btn fs-4" :class="{'btnColor':currentPage==2}">2. 정사각형 자르기</button>
            <button v-if="newURL.length>0" @click="currentPage = 3" type="button" class="btn fs-4" :class="{'btnColor':currentPage==3}">3. 정보 입력하기</button>
        </div>
        <div v-if="currentPage === 1">
            <input type="file" @change="getImage" @drop="getImage">
        </div>
        <div v-if="currentPage === 2">
            <canvas class="mx-auto" ref="root" width="500" height="500"></canvas>
        </div>
        <div v-if="currentPage === 3">
            <addtion v-if="newURL.length>0" :imgURL = "newURL"></addtion>
        </div>
    </div>
</template>

<script>

import { onUpdated, ref } from 'vue';
import addtion from './Addition.vue';

export default {
    components: {
        addtion,
    },
    setup() {
        let currentPage = ref(1);

        // 이미지 가져오기
        const src = ref(null);
        const getImage = (event) => {
            let file = event.target.files || event.dataTransfer.files;
            if (!file) return;
            let reader = new FileReader();
            reader.onload = (e) => {
                src.value = e.target.result;
            };
            reader.readAsDataURL(file[0]);
        }

        // 이미지 리사이즈
        const root = ref(null);
        const reSize = (src) => {
            const ctx = root.value.getContext('2d');
            let image = new Image();
            image.src = src;

            image.onload = () => {
                let [ w, h ] = [image.width/4,image.height/4];
                ctx.drawImage(image, w,h,2*w,2*w,0,0,500,500);
                getNewImage();
            }
        }
        const newURL = ref('');
        // 캔버스 데이터
        const getNewImage = () => {
            newURL.value = root.value.toDataURL('image/jpeg', 'image/octet-stream');
            console.log(newURL.value);
        };

        onUpdated(()=>{
            if(currentPage.value === 2) {
                reSize(src.value); // src가 업데이트되면
            }
        });

        return {getImage, root, src, newURL, currentPage};
    },
};
</script>

<style scoped>
* {
    font-size: 1.1em;
}
.btnColor {
    color: #F0C9C9;
    text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
}

@media ( max-width: 520px ) {
    canvas {
        width:400px;
        height:400px;
    }
}

@media ( max-width: 400px ) {
    canvas {
        width:300px;
        height:300px;
    }
}

</style>