import { ref, watch } from 'vue'
import SearchApi from "@/api/Search"

export function useCourses() {
    const courses = ref([])
    const isCoursesLoading = ref(true)
    const searchQueryString = ref("")

    const fetchCourses = async () => {
        try {
            const response = await SearchApi.getCourses(searchQueryString)
            courses.value = response.data.data
        } catch (e) {
            alert(e)
        } finally {
            isCoursesLoading.value = false
        }
    }

    watch(searchQueryString, fetchCourses)

    return {
        courses,
        isCoursesLoading,
        searchQueryString,
        fetchCourses,
    }
}
