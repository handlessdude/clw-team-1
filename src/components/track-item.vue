<template>
  <div
    class="track-item"
    @click="$router.push(`/tracks/${track.id}`)"
    :style="{
      backgroundImage: `url(&quot;${this.$store.state.server}/${track.data.previewPicture}&quot;)`,
    }"
  >
  <div class="track-list-item-bl">
    <div class="track-info">
      <h2>{{ track.data.name }}</h2>
    </div>
    <div class="track-item__btns">
      <my-button-re
          v-if="this.$store.state.actualUser.roles.includes('teacher')"
          @click.stop="$emit('remove', track.id)"
      >
        Удалить</my-button-re>
    </div>
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
  min-height: 120px;
  font-size: 12px;
  /*border: 3px solid teal;*/
  border-radius: 50px;
  background-size: cover;
  color: #ffffff;
}
.track-list-item-bl {
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 50px;
  background-color:rgba(0,0,0,.4);
  background-size: cover;
  min-height: 160px;
  box-sizing: border-box;
  overflow: hidden;
}

.track-item:hover {
  cursor: pointer;
  box-shadow: 0 0 15px -5px black;
  transform: scale(1.01);
  animation-duration: 1s;
}
.track-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 110%;
  height: 54%;
  padding-left: 16px;
  padding-right: 16px;
 /* background-color: rgba(58, 58, 58, 0.65);*/
}
/*.track-item__btns {
  background-color: #ffffffa6;
  border-radius: 50px;
}*/
</style>
