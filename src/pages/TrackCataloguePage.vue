<template>
  <div class="track-catalogue-page" v-if="!isTrackListLoading">
    <div
      v-if="this.$store.state.actualUser.roles.includes('teacher')"
      class="main-wrapper__btns"
    >
      <my-button @click="toTrackCreate"> Создать трек </my-button>
    </div>
    <div class="main-wrapper__btns" v-else>
      <my-button
        :class="{ activeBtn: this.getActualList === 'catalog' }"
        @click="changeCat('catalog')"
      >
        Каталог треков
      </my-button>
      <my-button
        :class="{ activeBtn: this.getActualList === 'mycatalog' }"
        style="margin-right: 40px"
        @click="changeCat('mycatalog')"
      >
        Мои треки
      </my-button>
    </div>

    <div v-if="this.$store.state.actualUser.roles.includes('teacher')">
      <div v-if="!isTrackListLoading">
        <router-view :tracks="getTracks" @remove="deleteTrack" />
      </div>
      <preloader v-else></preloader>
    </div>
    <div v-else>
      <div v-if="!isTrackListLoading">
        <router-view :tracks="getTracks" />
      </div>
      <preloader v-else></preloader>
    </div>
  </div>
  <preloader v-else></preloader>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "track-catalogue-page",
  data() {
    return {
      IsDialogVisible: false,
      activeButton: "catalog",
    };
  },
  mounted() {
    this.loadAndSetTracks();
    this.listCondit()
  },
  watch: {
    getActualList: function () {
      this.listCondit()
    }
  },
  methods: {
    ...mapActions({
      loadAndSetTracks: "trackCatalogue/loadAndSetTracks",
      deleteTrack: "trackCatalogue/deleteTrack",
    }),
    ...mapMutations({
      setTracks: "trackCatalogue/setTracks",
      setActualList: "setActualList",
    }),

    showDialog() {
      this.IsDialogVisible = true;
    },
    changeCat(cat) {
      this.$store.commit('setActualList', cat)
      this.listCondit()
    },
    toTrackCreate() {
      this.$router.push("/tracks/create")
    },
    listCondit() {
      if (this.getActualList === "catalog") {
        this.$router.push({ path: "/tracks/catalogue" });
      } else {
        this.$router.push({ path: "/tracks/my-catalogue" });
      }
    }
  },
  computed: {
    ...mapState({
      tracks: state => state.trackCatalogue.tracks,
      isTrackListLoading: state => state.trackCatalogue.isTrackListLoading,
    }),
    ...mapGetters({
      getTracks: "trackCatalogue/getTracks",
      getActualList: "getActualList",
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
  margin: 21px;
}
.activeBtn {
  background-color: #008080a6 !important;
  color: white !important;
}
.activeList {
  background-color: #008080a6;
  color: white;
}
</style>
