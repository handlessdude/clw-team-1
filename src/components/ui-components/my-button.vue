<template>
  <button class="btn">
    <!-- everything that goes to my-button goes to this slot-->
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button"
}
</script>

<style scoped>
.btn {
  border-radius: 12px;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
.btn:hover{
  cursor: pointer;
}
</style>