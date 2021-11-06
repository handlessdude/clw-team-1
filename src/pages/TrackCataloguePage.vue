<template>
  <div class="track-catalogue-page" v-if="!isTrackListLoading">
    <!--   TODO auth-conditional switcher for <all tracks/my tracks>(student)
        and <createTrack>(teacher)-->

    <div
      v-if="this.$store.state.actualUser.roles.includes('teacher')"
      class="main-wrapper__btns"
    >
      <!-- <my-button style="align-self: flex-start" @click="showDialog">Создать трек</my-button> -->
      <my-button @click="toTrackCreate"> Создать трек </my-button>
    </div>

    <div class="main-wrapper__btns" v-else>
      <my-button :class="{activeList: activeButton === 'catalog' }" @click="changeCat('catalog')"> Каталог треков </my-button>
      <my-button :class="{activeList: activeButton === 'mycatalog' }" @click="changeCat('mycatalog')"> Мои треки </my-button>
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
// import PostTrack from "@/components/post-track";
import TrackApi from "@/api/Track";

import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { useRouter } from "vue-router";
import MyButton from "../components/ui-components/my-button.vue";
import MyTrackList from "../components/myTrack-list.vue";

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
    }),
    ...mapMutations({
      setTracks: "trackCatalogue/setTracks",
    }),
    async postTrack(track) {
      try {
        const response = await TrackApi.post(track.data)
        track.id = response.data.data.id
        this.tracks.push(track)
        this.IsDialogVisible = false
      } catch (err) {
        console.log(err)
        return err
      }
    },

    async deleteTrack(trackId) {
      try {
        await TrackApi.delete(trackId)
        // we do not make another request to server in order to rerender the track list
        this.setTracks(this.tracks.filter(t => t.id !== trackId))

      } catch (e) {
        console.log(e)
        return e
      }
    },

    showDialog() {
      this.IsDialogVisible = true;
    },
    changeCat(cat) {
      this.activeButton = cat;
    },
  },
  computed: {
    ...mapState({
      tracks: state => state.trackCatalogue.tracks,
      isTrackListLoading: state => state.trackCatalogue.isTrackListLoading,
    }),
    ...mapGetters({
      getTracks: "trackCatalogue/getTracks",
    }),
  },
  setup() {
    const router = useRouter()
    const toTrackCreate = () => {
      router.push("/tracks/create")
    };
    return {
      toTrackCreate,
    }
  }
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
