<template>
  <div v-if="!isTrackLoading">

<!--    <my-button @click="toTrack">Назад</my-button>-->
    <my-button @click="this.$router.back()">Назад</my-button>
<!--    <my-link style="width: 40px;" to="/tracks" icon="fas fa-door-open"></my-link>-->
    <h1>Настройки трека</h1>
    <h2>{{TEST.data.name}}</h2>
<!--    <pre>{{TEST.data}}</pre>-->
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
import { ref } from "vue";
export default {
  name: "TrackUpdatePage",
  components: {
    TrackForm,
  },
  async setup(){
    const router = useRouter()
    const route = useRoute()
    const trackId = route.params.id

    const {
      isTrackLoading,
      //fetchTrack,
      TEST,
    } = await useTrack(trackId)

    const name = ref(TEST.value.data.name)
    const previewText = ref(TEST.value.data.previewText)
    const previewPicture = ref(TEST.value.data.previewPicture)
    const published = ref(TEST.value.data.published)
    const dateTimeStart = ref(TEST.value.data.dateTimeStart)
    const dateTimeFinish = ref(TEST.value.data.dateTimeFinish)
    const mode = ref(TEST.value.data.mode)
    /*if (isTrackLoading.value) {
      await fetchTrack()
      isTrackLoading.value = true
    }*/
/*
    console.log('TEST in TrackUpdatePage = ', TEST)
    console.log('TEST.value in TrackUpdatePage = ', TEST.value)
    console.log('trackData in TrackUpdatePage = ', trackData)
    console.log('trackData.value in TrackUpdatePage = ', trackData.value)*/
    /*console.log('trackData in TrackUpdatePage = ', trackData)
    console.log('trackData.value in TrackUpdatePage = ', trackData.value)*/

    const updateTrack = async () => {
      try {
        const response = await TrackApi.put(
            trackId,
            {
              name: name.value,
              previewText: previewText.value,
              previewPicture: previewPicture.value,
              published: published.value,
              dateTimeStart: dateTimeStart.value,
              dateTimeFinish: dateTimeFinish.value,
              mode: mode.value
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
      trackData: {
        name,
        previewText,
        previewPicture,
        published,
        dateTimeStart,
        dateTimeFinish,
        mode
      },
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