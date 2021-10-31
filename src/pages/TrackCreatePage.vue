<template>
<div>
  <my-link style="width: 40px;" to="/tracks" icon="fas fa-door-open"></my-link>
  <h1>Создание трека</h1>
  <track-form></track-form>
</div>
</template>

<script>
import TrackForm from '@/components/track-form'
export default {
  name: "TrackCreatePage",
  components: {
    TrackForm,
  }
}
</script>

<style scoped>

</style>