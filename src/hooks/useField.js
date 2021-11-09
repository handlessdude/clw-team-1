import {ref, watch} from 'vue'

const not = val => !val

export function useField(field) {

    const value = ref(field.value)
    const isValid = ref(true)
    const isTouched = ref(false)
    const errors = ref({})

    const reassign = val => {
        isValid.value = true
        Object.keys(field.validators ?? {}).map(name => {
            const valid = field.validators[name](val)
            errors.value[name] = not(valid)
            if (not(valid)) {
                isValid.value = false
            }
        })
    }

    watch(value, reassign, {immediate: true})

    return {value, isValid, isTouched, errors, blur: () => isTouched.value = true}
}
