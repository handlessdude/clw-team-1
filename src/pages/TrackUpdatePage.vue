<template>
  <div v-if="!isTrackLoading">

    <my-button @click="toTrack">Назад</my-button>
<!--    <my-link style="width: 40px;" to="/tracks" icon="fas fa-door-open"></my-link>-->
    <h1>Настройки трека</h1>
    <h2>{{TEST.data.name}}</h2>
    <track-form
        :trackData="TEST.data"
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
import {ref} from "vue";
export default {
  name: "TrackCreatePage",
  components: {
    TrackForm,
  },
  setup(){
    const router = useRouter()
    const route = useRoute()
    const trackId = route.params.id
    let trackData = ref({
      name: '',
      previewText: '',
      previewPicture: '',
      published: true,
      dateTimeStart: 0,
      dateTimeFinish: 0,
      mode: "free"
    })

    const {
      //fetchTrack,
      isTrackLoading,
      TEST
    } = useTrack(trackId)

    console.log('TEST TRACK UPDATE PAGE = ', TEST)
    console.log('TEST.id TRACK UPDATE PAGE = ', TEST.id)  //undefined
    console.log('TEST.value TRACK UPDATE PAGE = ', TEST.value) //null
    console.log('TEST.data TRACK UPDATE PAGE = ', TEST.data)  //undefined*/
    //console.log('TEST.value.id TRACK UPDATE PAGE = ', TEST.value.id) //ERROR: Cannot read properties of null (reading 'id')

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
    }
  }
}
</script>

<style scoped>

</style>