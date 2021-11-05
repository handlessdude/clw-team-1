<template>
  <form @submit.prevent="submitForm" class="flex-form">
    <label>Название:</label>
    <my-input
        v-focus
        v-model.trim="name"
        type="text"
        placeholder="Введите название..."
    />
    <label>Описание:</label>
    <my-textarea
        v-model.trim="previewText"
        placeholder="Введите описание..."
    ></my-textarea>


    <file-input v-model="myFileInput" is-image
                placeholder-input-text="Файл не выбран"
                placeholder-button-text="Выбрать обложку..."

    ></file-input>

    <label>Дата начала</label>
    <datepicker v-model="start"
                :locale="dateLocale"
                inputFormat="dd.MM.yyyy"
                placeholder="Выберите дату..."/>
    <label>Дата окончания</label>
    <datepicker v-model="finish"
                :locale="dateLocale"
                :lowerLimit="start"
                inputFormat="dd.MM.yyyy"
                placeholder="Выберите дату..."/>

<!--    <label>Прохождение</label>
    <input type="radio" value="free" v-model="mode">
    <label>Свободное</label>
    <br>
    <input type="radio" value="consistent" v-model="mode">
    <label>Последовательное</label>

    <input type="checkbox" id="checkbox" v-model="published">
    <label for="checkbox">Доступен студентам</label>-->

    <!--        @click="createTrack"-->
    <my-button
        type="submit"
        style="align-self: flex-end; margin-top: 15px"
    >
      Подтвердить
    </my-button>

  </form>
</template>

<script>
import Datepicker from 'vue3-datepicker'
import { ref, watch } from 'vue'
import { ru } from 'date-fns/locale'
import timestampToDate from '@/helpers/timestampToDate'
import dateToTimestamp from '@/helpers/dateToTimestamp'
import FileInput from 'vue3-simple-file-input'

export default {
  name: "track-form",
  props: ['submitForm', 'trackData'],
  components: {
    Datepicker,
    FileInput
  },
  setup(props){
    const start = ref(timestampToDate(props.trackData.dateTimeStart.value))
    const finish = ref(timestampToDate(props.trackData.dateTimeFinish.value))
    //const newPreviewPicture = ref(null)
    const myFileInput = ref(null)
    watch(start, newStart => {
      // eslint-disable-next-line vue/no-mutating-props
      props.trackData.dateTimeStart.value = dateToTimestamp(newStart)
    })
    watch(finish, newFinish => {
      // eslint-disable-next-line vue/no-mutating-props
      props.trackData.dateTimeFinish.value = dateToTimestamp(newFinish)
    })

    watch(myFileInput, async newMyFileInput => {
      console.log(newMyFileInput)
      console.log(newMyFileInput.file)

      const formData = new FormData()
      formData.append('file', newMyFileInput.file)
      // eslint-disable-next-line vue/no-mutating-props
      props.trackData.previewPicture.value =  formData

    })

    return {
      name: props.trackData.name,
      previewText: props.trackData.previewText,
      previewPicture: props.trackData.previewPicture,
      published: props.trackData.published,
      dateTimeStart: props.trackData.dateTimeStart,
      dateTimeFinish: props.trackData.dateTimeFinish,
      mode: props.trackData.mode,
      start,
      finish,
      dateLocale: ru,
      myFileInput,
      //loadFile,
      /*onPickFile,
      onFilePicked,*/
    }
  }
}
</script>

<style scoped>
.flex-form {
  display: flex;
  flex-direction: column;
  padding: 20px;

}
.flex-form * {
  margin-bottom: 15px;
}
.flex-form label {
  align-self:flex-start;
}
</style>
