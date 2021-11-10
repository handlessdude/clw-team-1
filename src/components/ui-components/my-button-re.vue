<template>
  <button class="btn-re">
    <!-- everything that goes to my-button goes to this slot-->
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button-re"
}
</script>

<style scoped>
.btn-re {
  border-radius: 50px;
  padding: 10px 15px;
  background-color: teal;
  color: white;
  border: 1px solid teal;
}
.btn-re:hover{
  cursor: pointer;
  background-color: white;
  color: teal;
}
</style>