<template>
  <div class="track-catalogue-page" v-if="!isTrackListLoading">
    <div
      v-if="this.$store.state.actualUser.roles.includes('teacher')"
      class="main-wrapper__btns"
    >
      <my-button @click="toTrackCreate"> Создать трек </my-button>
    </div>

    <div class="main-wrapper__btns" v-else>
      <my-button :class="{activeList: activeButton === 'catalog' }" @click="changeCat('catalog')"> Каталог треков </my-button>
      <my-button :class="{activeList: activeButton === 'mycatalog' }" @click="changeCat('mycatalog')"> Мои треки </my-button>
    </div>

    <div v-if="this.$store.state.actualUser.roles.includes('teacher')">
      <div v-if="!isTrackListLoading">
        <track-list :tracks="getTracks" @remove="deleteTrack" />
      </div>
      <preloader v-else></preloader>
    </div>
    <div v-else>
      <div v-if="!isTrackListLoading">
        <track-list
          :tracks="getTracks"
          v-if="activeButton === 'catalog'"
          @remove="deleteTrack"
        />
        <my-track-list
          :tracks="getTracks"
          v-if="activeButton === 'mycatalog'"
          @remove="deleteTrack"
        />
      </div>
      <preloader v-else></preloader>
    </div>
  </div>
  <preloader v-else></preloader>
</template>

<script>
import TrackList from "@/components/track-list";
import { mapState, mapGetters, mapActions } from "vuex";
import MyTrackList from "@/components/myTrack-list.vue";

export default {
  name: "track-catalogue-page",
  components: {
    TrackList,
    MyTrackList,
  },
  data() {
    return {
      IsDialogVisible: false,
      activeButton: "catalog",
    };
  },
  mounted() {
    this.loadAndSetTracks();
  },
  methods: {
    ...mapActions({
      loadAndSetTracks: "trackCatalogue/loadAndSetTracks",
      deleteTrack: "trackCatalogue/deleteTrack",
    }),

    showDialog() {
      this.IsDialogVisible = true;
    },
    changeCat(cat) {
      this.activeButton = cat;
    },

    toTrackCreate() {
      this.$router.push("/tracks/create")
    },
  },
  computed: {
    ...mapState({
      isTrackListLoading: state => state.trackCatalogue.isTrackListLoading,
    }),
    ...mapGetters({
      getTracks: "trackCatalogue/getTracks",
    }),
  },
}
</script>

<style scoped>
.track-catalogue-page {
  margin-left: 15px;
}

.main-wrapper__btns {
  width: 100%;
  display: flex;
  justify-content: space-between;

}
.activeList {
  background-color: #008080a6;
  color: white;
}
</style>
