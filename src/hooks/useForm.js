import {computed, ref} from 'vue'
import { useField } from '@/hooks/useField'

export function useForm(init = {}) {
    const form = ref({})
    const validKey = 'isValid'

    for (const [key, value] of Object.entries(init)) {
        form.value[key] = useField(value)
    }

    const withoutValid = k => k !== validKey

    form.value[validKey] = computed(() =>
        Object.keys(form.value).filter(withoutValid).every(k => form.value[k].isValid)
    )

    return form
}
