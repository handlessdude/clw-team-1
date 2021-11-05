<template>
  <div class="mainpage">
    <div class="mainpage__header">
      <div class="mainpage__header_welcome">
        <h3 class="mainpage__header_headtext">
          Добро пожаловать {{ getUserInfo.user[0].fullName }}
        </h3>
        <p class="mainpage__header_maintext">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et quam
          quis dui imperdiet varius nec et magna. Phasellus facilisis libero
          erat, in elementum lectus posuere sed.
        </p>
      </div>
      <div class="mainpage__header_user">
        <div class="mainpage__header_userinfo">
          <!-- <img
            class="mainpage__header_useravatar"
            :src="require(`${getUserInfo.user[0].data[0].avatarURL}`)"
            alt="User Avatar"
          /> -->
          <img
            class="mainpage__header_useravatar"
            :src="require(`@/components/Images/Avatar.png`)"
            alt="User Avatar"
          />
          <div class="mainpage__header_userparams">
            <h3 class="mainpage__header_userparamsname">
              {{ getUserInfo.user[0].fullName }}
            </h3>
            <p class="mainpage__header_userparamsstatus">
              Статус: {{ getUserInfo.user[0].data[0].status }}
            </p>
          </div>
        </div>
        <div class="mainpage__header_userinfoitem">
          <p class="mainpage__header_itemtext">Заданные треки</p>
          <div class="mainpage__header_loading">
            <p class="mainpage__header_loadinfo">{{ getUserInfo.user[0].data[0].setTracks }}</p>
          </div>
        </div>
        <div class="mainpage__header_userinfoitem">
          <p class="mainpage__header_itemtext">Прохождение курса</p>
          <div class="mainpage__header_loading">
            <p
              class="mainpage__header_loadinfo"
              v-bind:class="[{ lightText: getUserInfo.user[0].data[0].percentProgress >= 40 }]"
            >
              {{ getUserInfo.user[0].data[0].percentProgress }}%
            </p>
            <div
              class="mainpage__header_loadstatus"
              :style="{ width: getUserInfo.user[0].data[0].percentProgress + '%' }"
            ></div>
          </div>
        </div>
        <div class="mainpage__header_userinfoitem">
          <p class="mainpage__header_itemtext">Пройденные треки</p>
          <div class="mainpage__header_loading">
            <p
              class="mainpage__header_loadinfo"
              v-bind:class="[{ lightText: tracksPercent >= 45 }]"
            >
              {{ getUserInfo.user[0].data[0].finTracks }}/{{ getUserInfo.user[0].data[0].allTracks }}
            </p>
            <div
              class="mainpage__header_loadstatus"
              :style="{ width: tracksPercent + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="mainpage__itemlist">
      <div
        class="mainpage__itemlist_linkblock mainpage__itemlist_track"
        @click="toMyTracks"
      >
        <h3 class="mainpage__itemlist_headtext">Мои Треки</h3>
        <div>
          <p class="mainpage__itemlist_text">Перейти</p>
          <p class="mainpage__itemlist_icon">
            <i class="far fa-play-circle"></i>
          </p>
        </div>
      </div>
      <div
        class="mainpage__itemlist_linkblock mainpage__itemlist_catalog"
        @click="toCatalog"
      >
        <h3 class="mainpage__itemlist_headtext">Каталог</h3>
        <div>
          <p class="mainpage__itemlist_text">Перейти</p>
          <p class="mainpage__itemlist_icon">
            <i class="far fa-play-circle"></i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Main",
  data() {
    return {
      change: true,
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
    tracksPercent() {
      return +(
        100 -
        ((this.getUserInfo.user[0].data[0].allTracks - this.getUserInfo.user[0].data[0].finTracks) /
          this.getUserInfo.user[0].data[0].allTracks) *
          100
      ).toFixed(0);
    },
  },
  methods: {
    toCatalog() {
      this.$router.push({ path: "/catalogue" });
    },
    toMyTracks() {
      this.$router.push({ path: "/tracks" });
    },
  },
};
</script>

<style lang="sass" scoped>
.mainpage
  margin: 0 auto
  max-width: 1024px
  &__header
    display: flex
    justify-content: space-between
    padding-top: 24px
    margin-left: 20px
    margin-right: 20px
    &_welcome
      width: 480px
      margin-right: 24px
    &_headtext
      font-size: 46px
      font-weight: 400
      line-height: 62px
      text-align: left
    &_maintext
      font-weight: 400
      font-size: 16px
      text-align: left
    &_user
      max-width: 540px
      display: grid
      grid-gap: 8px
      grid-template-columns: repeat(2, 1fr)
      background-color: #ffffff
      border-radius: 20px
      box-sizing: border-box
    &_itemtext
      align-self: flex-start
      font-weight: 100
      font-size: 15px
      color: #355E66

    &_userinfo
      border-radius: 25px
      margin-top: 12px
      margin-left: 12px
      display: flex
    &_useravatar
      width: 110px
      height: 110px
    &_userparams
      margin-left: 16px
      display: flex
      flex-direction: column
      align-items: flex-start
      justify-content: center
    &_userparamsname
      font-size: 24px
      font-weight: 400
      margin-bottom: 16px
    &_userparamsstatus
      font-size: 16px
      font-weight: 200

    &_userinfoitem
      display: flex
      flex-direction: column
      margin: 12px

    &_loading
      position: relative
      width: 160px
      height: 40px
      border: 3px solid #355E66
      border-radius: 50px
      margin-top: 12px
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
    &_loadstatus
      height: 90%
      max-width: 97%
      min-width: 20%
      background-color: #355E66
      border-radius: 50px
      color: #ffffff
      font-size: 16px
      margin-left: 2px
      margin-right: 2px
      align-self: flex-start
    &_loadinfo
      position: absolute
      color: #355E66
      text-shadow: 0 0 5px #ffffff
  &__itemlist
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(280px, 480px))
    grid-gap: 24px
    margin-top: 72px
    justify-content: space-between
    box-sizing: border-box
    overflow: scroll
    height: 640px
    &_linkblock
      position: relative
      height: 280px
      border-radius: 50px
      margin-top: 20px
      margin-left: 20px
      margin-right: 20px
      color: #ffffff
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      transition: all 0.2s
      &:hover
        box-shadow: 0 0 15px -5px black
        transform: scale(1.01)
      &:active
        box-shadow: 0 0 8px -3px black
        transform: scale(1)
    &_headtext
      position: absolute
      left: 24px
      top: 34px
      font-size: 24px
      font-weight: 200
    &_text
      font-size: 16px
      font-weight: 200
    &_icon
      font-size: 80px
      margin-top: 8px
    &_track
      background-image: url(../components/Images/homeitem1.png)
      background-size: cover
    &_catalog
      background-image: url(../components/Images/homeitem2.png)
      background-size: cover
.lightText
  color: #ffffff
  text-shadow: 0 0 8px #000000
</style>
