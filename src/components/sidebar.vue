<template>
  <div class="sidebar" :style="{ width: getSidebarWidth }">
<span
    class="collapse-icon"
    @click="toggleSidebar"
>
<i class="fas fa-angle-double-left"></i>
</span>
</div>
</template>

<script>

import { mapMutations, mapGetters } from "vuex";

export default {
  name: "sidebar",
  methods: {
    ...mapMutations({
      toggleSidebar: 'sidebar/toggleSidebar',
    }),
  },
  computed: {
    ...mapGetters({
      getSidebarWidth: 'sidebar/getSidebarWidth',
    })
  },
}
</script>

<style>
:root {
  --light-text-color: #ffedd9;
  --sidebar-bg-color: #355e66;
  --sidebar-item-hover: #4d8993;
  --sidebar-item-active: #27444b;
}
</style>

<style scoped>

.sidebar {
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

</style>