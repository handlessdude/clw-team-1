<template>
    <div v-if="trackDetails.length > 0" class="track-detail-list">
      <transition-group name="track-detail-list">
        <track-item
            v-for="trackDetail in trackDetails"
            :trackDetail="trackDetail"
            :key="trackDetail.id"
            @remove="$emit('remove', trackDetail)"
        />
      </transition-group>

    </div>
    <p v-else>Курс не содержит элементов.</p>
</template>

<script>
export default {
  name: "track-detail-list"
}
</script>
import TrackDetail from "./track-detail-item";
<style scoped>
.track-detail-list{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
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
</style>