<template>
<div class="track-page" v-if="!isTrackLoading">
  <div class="preview-pic"  :style='{ backgroundImage: `url("${this.$store.state.server}/${trackData.previewPicture}")` }' >

    <my-link style="width: 40px;" to="/tracks" icon="fas fa-door-open"></my-link>

    <h2>{{trackData.name}}</h2>
<!--    <pre>{{typeof(trackData.dateTimeStart)}}</pre>
    <pre>{{hrTimeStart}}</pre>-->
<!--    <pre>{{assigned}}</pre>
    <pre>{{id }}</pre>
    <pre> {{status}}</pre>
    <pre>{{trackData}}</pre>-->

  </div>

  <div class="content">
    <div class="about">

      <div class="description">
        <span><i class="fas fa-info-circle"></i><h2>О треке</h2></span>
       <p>{{trackData.previewText}}</p>
      </div>

      <div class="edit-and-time">
        <my-button>
          Редактировать
        </my-button>
        <div class="start-finish">
          <div class="start">
            Дата открытия:{{hrTimeStart}}
          </div>
          <div class="finish">
            Дата закрытия:{{hrTimeFinish}}
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
import MyLink from '@/components/ui-components/my-link'
import { useRoute } from 'vue-router'
import { useTrackDetails } from "@/hooks/trackPageHooks/useTrackDetails"
import { useTrack } from "@/hooks/trackPageHooks/useTrack"

export default {
  name: "трек",
  components: {
    MyLink,
    TrackDetailList
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  setup() {
    const route = useRoute()
    const trackId = route.params.id

    console.log('ID of current track on the page: ' + trackId)
    const { trackDetails,
            isTrackDetailsLoading,
            removeTrackDetail} = useTrackDetails(trackId)
    const {
      response,

      assigned ,
      id,
      status,
      trackData,

      fetchTrack,
      isTrackLoading,

      hrTimeStart,
      hrTimeFinish,

    } = useTrack(trackId)

    /*console.log('trackData = ', trackData)
    console.log('hrTimeStart = ', hrTimeStart)*/

    return {
      response,

      assigned ,
      id,
      status,
      trackData,

      fetchTrack,
      isTrackLoading,

      trackDetails,
      isTrackDetailsLoading,
      removeTrackDetail,

      hrTimeStart,
      hrTimeFinish,

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
  height: 600px;
  border-radius: 12px;
  padding: 15px;

  background: #ffffff no-repeat center center;
  background-size: cover;
  color:black;
}
.about {
  display: flex;
  flex-direction: row;
}

.content {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 15px;
  background: white;
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

.start-finish{
  margin-top:auto;
  border-radius: 12px;
  color: teal;
  border: 1px solid teal;
  padding: 5px;
}

</style>