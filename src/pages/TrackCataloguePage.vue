<template>
 <div class="track-catalogue-page">
<!--   TODO auth-conditional switcher for <all tracks/my tracks>(student)
        and <createTrack>(teacher)-->

   <div v-if="this.$store.state.isTeacher"
        class="main-wrapper__btns">
      <my-button
          style="align-self:flex-start; margin-top: 15px"
          @click="showDialog"
      >
        Создать трек
      </my-button>
   </div>
   <div v-else>Здесь должен быть переключатель вкладок!</div>
   <!--
       'create' comes from child
       'createPost' works after emitting the event in child
   -->
   <my-dialog v-model:show="IsDialogVisible">
     <post-track @create="postTrack"/>
   <!--   goes into slot inside of my-dialog component-->
   </my-dialog>


   <track-list
       :tracks="getTracks"
       v-if="!isTrackListLoading"
       @remove="removeTrack"
   />
   <div v-else>Загружаем список треков...</div>

 </div>
</template>

<script>

import TrackList from '../components/track-list'
import PostTrack from '../components/post-track'

import TrackApi from '../api/Track'

import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: "track-catalogue-page",
  components: {
    TrackList,
    PostTrack,
  },
  data() {
    return {
      IsDialogVisible: false,
    }
  },
  mounted() {
    this.fetchTracks();
  },
  methods: {
    ...mapActions({
      fetchTracks: 'trackCatalogue/fetchTracks'
    }),
    ...mapMutations({
      setTracks: 'trackCatalogue/setTracks'
    }),
    postTrack(track) {
      TrackApi.post(track.data)
      //но у нового трека будет ID=undefined... TODO вытянуть из респонса трекАпи новый айдишник
      this.tracks.push(track);
      //this.fetchTracks();
      this.IsDialogVisible = false;
    },

    removeTrack(track) {
      // here should go --deleting from server--
      // we do not make another request to server in order to rerender the track list
      this.setTracks(this.tracks.filter(t => t.id !== track.id))
      //this.tracks = this.tracks.filter(t => t.id !== track.id)
    },

    showDialog() {
      this.IsDialogVisible = true;
    },
  },
  computed: {
    ...mapState({
      tracks: state => state.trackCatalogue.tracks,
      isTrackListLoading: state => state.trackCatalogue.isTrackListLoading,
    }),
    ...mapGetters({
      getTracks: 'trackCatalogue/getTracks',
    })
  },
}
</script>

<style scoped>

.main-wrapper__btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>