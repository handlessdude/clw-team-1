<template>
<div class="track-page" v-if="!isTrackLoading">
  <div class="preview-pic"  :style='{ backgroundImage: `url("${this.$store.state.server}/${getTrackData.previewPicture}")` }'>
    <sidebar-link style="width: 40px;" to="/tracks" icon="fas fa-door-open"></sidebar-link>

   <h1>{{getTrackParam("id")}}</h1>

  </div>

  <div class="content">
    <div class="about">

      <div class="description">
        <span><i class="fas fa-info-circle"></i><h2>О треке</h2></span>
<!--       <p>{{trackData.previewText}}</p>-->
      </div>

      <div class="edit-and-time">
        <my-button>
          Редактировать
        </my-button>
        <div class="start-finish">
<!--          <div class="start">
            Дата открытия:{{trackData.dateTimeStart}}
          </div>
          <div class="finish">
            Дата закрытия:{{trackData.dateTimeFinish}}
          </div>-->
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
<preloader v-else></preloader>
</template>

<script>
import TrackDetailList from '../components/track-detail/track-detail-list'
import SidebarLink from '../components/ui-components/sidebar-link'
import { useRoute } from 'vue-router'
import { useTrackDetails } from "../hooks/trackPageHooks/useTrackDetails";
/*

import { useTrack } from "../hooks/trackPageHooks/useTrack";*/
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

/*import TrackApi from "../api/Track";
import nestedAccess from "../helpers/nestedAccess";*/
//import timeConverter from "../helpers/timeConverter"

export default {
  name: "трек",
  components: {
    SidebarLink,
    TrackDetailList
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapActions({
      loadAndSetTrack: 'trackPage/loadAndSetTrack'

    }),
    ...mapMutations({
      setTrackData: 'trackPage/setTrackData'
    }),

  },
  computed: {
    ...mapState({
      trackData: state => state.trackPage.trackData,
      isTrackLoading: state => state.trackPage.isTrackLoading,
    }),
    ...mapGetters({
      getTrackData: 'trackPage/getTrackData',
      getTrackParam: 'trackPage/getTrackParam',
    })
  },
  /*mounted() {
    this.loadAndSetTracks();
  },*/
  setup() {
    const route = useRoute()
    const trackId = route.params.id
    this.loadAndSetTrack(trackId)
    const { trackDetails, isTrackDetailsLoading } = useTrackDetails(trackId)
    return {
      trackDetails,
      isTrackDetailsLoading
    }
    /*const route = useRoute()
    const trackId = route.params.id*/
    /*console.log('ID of current track on the page: '+trackId)
    const { trackDetails, isTrackDetailsLoading } = useTrackDetails(trackId)
    const {
      assigned,
      id ,
      status,
      trackData,
      isTrackLoading } = useTrack(trackId)

    /!*console.log(trackData.dateTimeStart)
    trackData.dateTimeStart = timeConverter(trackData.dateTimeStart)*!/
    //console.log(timeConverter(trackData.dateTimeStart))
    //trackData.dateTimeFinish = timeConverter(trackData.dateTimeFinish)
    console.log(trackData)
    console.log(trackData.name)
    return {
      assigned,
      id ,
      status,
      trackData,
      isTrackLoading,

      trackDetails,
      isTrackDetailsLoading
    }*/
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