<template>
    <div v-if="trackDetails.length > 0" class="track-detail-list">
      <transition-group name="track-detail-list">
        <track-detail
            v-for="trackDetail in trackDetails"
            :trackDetail="trackDetail"
            :key="trackDetail.id"
            @remove="$emit('remove', trackDetail.id)"
        />
      </transition-group>
    </div>
    <p v-else>Курс не содержит элементов.</p>
</template>

<script>
import TrackDetail from "./track-detail-item";

export default {
  name: "track-detail-list",
  components : {
    TrackDetail,
  },
  props: {
    trackDetails:{
      type: Array,
      required: true
    }
  },
}
</script>

<style scoped>
.track-detail-list{
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 15px;
  row-gap: 1em;
}
.track-detail-list-item {
  display: inline-block;
  margin-right: 10px;
}
.track-detail-list-enter-active,
.track-detail-list-leave-active {
  transition: all 0.5s ease;
}
.track-detail-list-enter-from,
.track-detail-list-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}
.track-detail-list-move {
  transition: transform 0.5s ease;
}
@media (max-width: 1100px) {
  .track-detail-list{
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 15px;
  row-gap: 1em;
}
}
@media (max-width: 800px) {
  .track-detail-list{
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(1, 1fr);
  column-gap: 15px;
  row-gap: 1em;
}
}
</style>
