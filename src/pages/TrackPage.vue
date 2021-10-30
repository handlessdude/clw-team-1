<template>
<div class="track-page">
  <div class="preview-pic"  :style='{ backgroundImage: `url("${this.$store.state.server}/${previewPicture}")` }'>
    <sidebar-link style="width: 40px;" to="/tracks" icon="fas fa-door-open"></sidebar-link>
<!--    <h1>{{$route.params.id}}</h1>-->
   <h1>{{name}}</h1>
<!--    <h1>{{TEST_ANS.id}}</h1>-->
<!--    <pre>{{ trackInfo.assigned }}</pre>
    <pre>{{ trackInfo.id }}</pre>
    <pre>{{ trackInfo.status }}</pre>-->
  </div>

  <div class="content">
    <div class="about">

      <div class="description">
        <span><i class="fas fa-info-circle"></i><h2>О треке</h2></span>
       <p>{{previewText}}</p>
      </div>

      <div class="edit-and-time">
        <my-button>
          Редактировать
        </my-button>
        <div class="start-finish">
          <div class="start">
            Дата открытия:{{dateTimeStart}}
          </div>
          <div class="finish">
            Дата закрытия:{{dateTimeFinish}}
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
    />
<!--    @remove="deleteTrackDetail"-->
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
</template>

<script>
import TrackDetailList from '../components/track-detail/track-detail-list'
import SidebarLink from '../components/ui-components/sidebar-link'
import { useRoute } from 'vue-router'
import { useTrackDetails } from "../hooks/trackPageHooks/useTrackDetails";
/*import {mapActions, mapMutations} from "vuex";*/
import { useTrack } from "../hooks/trackPageHooks/useTrack";
import timeConverter from "../helpers/timeConverter"

export default {
  name: "TrackPage",
  components: {
    SidebarLink,
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
    console.log('ID of current track on the page: '+trackId)
    const { trackDetails, isTrackDetailsLoading } = useTrackDetails(trackId)
    const {
     /* TEST,*/
      assigned,
      id ,
      status,
      dateTimeFinish ,
      dateTimeStart,
      mode,
      name ,
      previewPicture,
      previewText ,
      published,} = useTrack(trackId)
    /*console.log('trackInfo: ')
    console.log(trackInfo)*/
    dateTimeStart.value = timeConverter(dateTimeStart.value)
    dateTimeFinish.value = timeConverter(dateTimeFinish.value)
    return {
     /* TEST,*/
      assigned,
      id ,
      status,

      dateTimeFinish ,
      dateTimeStart,
      mode,
      name ,
      previewPicture,
      previewText ,
      published,
      trackDetails,
      isTrackDetailsLoading
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