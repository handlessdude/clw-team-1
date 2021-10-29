<template>
  <div class="sidebar" :style="{ width: getSidebarWidth }">

    <span v-if="isCollapsed" class="logo">
    </span>
    <div v-else>
      <div class="logo-open"></div>
      <hr style="margin:15px 10px;">
    </div>

    <sidebar-link to="/" icon="fas fa-home">Главная</sidebar-link>
    <sidebar-link to="/tracks" icon="fas fa-truck-monster">Треки</sidebar-link>
    <sidebar-link to="/catalogue" icon="fas fa-columns">Каталог</sidebar-link>

    <span v-if="isCollapsed"></span>
    <div v-else class="account">
      <hr style="margin:15px 10px;">
      <div class="avatar"></div>
      <h4>UserName</h4>
      <p>Статус</p>
    </div>

    <span
      class="collapse-icon"
      :class="{'rotate-180': isCollapsed }"
      @click="toggleSidebar"
    >
    <i class="fas fa-angle-double-left"></i>
</span>
</div>
</template>

<script>

import { mapMutations, mapGetters, mapState } from "vuex";
import SidebarLink from './ui-components/sidebar-link'

export default {
  name: "sidebar",
  components: {
    SidebarLink,
  },
  methods: {
    ...mapMutations({
      toggleSidebar: 'sidebar/toggleSidebar',
    }),
  },
  computed: {
    ...mapState({
      isCollapsed: state => state.sidebar.isCollapsed,
    }),
    ...mapGetters({
      getSidebarWidth: 'sidebar/getSidebarWidth',
    })
  },
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Montserrat:400,500,80);
:root {
  --light-text-color: #ffedd9;
  --sidebar-bg-color: #355e66;
  --sidebar-item-hover: #4d8993;
  --sidebar-item-active: #27444b;
}
</style>

<style scoped>

.sidebar {
  box-sizing: content-box;
  color: var(--light-text-color);
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}
.collapse-icon {
  position: absolute;
  bottom:0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}
.logo {
  background-image: url(Images/Logo.png);
  background-size: cover;
  width:35px; 
  height:35px;
}
.logo-open {
  background-image: url(Images/Logo-open.png);
  background-size: cover;
  width:170px; 
  height:40px;
}
.sidebar-link {
  margin: 20px 0;
}
.account {
  width: 100%;
  height: 200px;
  margin-top: auto;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background-image: url(Images/Avatar.png);
  margin: 10px auto;
}
.collapse-icon:hover {
  cursor:pointer;
  color: var(--light-text-color);
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>