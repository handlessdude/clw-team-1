<template>
<div class="sidebar">

</div>
</template>

<script>
export default {
  name: "sidebar"
}
</script>

<style scoped>

.sidebar {
  color: #ffedd9;
  background-color: #355e66;
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 10px;
  width: 200px;
  transform: translateX(-200px);
 /* transition: 0.3s ease;*/
  display: flex;
  flex-direction: column;
}

</style>