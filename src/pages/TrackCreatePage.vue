<template>
<div>
<!--  <my-link style="width: 40px;" to="/tracks" icon="fas fa-door-open"></my-link>-->
  <my-button @click="this.$router.back()">Назад</my-button>
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

    const name = ref('')
    const previewText = ref('')
    const previewPicture = ref('')
    const published = ref(true)
    const dateTimeStart = ref(0)
    const dateTimeFinish = ref(0)
    const mode = ref('free')

    const createTrack = async () => {
      try {
        const responsePic = await TrackApi.postPreview(previewPicture.value)
        previewPicture.value = responsePic.data.data.file.url

        const response = await TrackApi.post(
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
        trackId.value = response.data.data.id
        await router.push(`/tracks/${trackId.value}`)
        return response
      } catch (err) {
        console.log(err)
        return err
      }

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
      createTrack,
    }
  }
}
</script>

<style scoped>

</style>
