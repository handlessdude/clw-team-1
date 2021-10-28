<template>
  <div class="track-detail-item" @click="$router.push(`/track_detail/${trackDetail.id}`)">
    <div class="move__btns">
      <my-button>
        <i class="fas fa-arrow-up"></i>
      </my-button>
      <my-button>
        <i class="fas fa-arrow-down"></i>
      </my-button>
    </div>

    <div class="track-detail-info">
      <h4>{{ trackDetail.data.type }}</h4>
      <h3>{{ trackDetail.entityName }}</h3>
      <h4>{{ trackDetail.entityDuration }}</h4>
    </div>

    <div class="track-detail-item__btns">
      <span>
        <my-button
            @click.stop="$emit('remove', trackDetail)"
        >
          Удалить
        </my-button>
        <my-button
           @click.stop="$emit('lock', trackDetail)"
        >
         Удалить
        </my-button>
      </span>
      <my-select
          :model-value="necessity"
          @update:model-value="setNecessity"
          :options="necessityOptions"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "track-detail-item",
  props: {
    trackDetail: {
      type: Object, //type of out prop 'track'
      required: true, //info about track is sufficient
    },
  },
}
</script>

<style scoped>

.move__btns:hover * {
  cursor: pointer;
}
.move__btns {
  display: flex;
  flex-direction: column;
}
</style>
