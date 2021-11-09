<template>
  <div class="track-detail-item" >
    <div class="move__btns">
      <my-button v-if="this.$store.state.actualUser.roles.includes('teacher')">
        <i class="fas fa-arrow-left"></i>
      </my-button>
      <my-button v-if="this.$store.state.actualUser.roles.includes('teacher')">
        <i class="fas fa-arrow-right"></i>
      </my-button>
    </div>

    <div class="track-detail-info">
    <div class="detail-content">
      <h4>{{ trackDetail.data.type }}</h4>
      <h3>{{ trackDetail.entityName }}</h3>
      <h4>{{ trackDetail.entityDuration }}</h4>
    </div>
      <div class="track-detail-item__btns">
      <span>

<!--  TODO реализовать @click.stop="$emit('remove', trackDetail)"-->
        <my-button
            v-if="this.$store.state.actualUser.roles.includes('teacher')"
            @click.stop="$emit('remove', trackDetail.id)"
        >
          Удалить
        </my-button>
<!--  TODO   @click.stop="$emit('lock', trackDetail)"-->
        <my-button
          v-if="this.$store.state.actualUser.roles.includes('teacher')"
        >
         Заблокировать
        </my-button>
      </span>
      <div class="play-btn">
      <my-button-re>
          Начать
      </my-button-re>
      </div>
      <!--      <my-select
          :model-value="necessity"
          @update:model-value="setNecessity"
          :options="necessityOptions"
      />-->
    </div>
  </div>
  </div>
</template>

<script>
import myButtonRe from '../ui-components/my-button-re.vue'
export default {
  components: { myButtonRe },
  name: "track-detail-item",
  props: {
    trackDetail: {
      type: Object, //type of out prop 'track'
      required: true, //info about track is sufficient
    },
    remove: {

    },
  },
}
</script>

<style scoped>
.track-detail-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top:20px;
}
.track-detail-info{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 250px;
  padding: 15px;
  border: 3px solid teal;
  border-radius: 25px;
  background-color: #F2F2F2;
}
.track-detail-info:hover {
  cursor: pointer;
  box-shadow: 0 0 15px -5px black;
  transform: scale(1.01);
  animation-duration: 1s;
}
.detail-content {
  height: 130px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  text-align: left;
}
.track-detail-item__btns {
  width: 100%;
}
.track-detail-info span {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.play-btn {
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.move__btns:hover * {
  cursor: pointer;
}
.move__btns {
  display: flex;
  flex-direction: column;
  margin-right: 15px;
}
</style>
