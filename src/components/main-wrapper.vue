<template>
  <div class="main-wrapper">
    <!--<h2>{{title}}</h2>-->
    <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Поиск..."
    />
    <div class="main-wrapper__btns">
      <my-button
          style="align-self:flex-start; margin-top: 15px"
          @click="showDialog"
      >
        Создать трек
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <!--
        'create' comes from child
        'createPost' works after emitting the event in child
    -->
    <my-dialog v-model:show="dialogVisible">
      <post-track @create="createTrack"/>
    </my-dialog>

    <track-list
        :tracks="sortedAndSearchedTracks"
        @remove="removeTrack"
        v-if="!isTrackListLoading"
    />
    <div v-else>Загружаем список треков...</div>
 </div>
</template>

<script>

import TrackList from './track-list'
import PostTrack from './post-track'
import axios from 'axios'
import resolvePath from './auxiliary.js'

export default {
 name: "main-wrapper",
 components : {
   TrackList,
   PostTrack,
 },
 props: {},
 data() {
   return {
     title: 'Main Wrapper',
     dialogVisible: false,
     isTrackListLoading: false,
     selectedSort: '',
     searchQuery: '',
     sortOptions: [ //array of select-list items
       { value: 'id', name: 'По ID'},
       { value: 'data.name', name: 'По названию'}
     ],
     tracks:[],
   }
 },
  methods: {
    //track comes from the child
    createTrack(track){
      this.tracks.push(track)
      this.dialogVisible = false
    },
    removeTrack(track){
      this.tracks = this.tracks.filter(tr => tr.id !== track.id)
    },
    showDialog(){
      this.dialogVisible = true
    },
    async fetchTracks(){
      try {
        this.isTrackListLoading = true
        const url = "https://tml6.rosatom.ru/api/tracks";

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        axios.defaults.headers.common = {
          //teacher's token
          "X-API-Key": "4kcwkcksk0gwcs4kc0wo4gws0sgcswgcosc88ok4",
        };

        const response = await axios({
          method: "get",
          url: url,
          data: {
            message: "Some message to a lonely_server",
          },
          config,
        })
        this.tracks = response.data.data;
        console.log(response)
      } catch (e) {
        alert('Error has spawned!')
      } finally {
        this.isTrackListLoading = false
      }
    }
  },
 mounted() {
   console.log('The app has been planted.')
   this.fetchTracks()
 },
  computed:{
   sortedTracks() {
     return [...this.tracks].sort((track1, track2) =>
         String(resolvePath(track1, this.selectedSort))?.localeCompare(String(resolvePath(track2,this.selectedSort))))
   },
    sortedAndSearchedTracks() {
      return this.sortedTracks.filter(track => track.data.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {

  }
}
</script>

<style>
 .main-wrapper{
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin: 0 auto;

 }
 .main-wrapper__btns {
   width: 100%;
   display: flex;
   justify-content: space-between;
 }
</style>