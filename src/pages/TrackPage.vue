<template>
<div class="track-page" v-if="!isTrackLoading">
  <div class="preview-pic"  :style='{ backgroundImage: `url("${this.$store.state.server}/${TEST.data.previewPicture}")` }' >
<!--    <div class="preview-pic"  :style='{ backgroundImage: `url("${this.$store.state.server}/${trackData.previewPicture}")` }' >-->

    <my-button @click="this.$router.push('/tracks')">Назад</my-button>
    <h2>{{TEST.data.name}}</h2>
  </div>

  <div class="content">
    <div class="about">

      <div class="description">
        <span><i class="fas fa-info-circle"></i><h2>О треке</h2></span>
        <p>{{TEST.data.previewText}}</p>
      </div>

      <div class="edit-and-time">

        <my-button @click="this.$router.push(`/tracks/${TEST.id}/update`)">
          Редактировать
        </my-button>

        <div class="start-finish">
          <div class="start">Дата открытия: {{hrTimeStart}}</div>
          <div class="finish">Дата закрытия: {{hrTimeFinish}}</div>
        </div>
      </div>
    </div>

    <span>
        <my-button v-if="this.$store.state.actualUser.roles.includes('teacher')">
          Добавить деталь трека
        </my-button>
        <my-button v-if="this.$store.state.actualUser.roles.includes('teacher')">
          Записать студентов на трек
        </my-button>
        <my-button v-if="this.$store.state.actualUser.roles.includes('teacher')">
          Входное тестирование
        </my-button>
    </span>

    <track-detail-list
        style="margin-top: 20px"
        :trackDetails="trackDetails"
        v-if="!isTrackDetailsLoading"
        @remove="removeTrackDetail"
    />
      <div v-else>Загружаем список элементов...</div>
    </div>


  </div>
  <preloader v-else></preloader>
</template>

<script>
import TrackDetailList from '@/components/track-detail/track-detail-list'
import {useRoute/*, useRouter*/} from 'vue-router'
import { useTrackDetails } from "@/hooks/trackPageHooks/useTrackDetails"
import { useTrack } from "@/hooks/trackPageHooks/useTrack"

export default {
  name: "TrackPage",
  components: {
    TrackDetailList,
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  async setup() {
    const route = useRoute()
    const trackId = route.params.id

    console.log('ID of current track on the page: ' + trackId)
    const { trackDetails,
            isTrackDetailsLoading,
            removeTrackDetail
    } = await useTrackDetails(trackId)

    const {
      response,

      fetchTrack,
      isTrackLoading,

      hrTimeStart,
      hrTimeFinish,
      TEST
    } = await useTrack(trackId)

    return {
      response,

      fetchTrack,
      isTrackLoading,

      trackDetails,
      isTrackDetailsLoading,
      removeTrackDetail,

      hrTimeStart,
      hrTimeFinish,
      TEST,
      trackId
    }
  }
}
</script>

<style scoped>
.track-page {
  margin-left: 15px;
}
.preview-pic {
  /*width: 100%;
  height: 150px;*/

  width: 100%;
  min-height: 300px;
  border-radius: 50px;

  background: #ffffff no-repeat center center;
  background-size: cover;
  color:rgb(255, 255, 255);
}
.preview-pic-bl {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color:rgba(0,0,0,.4);
  width: 100%;
  min-height: 300px;
  border-radius: 50px;
  padding: 25px;
}
.preview-pic-bl .btn {
  margin-bottom: 70px;
  color: white;
  border: 1px solid white;
}
.content .btn {
  margin: 0 5px;
}
.about {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.content {
  min-height: 312px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 50px;
  padding: 25px;
  background: white;
}
.description {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.content > span {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.edit-and-time {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.start-finish {
  margin-top:10px;
  border-radius: 25px;
  color: teal;
  border: 1px solid teal;
  padding: 15px;
}
@media (max-width: 820px) {
  .about{
    flex-direction: column;
  }
  .edit-and-time {
  display: flex;
  flex-direction: column;
  margin-left: 0px;
  margin-top: 15px;
}
}
@media (max-width: 565px) {
  .content>span {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
  .content>span .btn{
    margin: 10px 0;
  }
}
</style>
