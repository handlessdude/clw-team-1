<template>
  <div v-if="!isTrackLoading">
    <div class="preview-pic"  :style='{ backgroundImage: `url("${this.$store.state.server}/${trackData.previewPicture.value}")` }' >
      <my-button @click="this.$router.back()">Назад</my-button>
      <h1>Настройки трека</h1>
      <h2>{{TEST.data.name}}</h2>
    </div>

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

    const IsDialogVisible = ref(false)
    const error = ref(null)

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
        /**
         * TODO custom error classes
         * */
        if(err instanceof TypeError) {
          error.value = "Выберите обложку перед подтверждением!"
        }
        IsDialogVisible.value = true
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
      IsDialogVisible,
      error,
    }
  }
}
</script>

<style scoped>
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
</style>
