<template>
  <div class="main-wrapper">
    <!--<h2>{{title}}</h2>-->
    <!--
        'create' comes from child
        'createPost' works after emitting the event in child
    -->
    <post-track @create="createTrack"/>
    <track-list :tracks="tracks"/>
 </div>
</template>

<script>

import TrackList from './track-list'
import PostTrack from './post-track'

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
     tracks:[
       {
         id: 1,
         data: {
           name: 'Трек первый',
           previewText: 'Первое правило клуба – не упоминать о клубе',
         }},
       {
         id: 2,
         data: {
           name: 'Трек второй',
           previewText: 'Второе правило клуба – не упоминать о клубе!',
         }},
       {
         id: 3,
         data: {
           name: 'Трек третий',
           previewText: 'Третье правило клуба – если боец крикнул “стоп!”, выдохся или отключился, бой окончен.',
         }},
       {
         id: 4,
         data: {
           name: 'Трек четвертый',
           previewText: 'Четвертое правило – в бою участвуют лишь двое.',
         }},
     ],

   }
 },
  methods: {
    //track comes from the child
    createTrack(track){
      this.tracks.push(track)
    }
  },
 mounted() {
   console.log('The app has been planted.')
   //this.fetchCosts()
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
   padding: 20px;
 }
</style>