<template>
  <Suspense>
    <template #default>
      <TrackPage/>
    </template>
    <template #fallback>
      <preloader/>
    </template>
  </Suspense>
</template>

<script>
import TrackPage from "@/pages/TrackPage"
export default {
  name: "TrackViewer",
  components: {
    TrackPage
  },
}
</script>

<style scoped>

</style>