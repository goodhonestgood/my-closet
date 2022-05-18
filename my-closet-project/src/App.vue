<template>
  <router-link to="/" class="btn fs-2">홈</router-link>
  <router-link to="/Tocloset" class="btn fs-2">옷 추가하기</router-link>
  <router-link to="/Opencloset" class="btn fs-2">옷장</router-link>
  <hr />
  <router-view class="opaque"/>
</template>

<style lang="scss">
@import "bootstrap/scss/bootstrap";
@font-face {
  font-family: 'GilbeotRainbow';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/GilbeotRainbow.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
#app {
  font-family: GilbeotRainbow, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.opaque {
  margin: 0 auto;
  padding: 30px 30px 20px 20px;
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  min-height: 600px;
  height: 80%;
}
</style>