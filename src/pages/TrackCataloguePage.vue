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
       @remove="deleteTrack"
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
    async postTrack(track) {
      try {
        const response = await TrackApi.post(track.data)
        track.id = response.data.data.id
        this.tracks.push(track)
        this.IsDialogVisible = false
      } catch (err) {
        console.log(err)
        return err
      }
    },

    async deleteTrack(track) {
      try {
        await TrackApi.delete(track)
        // we do not make another request to server in order to rerender the track list
        this.setTracks(this.tracks.filter(t => t.id !== track.id))
      } catch (e) {
        console.log(e)
        return e
      }
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
.track-catalogue-page{
  margin-left: 15px;
}

.main-wrapper__btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>