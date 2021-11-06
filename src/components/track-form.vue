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

<!--    <button class="btn btn-info" @click="onPickFile">Выберите обложку...</button>
    <input
        type="file"
        style="display: none"
        ref="fileInput"
        accept="image/*"
        @change="onFilePicked"/>-->

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
export default {
  name: "track-form",
  props: ['submitForm', 'trackData'],
  components: {
    Datepicker
  },
  setup(props){
    const start = ref(timestampToDate(props.trackData.dateTimeStart.value))
    const finish = ref(timestampToDate(props.trackData.dateTimeFinish.value))

    watch(start, newStart => {
      // eslint-disable-next-line vue/no-mutating-props
      props.trackData.dateTimeStart.value = dateToTimestamp(newStart)
    })
    watch(finish, newFinish => {
      // eslint-disable-next-line vue/no-mutating-props
      props.trackData.dateTimeFinish.value = dateToTimestamp(newFinish)
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