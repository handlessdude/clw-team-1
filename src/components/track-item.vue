<template>
  <div class="track-item"
       @click="$router.push(`/tracks/${track.id}`)"
       :style='{ backgroundImage: `url("${this.$store.state.server}/${track.data.previewPicture}")` }'
  >
  <div class="track-list-item-bl">
<!--    :style='{ backgroundImage: `url("${this.$store.state.server}/${track.data.previewPicture}")` }'-->
    <div class="track-info">
      <!--      <div><strong>ID трека:</strong> {{ track.id }}</div>-->
      <!--      <div><strong>Название:</strong> {{ track.data.name}}</div>-->
      <!--      <div><strong>Описание:</strong> {{ track.data.previewText }}</div>-->
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
  font-size: 12px;
  border: 3px solid teal;
  border-radius: 50px;
  background-size: cover;
  color: white;
}
.track-list-item-bl {
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 50px;
  background-color:rgba(0,0,0,.4);
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
