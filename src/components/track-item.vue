<template>
  <div
    class="track-item"
    @click="$router.push(`/tracks/${track.id}`)"
    :style="{
      backgroundImage: `url(&quot;${this.$store.state.server}/${track.data.previewPicture}&quot;)`,
    }"
  >
    <div class="track-info">
      <h2>{{ track.data.name }}</h2>
    </div>
    <div class="track-item__btns">
      <my-button
        v-if="this.$store.state.actualUser.roles.includes('teacher')"
        @click.stop="$emit('remove', track.id)"
      >
        Удалить</my-button
      >
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
};
</script>

<style scoped>
.track-item {
  padding: 15px;
  font-size: 12px;
  border: 2px solid teal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 50px;
  background-size: cover;
  min-height: 160px;
  box-sizing: border-box;
  overflow: hidden;
}

.track-item:hover {
  cursor: pointer;
  box-shadow: 0 0 15px -5px #000;
}
.track-item:active {
  cursor: pointer;
  box-shadow: 0 0 10px -5px #000;
}
.track-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 110%;
  height: 54%;
  padding-left: 16px;
  padding-right: 16px;
  background-color: #ffffffa6;
}
.track-item__btns {
  background-color: #ffffffa6;
  border-radius: 50px;
}
</style>
