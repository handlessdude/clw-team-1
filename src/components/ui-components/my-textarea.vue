<template>
<textarea :value="modelValue"
          @input="updateTextarea"
          class="textarea"
></textarea>
</template>

<script>
export default {
  name: "my-textarea",
  props: {
    modelValue: String
  },
  methods:{
    updateTextarea(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.textarea {
  box-sizing: border-box;
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}

</style>