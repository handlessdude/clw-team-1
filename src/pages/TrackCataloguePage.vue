<template>
 <div class="track-catalogue-page">
<!--   TODO auth-conditional switcher for <all tracks/my tracks>(student)
        and <createTrack>(teacher)-->
<!--   TODO decompose main-wrapper:
        pull out the dialog window with post track form-->
<main-wrapper></main-wrapper>
 </div>
</template>

<script>
import MainWrapper from "../components/main-wrapper"
export default {
  name: "track-catalogue-page",
  components: {
    MainWrapper
  }
}
</script>

<style scoped>

</style>