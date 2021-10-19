<template>
  <div class="v-main-wrapper">
    <p>{{title}}</p>
    <p>{{ getCostList }}</p>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"

export default {
  name: "v-main-wrapper",
  components : {},
  props: {},
  data() {
    return {
      title: 'Main Wrapper'
    }
  },
  computed: {
    ...mapGetters(['getCostList']),
  },
  methods: {
     ...mapActions(['fetchCosts']),
  },
  watch: {},
  mounted() {
    console.log('The app has been planted.')
    this.fetchCosts()
  }
}
</script>

<style>   
  .v-main-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
</style>