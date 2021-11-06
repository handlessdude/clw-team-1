<template>
<div class="track-page" v-if="!isTrackLoading">
  <div class="preview-pic"  :style='{ backgroundImage: `url("${this.$store.state.server}/${TEST.data.previewPicture}")` }' >
    <div class="preview-pic-bl">
<!--    <div class="preview-pic"  :style='{ backgroundImage: `url("${this.$store.state.server}/${trackData.previewPicture}")` }' >-->

<!--    <my-link style="width: 40px;" to="/tracks" icon="fas fa-door-open"></my-link>-->
    <my-button @click="this.$router.back()">Назад</my-button>
<!--    PRE - FOR DEBUG!-->
<!--    <h2>{{trackData.name}}</h2>-->
    <h2>{{TEST.data.name}}</h2>
<!--    <pre>{{typeof(trackData.dateTimeStart)}}</pre>
    <pre>{{hrTimeStart}}</pre>-->
<!--    <pre>{{assigned}}</pre>
    <pre>{{id }}</pre>
    <pre> {{status}}</pre>
    <pre>{{trackData}}</pre>-->
    </div>
  </div>

  <div class="content">
    <div class="about">

      <div class="description">
        <span><i class="fas fa-info-circle"></i><h2>О треке</h2></span>
        <p>{{TEST.data.previewText}}</p>
      </div>

      <div class="edit-and-time">

        <my-button
            @click="this.$router.push(`/tracks/${TEST.id}/update`)"
        >
          Редактировать
        </my-button>

        <div class="start-finish">
          <div class="start">
            Дата открытия: {{hrTimeStart}}
          </div>
          <div class="finish">
            Дата закрытия: {{hrTimeFinish}}
          </div>
        </div>
      </div>
    </div>

    <span>
<!--      TODO: add @click to all the buttons-->
        <my-button
        >
           Добавить деталь трека
        </my-button>
        <my-button
        >
           Записать студентов на трек
        </my-button>
        <my-button
        >
            Входное тестирование
        </my-button>
      </span>

    <track-detail-list
        style="margin-top: 20px;"
        :trackDetails="trackDetails"
        v-if="!isTrackDetailsLoading"
        @remove="removeTrackDetail"
    />
    <div v-else>Загружаем список элементов...</div>
  </div>

<!--
TODO: create track detail post form
<my-dialog v-model:show="dialogVisible">
    <post-form
        @create="createTrackDetail"
    />
</my-dialog>-->
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
    TrackDetailList
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
  display: flex;
  flex-direction: row;
}

.content {
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

.content>span {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
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