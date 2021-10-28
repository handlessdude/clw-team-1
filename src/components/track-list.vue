<template>
  <div class="track-list">
    <h3 style="margin:15px;">Каталог треков</h3>
    <!-- v-if removes node from DOM tree completely.
         if you want to keep it in DOM tree, use v-show
    -->
    <div v-if="tracks.length > 0" class="track-list-grid">
      <transition-group name="track-list">
        <track-item
            v-for="track in tracks"
            :track="track"
            :key="track.id"
            @remove="$emit('remove', track)"
        />
      </transition-group>

    </div>
    <p v-else>Каталог треков пуст.</p>
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
  .track-list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .track-list-enter-active,
  .track-list-leave-active {
    transition: all 0.5s ease;
  }
  .track-list-enter-from,
  .track-list-leave-to {
    opacity: 0;
    transform: translateX(-200px);
  }
  .track-list-move {
    transition: transform 0.5s ease;
  }
</style>
