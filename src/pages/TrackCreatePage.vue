<template>
  <div>
    <div class="preview-pic"  :style='{ backgroundImage: `url("${this.$store.state.server}/${trackData.previewPicture.value}")` }' >
      <div class="preview-pic-bl">
        <my-button @click="this.$router.back()">Назад</my-button>
        <h1>Создание трека</h1>
      </div>
    </div>

    <track-form
        :trackData="trackData"
        :submitForm="createTrack"
    />

    <my-dialog v-model:show="IsDialogVisible">
      <h3 style="margin: 10px">{{error}}</h3>
      <!--   goes into slot inside of my-dialog component-->
    </my-dialog>

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

    const IsDialogVisible = ref(false)
    const error = ref(null)

    const createTrack = async () => {
      try {
        if(previewPicture.value === '') {
          /**
           * TODO custom error classes
           * TODO validation should go on form's level maybe?
           * */
          throw new TypeError("Выберите обложку перед подтверждением!")
        }
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
      } catch (e) {
        console.log(e)
        /**
         * TODO custom error classes
         * */
        error.value = e.message

        IsDialogVisible.value = true
        return e
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
      IsDialogVisible,
      error
    }
  }
}
</script>

<style scoped>
.preview-pic {
  /*width: 100%;
  height: 150px;*/
  width: 100%;
  height: 300px;
  border-radius: 50px;
  background: #ffffff no-repeat center center;
  background-size: cover;
  color:rgb(255, 255, 255);
}
.preview-pic-bl {
  display: flex;
  flex-direction: column;
  background-color:rgba(0,0,0,.4);
  width: 100%;
  min-height: 300px;
  border-radius: 50px;
  padding: 30px;
}
.preview-pic-bl .btn {
  width: 70px;
  margin-bottom: 70px;
  color: white;
  border: 1px solid white;
}
</style>
