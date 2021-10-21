<template>
  <div class="track-item">
    <div class="track-info">
      <div><strong>ID трека:</strong> {{ track.id }}</div>
      <div><strong>Название:</strong> {{ track.data.name}}</div>
      <div><strong>Описание:</strong> {{ track.data.previewText }}</div>
    </div>
    <div class="track-item__btns">
      <my-button
          @click="$emit('remove', track)"
      >
        Удалить</my-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "track-item",
  components: {

  },
  props:{
    track: {
      type: Object, //type of out prop 'track'
      required: true, //info about track is sufficient
    }
  }
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
.track-info{
  display: flex;
  flex-direction: column;
}
.track-info *{
  text-align:left;
}
.track-item__btns {
  display: flex;
}
</style>