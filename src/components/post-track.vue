<template>
  <form @submit.prevent>
    <h3 >Создание трека</h3>
    <my-input
        v-focus
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

export default {
  name: "post-track",
  components: {

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
