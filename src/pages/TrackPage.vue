<template>
<!--  that is track info page,
      tried to implement it in composition API paradigm,
      all logic of child elements are plugged in via 'useResourcename' hooks
      -->
<div class="track-page" v-if="!isTrackLoading">
  <div class="preview-pic"  :style='{ backgroundImage: `url("${this.$store.state.server}/${TEST.data.previewPicture}")` }' >
    <div class="preview-pic-bl">
      <h2 class="track__preview_info">{{TEST.data.name}}</h2>
      <my-button class="track__preview_btn" @click="this.$router.push('/tracks')">Назад</my-button>
    </div>
  </div>

  <div class="content">
    <div class="about">

      <div class="description">
        <span><i class="fas fa-info-circle"></i><h2>О треке</h2></span>
        <p>{{TEST.data.previewText}}</p>
      </div>

      <div class="edit-and-time">

        <my-button-re
            v-if="actualRole"
            @click="this.$router.push(`/tracks/${TEST.id}/update`)">
          Редактировать
        </my-button-re>

        <div class="start-finish">
          <div class="start">Дата открытия: {{hrTimeStart}}</div>
          <div class="finish">Дата закрытия: {{hrTimeFinish}}</div>
        </div>
      </div>
    </div>

    <span>
        <my-button v-if="actualRole" @click="showDialog">
          Добавить деталь трека
        </my-button>
        <my-button v-if="actualRole" @click="toAddStudent">
          Записать студентов на трек
        </my-button>
        <my-button v-if="actualRole">
          Входное тестирование
        </my-button>
    </span>

    <track-detail-list
        style="margin-top: 20px"
        :trackDetails="trackDetails"
        v-if="!isTrackDetailsLoading"
        @remove="removeTrackDetail"
    />
    <div v-else>Загружаем список элементов...</div>
    </div>

  <my-dialog v-model:show="IsDialogVisible">
    <track-detail-form
        v-model="form"
        v-model:canSubmit="isFormValid"
        :onSubmit="submitTrackDetailForm"/>
  </my-dialog>

  </div>
  <preloader v-else></preloader>
</template>

<script>
import TrackDetailList from '@/components/track-detail/track-detail-list'
import TrackDetailForm from '@/components/track-detail/track-detail-form'
import { useRoute } from 'vue-router'
import { useTrackDetails } from "@/hooks/trackPageHooks/useTrackDetails"
import { useTrack } from "@/hooks/trackPageHooks/useTrack"
import {ref} from "vue"
import { useTrackDetailForm } from "@/hooks/trackDetailsHooks/useTrackDetailForm"

export default {
  name: "TrackPage",
  components: {
    TrackDetailList,
    TrackDetailForm,
  },
  methods: {
    toAddStudent() {
      this.$router.push({path: `/tracks/${this.TEST.id}/add-student`})
    }
  },
  computed: {
    actualRole() {
      return this.$store.state.actualUser.roles.includes('teacher')
    }
  },
  async setup() {
    const route = useRoute()
    const trackId = route.params.id
    const IsDialogVisible = ref(false)

    console.log('ID of current track on the page: ' + trackId)
    const showDialog = () => {
      IsDialogVisible.value = true
    }
    const hideDialog = () => {
      IsDialogVisible.value = false
    }

    const {
      response,

      fetchTrack,
      isTrackLoading,

      hrTimeStart,
      hrTimeFinish,
      TEST
    } = await useTrack(trackId)

    const {
      trackDetails,
      isTrackDetailsLoading,
      removeTrackDetail
    } = await useTrackDetails(trackId)

    const {
      form, isFormValid,  resetForm,
      isSubmitted, error,
      submit, sendTrackDetailForm
    } = useTrackDetailForm()

    const submitTrackDetailForm = async () => {
      const newTrackDetail = await sendTrackDetailForm(trackId)
      console.log(newTrackDetail)
      trackDetails.value.push(newTrackDetail)
      hideDialog()
      resetForm()
    }

    return {

      response,

      fetchTrack,
      isTrackLoading,

      trackDetails,
      isTrackDetailsLoading,
      removeTrackDetail,

      hrTimeStart,
      hrTimeFinish,
      TEST,
      trackId,

      IsDialogVisible,
      showDialog,

      form,
      isFormValid,
      isSubmitted,
      error,
      submit,
      submitTrackDetailForm,
    }
  }
}
</script>

<style scoped>
.track-page {
  margin-left: 15px;
}

.preview-pic {
  /*width: 100%;
  height: 150px;*/

  width: 100%;
  min-height: 300px;
  border-radius: 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
/*  color: white;
  border: 1px solid white;*/
}
.content .btn {
  margin: 0 5px;
}
.about {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.content {
  min-height: 312px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 50px;
  padding: 25px;
  background: white;
}
.description {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.content > span {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.edit-and-time {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.start-finish {
  margin-top:10px;
  border-radius: 25px;
  color: teal;
  border: 3px solid teal;
  padding: 15px;
}
.track__preview_btn {
  background-color: #ffffffa6 !important;
  border-radius: 50px;
  align-self: center;
  margin-bottom: 24px;

}
.track__preview_info {
  width: 100%;
  height: 160px;
  color: #ffffff;
  display: flex;
  font-size: 36px;
  justify-content: center;
  align-items: center;
  /*background-color: #ffffffa6;*/
}

@media (max-width: 820px) {
  .about{
    flex-direction: column;
  }
  .edit-and-time {
  display: flex;
  flex-direction: column;
  margin-left: 0px;
  margin-top: 15px;
}
}
@media (max-width: 565px) {
  .content>span {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
  .content>span .btn{
    margin: 10px 0;
  }
}
</style>
