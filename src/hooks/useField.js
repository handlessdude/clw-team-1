import {ref, watch} from 'vue'

const not = val => !val

export function useField(field) {

    const isValid = ref(true)
    const value = ref(field.value)
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

    //if it works than reassign() is not required
    watch(value, reassign, {immediate: true})
    //reassign(field.value)

    return {value, isValid, errors, isTouched, blur: () => isTouched.value = true}
}
