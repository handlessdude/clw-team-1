<template>
  <div class="track-item" @click="$router.push(`/tracks/${track.id}`)">
    <div class="track-info">
      <!--      <div><strong>ID трека:</strong> {{ track.id }}</div>-->
      <!--      <div><strong>Название:</strong> {{ track.data.name}}</div>-->
      <!--      <div><strong>Описание:</strong> {{ track.data.previewText }}</div>-->
      <h3>{{ track.data.name }}</h3>
    </div>
    <div class="track-item__btns">
      <my-button
          @click.stop="$emit('remove', track)"
      >
        Удалить</my-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "track-item",
  props: {
    track: {
      type: Object, //type of out prop 'track'
      required: true, //info about track is sufficient
    },
  },
}
</script>

<style scoped>
.track-item {
  padding: 15px;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
}
.track-item:hover {
  cursor: pointer;
}
.track-info {
  display: flex;
  flex-direction: column;
}
.track-info * {
  text-align: left;
}
.track-item__btns {
  display: flex;
}
</style>
