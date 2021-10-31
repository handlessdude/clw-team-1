<template>
  <form @submit.prevent>
    <label>Название:</label>
    <my-input
        v-focus
        v-model="trackName"
        type="text"
        placeholder="Введите название..."
    />
    <label>Описание:</label>
    <textarea v-model="previewText"
              class="form-control"
              placeholder="Введите описание..."
    ></textarea>


<!--    <button class="btn btn-info" @click="onPickFile">Выберите обложку...</button>
    <input
        type="file"
        style="display: none"
        ref="fileInput"
        accept="image/*"
        @change="onFilePicked"/>

    <label>Дата начала</label><br>
    <input type="date" v-model="dateTimeStart" placeholder="Введите дату" class="form-control" />
    <label>Дата окончания</label><br>
    <input type="date" v-model="dateTimeFinish" placeholder="Введите дату" class="form-control" />

    <label>Прохождение</label><br>
    <input type="radio" value="free" v-model="mode">
    <label>Свободное</label>
    <br>
    <input type="radio" value="consistent" v-model="mode">
    <label>Последовательное</label>

    <input type="checkbox" id="checkbox" v-model="published">
    <label for="checkbox">{{ checked }}</label>-->

    <my-button
        style="align-self: flex-end; margin-top: 15px"
        @click="createTrack"
    >
      Подтвердить
    </my-button>

  </form>
</template>

<script>
import{ref} from 'vue'
import { useRouter } from 'vue-router'
import TrackApi from '@/api/Track'
export default {
  name: "track-form",
  setup(){
    const  router = useRouter()
    console.log(router)
    const trackId = ref(0)
    const trackName = ref('')
    const previewText = ref('')
    const newTrack = {
          name: trackName.value,
          previewText: previewText.value,
          previewPicture: '',
          published: true,
          dateTimeStart: 0,
          dateTimeFinish: 0,
          mode: "free"
    }
    const createTrack = async () => {
      try {
        const response = await TrackApi.post(newTrack)
        trackId.value = response.data.data.id
        // @click="$router.push(`/tracks/${track.id}`)"
        console.log(router)
        await router.push(
          `/tracks/${trackId.value}`
        )
      } catch (err) {
        console.log(err)
        return err
      }

    }
    return {
      trackName,
      previewText,
      createTrack,
    }
  }
}
</script>

<style scoped>

</style>