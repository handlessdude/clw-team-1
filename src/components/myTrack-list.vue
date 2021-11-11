<template>
  <div class="track-list">
    <div class="list-header">
      <h3>Мои треки</h3>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem suscipit alias id </p>
    </div>

    <div v-if="tracks.length > 0" class="track-list-grid">
      <transition-group name="track-list">
        <track-item
            v-for="track in fakeList"
            :track="track"
            :key="track.id"
            @remove="$emit('remove', track.id)"
        />
      </transition-group>

    </div>
    <p v-else>Каталог треков пуст.</p>
  </div>
</template>

<script>

import TrackItem from "./track-item"

export default {
  name: "my-track-list",
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
  computed: {
    //   !!fake list!!!
    fakeList() {
        return this.tracks.filter(el => {
           return el.id % 2 === 0
        })
    }
  },
}
</script>

<style scoped>
  .list-header{
    height: 30vh;
    margin: 20px 0 20px 0;
    color: white;
    border-radius: 50px;
    background-image: url(Images/Header.png);
    background-size: cover;
    text-align: left;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    row-gap: 20px;
    padding: 30px;
  }
  .track-list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 20px;

  }
  .track-list-grid{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 15px;
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
  @media (max-width: 1100px){
    .track-list-grid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10px;
    row-gap: 1em;
  }
  }
  @media (max-width: 725px){
    .track-list-grid{
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    column-gap: 10px;
    row-gap: 1em;
  }
  }
</style>
