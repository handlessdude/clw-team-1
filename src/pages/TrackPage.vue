<template>
<div class="track-page">
  <div class="preview-pic">
    <sidebar-link to="/tracks" icon="fas fa-door-open"></sidebar-link>
    <h1>{{$route.params.id}}</h1>
  </div>

  <div class="content">
    <div class="about">

      <div class="description">
        <span><i class="fas fa-info-circle"></i><h2>О треке</h2></span>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam mi, ornare et libero non, blandit consequat ante. Nam fermentum varius libero, non venenatis ex pellentesque in. Aliquam porta sagittis turpis. Curabitur cursus a est ut posuere. Aliquam pharetra nibh quis erat pretium pharetra. Nam congue varius congue. Sed imperdiet, sapien at dapibus ultrices, eros arcu convallis libero, sit amet feugiat lectus urna sed nulla. Suspendisse eget magna ut neque porta sodales a sit amet nisi. Quisque dictum id augue ut hendrerit. Nullam laoreet velit nulla, nec feugiat dolor venenatis sed. In hac habitasse platea dictumst. Proin congue libero vitae est gravida, a viverra mauris porta. Cras ac massa nec velit tristique rutrum.</p>
      </div>

      <div class="edit-and-time">
        <my-button
        >
          Редактировать
        </my-button>
        <div class="start-finish">
          <div class="start">
            Дата открытия:
          </div>
          <div class="finish">
            Дата открытия:
          </div>
        </div>
      </div>

    </div>

    <track-detail-list
        :tracks="getTrackDetails"
        v-if="!isTrackDetailListLoading"
        @remove="deleteTrackDetail"
    />
    <div v-else>Загружаем список треков...</div>
  </div>

</div>
</template>

<script>
import SidebarLink from '../components/ui-components/sidebar-link'
export default {
  name: "TrackPage",
  components: {
    SidebarLink,
  },
  data() {
    return {
      trackId: this.$route.params.id,
    }
  },
}
</script>

<style scoped>
.track-page {
  margin-left: 15px;
}
.preview-pic {
  width: 100%;
  height: 150px;
  border-radius: 12px;
  padding: 15px;
  background: cyan;

}
.about {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  border-radius: 12px;
  padding: 15px;
  background: white;

}

.edit-and-time {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.start-finish{
  margin-top:auto;
  border-radius: 12px;
  color: teal;
  border: 1px solid teal;
  padding: 5px;
}
</style>