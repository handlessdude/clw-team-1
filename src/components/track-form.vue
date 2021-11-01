<template>
  <form @submit.prevent="submitForm" class="flex-form">
    <label>Название:</label>
    <my-input
        v-focus
        v-model="name"
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
export default {
  name: "track-form",
  props: ['submitForm', 'trackData'],
  setup(props){
    return {

      name: props.trackData.name,
      previewText: props.trackData.previewText,
      /*name: props.track.data.name,
      previewText: props.track.data.previewText,*/
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
</style>