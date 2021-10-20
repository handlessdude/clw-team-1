<template>
  <div class="track-list">
    <h3>Каталог треков</h3>
    <div class="track-list-grid">
      <track-item
         v-for="track in tracks"
         :track="track"
          :key="track.id"/>
  </div>
  </div>


</template>

<script>

import TrackItem from "./track-item"

export default {
  name: "track-list",
  components : {
    TrackItem
  },
  props: {
    tracks:{
      type: Array,
      required: true
    }
  },
  data() {
    return {
      title: 'Track List'
    }
  },
}
</script>

<style scoped>
  .track-list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;

  }
  .track-list-grid{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 10px;
    row-gap: 1em;
  }
</style>