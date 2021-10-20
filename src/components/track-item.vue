<template>
  <div class="track-item">
    <div class="track-info">
      <div><strong>ID трека:</strong> {{ track.id }}</div>
      <div><strong>Название:</strong> {{ track.data.name}}</div>
      <div><strong>Описание:</strong> {{ track.data.previewText }}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "track-item",
  props:{
    track: {
      type: Object,
      required: true,
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
  justify-content:center;
}
.track-info{
  display: flex;
  flex-direction: column;
}

/*.track-item__btns {
  display: flex;
}*/
</style>