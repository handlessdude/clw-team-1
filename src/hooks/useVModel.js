import { computed, getCurrentInstance } from 'vue'

export const useVModel = (props, propName= 'modelValue') => {
    const vm = getCurrentInstance().proxy

    return computed({
        get: () => props[propName],
        set: (value) => vm.$emit(`update:${propName}`, value)
    })
}
