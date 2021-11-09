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
        @click="changeCat('mycatalog')"
      >
        Мои треки
      </my-button>
    </div>
    <!--
       'create' comes from child
       'createPost' works after emitting the event in child
   -->
    <!-- <my-dialog v-model:show="IsDialogVisible">
      <post-track @create="postTrack" />
    </my-dialog> -->

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
import TrackApi from "@/api/Track";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { useRouter } from "vue-router";

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
    }),
    ...mapMutations({
      setTracks: "trackCatalogue/setTracks",
      setActualList: "setActualList",
    }),
    async postTrack(track) {
      try {
        const response = await TrackApi.post(track.data);
        track.id = response.data.data.id;
        this.tracks.push(track);
        this.IsDialogVisible = false;
      } catch (err) {
        console.log(err);
        return err;
      }
    },

    async deleteTrack(trackId) {
      try {
        await TrackApi.delete(trackId);
        // we do not make another request to server in order to rerender the track list
        this.setTracks(this.tracks.filter((t) => t.id !== trackId));
      } catch (e) {
        console.log(e);
        return e;
      }
    },


    showDialog() {
      this.IsDialogVisible = true;
    },
    changeCat(cat) {
      this.$store.commit('setActualList', cat)
      this.listCondit()
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
      tracks: (state) => state.trackCatalogue.tracks,
      isTrackListLoading: (state) => state.trackCatalogue.isTrackListLoading,
    }),
    ...mapGetters({
      getTracks: "trackCatalogue/getTracks",
      getActualList: "getActualList",
    }),
  },
  setup() {
    const router = useRouter();
    const toTrackCreate = () => {
      router.push("/tracks/create");
    };
    return {
      toTrackCreate,
    };
  },
};
</script>

<style scoped>
.track-catalogue-page {
  margin-left: 15px;
}

.main-wrapper__btns {
  width: 100%;
  display: flex;
  margin: 21px;
}
.activeBtn {
  background-color: #008080a6 !important;
  color: white !important;
}
</style>
