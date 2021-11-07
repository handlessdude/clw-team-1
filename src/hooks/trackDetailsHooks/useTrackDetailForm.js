import {ref, onErrorCaptured } from 'vue'
import { useForm } from '@/hooks/useForm'
import { isRequired } from '@/helpers/Validators'

export function useTrackDetailForm() {
    const tdSubmitted = ref(false)
    const tdError = ref(null)

    const tdForm = useForm({
        type: {
            value: '',
            validators: { isRequired }
        },
        entityName: {
            value: '',
            validators: { isRequired }
        },
        //here goes nice validator of format "XX hours YY minutes but not yet"
        entityDuration: {
            value: '',
            validators: { isRequired }
        },
        required: {
            value: false,
            validators: {  }
        }
    })

    function tdSubmit() {
        console.log('Form = ', tdForm)
        tdSubmitted.value = true
    }

    onErrorCaptured(e => {
        tdError.value = e.message
    })

    return { tdForm, tdSubmit, tdSubmitted, tdError }

}

