<template>

  <input
      type="text"
      v-model.trim="searchQueryString"
      placeholder="Поиск..."
  >

  <div>{{searchQueryString}}</div>

  <ul v-if="!isCoursesLoading&&courses.length">
    <li
        v-for="course in courses"
        :key="course.id"
        @click="selectCourse(course)"
    >
      {{course.name }}
    </li>
  </ul>

  <p v-if="courseData.name">
    You have selected: {{ courseData.name }}
  </p>
</template>

<script>
import {ref} from 'vue'
//import { useVModel } from "@/hooks/useVModel"
import { useCourses } from "@/hooks/searchHooks/useCourses"
export default {
  name: "autocomplete",
  props: ['modelValue'],
  setup () {
    //const courseData = useVModel(props, 'modelValue')
    const courseData = ref({})
    const {
      courses,
      isCoursesLoading,
      searchQueryString,
      fetchCourses,
    } = useCourses()
//console.log(courses.value.length)
    const selectCourse = (course) => {
      courseData.value = course
      searchQueryString.value = ''
    }

    return {
      courseData,
      courses,
      isCoursesLoading,
      searchQueryString,
      fetchCourses,
      selectCourse
    }
  }
}
</script>

<style scoped>

</style>
