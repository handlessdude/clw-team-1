<template>
  <div v-if="!isTrackLoading">

<!--    <my-button @click="toTrack">Назад</my-button>-->
    <my-button @click="this.$router.back()">Назад</my-button>
<!--    <my-link style="width: 40px;" to="/tracks" icon="fas fa-door-open"></my-link>-->
    <h1>Настройки трека</h1>
    <h2>{{TEST.data.name}}</h2>
    <pre>{{TEST.data}}</pre>
    <track-form
        :trackData="trackData"
        :submitForm="updateTrack"
    ></track-form>
  </div>
  <preloader v-else></preloader>
</template>

<script>
import TrackApi from '@/api/Track'
import TrackForm from '@/components/track-form'
import { useTrack } from "@/hooks/trackPageHooks/useTrack"
import {useRoute, useRouter} from "vue-router";
import { ref,/* onMounted*/ } from "vue";
export default {
  name: "TrackUpdatePage",
  components: {
    TrackForm,
  },
  async setup(){
    const router = useRouter()
    const route = useRoute()
    const trackId = route.params.id
    const trackData = ref({
      name: '',
      previewText: '',
      previewPicture: '',
      published: true,
      dateTimeStart: 0,
      dateTimeFinish: 0,
      mode: "free"
    })

    const {
      isTrackLoading,
      //fetchTrack,
      TEST,
      //TEST2
    } = await useTrack(trackId)

    /*if (isTrackLoading.value) {
      await fetchTrack()
      isTrackLoading.value = true
    }*/

    console.log('TEST in TrackUpdatePage = ', TEST)
    console.log('TEST.value in TrackUpdatePage = ', TEST.value)
    console.log('trackData in TrackUpdatePage = ', trackData)
    console.log('trackData.value in TrackUpdatePage = ', trackData.value)
    trackData.value = TEST.value.data
    console.log('trackData in TrackUpdatePage = ', trackData)
    console.log('trackData.value in TrackUpdatePage = ', trackData.value)

    const updateTrack = async () => {
      try {
        const response = await TrackApi.put(
            trackId,
            {
              name: trackData.value.name,
              previewText: trackData.value.previewText,
              previewPicture: trackData.value.previewPicture,
              published: trackData.value.published,
              dateTimeStart: trackData.value.dateTimeStart,
              dateTimeFinish: trackData.value.dateTimeFinish,
              mode: trackData.value.mode
            }
        )
        await router.push(`/tracks/${trackId}`)
        return response
      } catch (err) {
        console.log(err)
        return err
      }
    }
    const  toTrack =  () => {
      router.push(`/tracks/${trackId}`)
    }
    return {
      trackData,
      updateTrack,
      isTrackLoading,
      toTrack,
      TEST,
      //TEST2
    }
  }
}
</script>

<style scoped>

</style>