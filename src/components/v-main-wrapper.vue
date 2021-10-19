<template>
  <div class="v-main-wrapper">
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  name: "v-main-wrapper",
  components : {},
  props: {},
  data() {
    return {
      title: 'Main Wrapper'
    }
  },
  computed: {},
  methods: {},
  watch: {},
  mounted() {
    console.log('The app has been planted.')
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