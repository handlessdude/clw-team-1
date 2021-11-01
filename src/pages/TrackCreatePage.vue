<template>
<div>
  <my-link style="width: 40px;" to="/tracks" icon="fas fa-door-open"></my-link>
  <h1>Создание трека</h1>
  <track-form
      :trackData="trackData"
      :submitForm="createTrack"
  ></track-form>
</div>
</template>

<script>
import TrackApi from '@/api/Track'
import TrackForm from '@/components/track-form'
import {useRouter} from "vue-router";
import {ref} from "vue";
export default {
  name: "TrackCreatePage",
  components: {
    TrackForm,
  },
  setup(){
    const router = useRouter()
    const trackId = ref(0)
    const trackName = ref('')
    const previewText = ref('')
    /*const newTrack = {
          name: trackName.value,
          previewText: previewText.value,
          previewPicture: '',
          published: true,
          dateTimeStart: 0,
          dateTimeFinish: 0,
          mode: "free"
    }*/
    const createTrack = async () => {
      try {
        const response = await TrackApi.post(
            {
              name: trackName.value,
              previewText: previewText.value,
              previewPicture: '',
              published: true,
              dateTimeStart: 0,
              dateTimeFinish: 0,
              mode: "free"
            }
        )
        trackId.value = response.data.data.id
        await router.push(`/tracks/${trackId.value}`)
        return response
      } catch (err) {
        console.log(err)
        return err
      }

    }
    return {
      /*trackName,
      previewText,*/
      trackData: {
        trackName,
        previewText,
      },
      createTrack,
    }
  }
}
</script>

<style scoped>

</style>