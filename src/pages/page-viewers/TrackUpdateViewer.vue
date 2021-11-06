<template>
  <Suspense>
    <template #default>
      <TrackUpdatePage/>
    </template>
    <template #fallback>
      <preloader/>
    </template>
  </Suspense>
</template>

<script>
import TrackUpdatePage from "@/pages/TrackUpdatePage"
export default {
  name: "TrackUpdateViewer",
  components: {
    TrackUpdatePage
  },
}
</script>

<style scoped>

</style>