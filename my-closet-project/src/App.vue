<template>
  <router-link to="/" class="btn fs-1">홈</router-link>
  <router-link to="/Tocloset" class="btn fs-1">옷 추가하기</router-link>
  <router-link :to="{name:'open', params: {sort: '모두'}}" class="btn fs-1">옷장</router-link>
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
  margin-top: 20px;
  padding: 30px 20px 30px 20px;
  width: 100%;
  min-height: 580px;
}
.fs-1 {
  color: #4BAEA0;
  text-shadow: -1px 0 rgb(251, 222, 160), 0 1px rgb(251, 222, 160), 1px 0 rgb(251, 222, 160), 0 -1px rgb(251, 222, 160);
}
.fs-1:hover {
  color: rgba(75, 174, 160,0.8);
}
</style>