<template>
  <div id="app">
    <main-wrapper/>
  </div>
</template>

<script>

import MainWrapper from './components/main-wrapper'

export default {
  name: 'App',
  components: {
    MainWrapper
  },

}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  padding: 0;
  color: #122523;
  height: 100vh;
  width: 100vw;
  /*background: linear-gradient(220.16deg, #25414d -6%, #380c49  138%);*/
}
</style>
