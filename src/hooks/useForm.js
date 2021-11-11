import {computed, ref} from 'vue'
import { useField } from '@/hooks/useField'

export function useForm(init = {}) {
    const form = ref({})
    for (const [key, value] of Object.entries(init)) {
        form.value[key] = useField(value)
    }

    const validKey = 'isValid'
    const withoutValid = k => k !== validKey

    const isFormValid = computed(() =>
        Object.keys(form.value).filter(withoutValid).every(k => form.value[k].isValid)
    )

    const resetForm = () => {
        for (const [key, val] of Object.entries(init)) {
            form.value[key].value = val.value
        }
    }

    return { form, isFormValid, resetForm }
}
