<template>
  <sidebar></sidebar>
  <div class="app" :style="{ marginLeft: getSidebarWidth }">
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from "./components/sidebar";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    Sidebar,
  },
  computed: {
    ...mapGetters({
      getSidebarWidth: "sidebar/getSidebarWidth",
    }),
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app{
  padding:20px;
}
h3{
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
}
h4{
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 1em;
}
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #122523;
  color: #5daba4;*/
  color: #343434;
  height: 100vh;
  /*
  background: linear-gradient(220.16deg, #25414d -6%, #380c49  138%);*/
  background: #f2f2f2;
}
</style>
