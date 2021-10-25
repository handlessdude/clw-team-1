<template>
 <div class="track-catalogue-page">
<!--   TODO auth-conditional switcher for <all tracks/my tracks>(student)
        and <createTrack>(teacher)-->

   <div v-if="$store.state.isTeacher"
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
     <post-track @create="createTrack"/>
   <!--   goes into slot inside of my-dialog component-->
   </my-dialog>

<!--   <main-wrapper></main-wrapper>-->

   <track-list
       :tracks="getTracks"
       v-if="!isTrackListLoading"
   />
   <div v-else>Загружаем список треков...</div>

 </div>
</template>

<script>

import TrackList from '../components/track-list'
import PostTrack from '../components/post-track'
//import MainWrapper from "../components/main-wrapper"

import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: "track-catalogue-page",
  components: {
    /* MainWrapper,*/
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
    ...mapMutations({
      /*setSelectedSort: 'trackCatalogue/setSelectedSort',
      setSearchQuery: 'trackCatalogue/setSearchQuery',*/
    }),
    ...mapActions({
      fetchTracks: 'trackCatalogue/fetchTracks'
    }),
    /*removeTrack(track) {
      this.tracks = this.tracks.filter(t => t.id !== track.id)
    },*/
    /*so you can create blank track cards in order to test css styles*/
    createTrack(track) {
      this.tracks.push(track);
      this.IsDialogVisible = false;
    },

    showDialog() {
      this.IsDialogVisible = true;
    },
  },
  computed: {
    ...mapState({
      tracks: state => state.trackCatalogue.tracks,
      isTrackListLoading: state => state.trackCatalogue.isTrackListLoading,
      /*selectedSort: state => state.trackCatalogue.selectedSort,
      searchQuery: state => state.trackCatalogue.searchQuery,
      page: state => state.trackCatalogue.page,
      limit: state => state.trackCatalogue.limit,
      totalPages: state => state.trackCatalogue.totalPages,
      sortOptions: state => state.trackCatalogue.sortOptions*/
    }),
    ...mapGetters({
      getTracks: 'trackCatalogue/getTracks',
      /*sortedTracks: 'trackCatalogue/sortedTracks',
      sortedAndSearchedTracks: 'trackCatalogue/sortedAndSearchedTracks'*/
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