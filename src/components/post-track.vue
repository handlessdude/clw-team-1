<template>
  <form @submit.prevent>
    <h4 style="align-self: flex-start">Создание трека</h4>
    <my-input
        v-model="track.data.name"
        type="text"
        placeholder="Название"
    />
    <my-input
        v-model="track.data.previewText"
        type="text"
        placeholder="Описание"
    />
    <my-button
        style="align-self: flex-end; margin-top: 15px"
        @click="createTrack"
    >
      Создать
    </my-button>
  </form>
</template>

<script>

import MyButton from "./ui-components/my-button"
import MyInput from "./ui-components/my-input"

export default {
  name: "post-track",
  components:{
    MyButton,
    MyInput,
  },
  data() {
    return {
      track: {
        data:{
          name: '',
          previewText: '',
        }
      }
    }
  },
  methods: {
    createTrack() {
      this.track.id = Date.now();
      //emit: generating event 'create' for parent component to subscribe
      //passing props (this.track) to parent component
      this.$emit('create', this.track)
      this.track = {
        data:{
          name: '',
          previewText: '',
        }
      }

    }
  },
}
</script>

<style scoped>
form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

</style>
