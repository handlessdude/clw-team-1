import { ref } from 'vue'
//import TrackDetailApi from '@/api/TrackDetail'
import TrackDetailApi from '@/api/TrackDetail'
import { useForm } from '@/hooks/useForm'
import { isRequired } from '@/helpers/Validators'

export function useTrackDetailForm(initValues = {
    type: '',
    entityName: '',
    entityDuration: '',
    required: false,
}) {
    const isSubmitted = ref(false)
    const error = ref(null)

    const { form, isFormValid, resetForm } = useForm({
        type: {
            value: initValues.type,
            //'validators' could contain any other custom validation funcs
            validators: { isRequired }
        },
        entityName: {
            value: initValues.entityName,
            validators: { isRequired }
        },
        entityDuration: {
            value: initValues.entityDuration,
            validators: { isRequired }
        },
        required: {
            value: initValues.required,
            validators: {  }
        }
    })

    const submit = () => {
        console.log('Form = ', form)
        isSubmitted.value = true
    }

    const sendTrackDetailForm = async (trackId) => {
        try {
            const trackDetailData = {}
            for (const [key, val] of Object.entries(form.value)) {
                trackDetailData[key] = val.value
            }
            //trackDetailData.entityId = 85

            const response = await TrackDetailApi.post(trackId, trackDetailData)
            const trackDetail = {
                id: response.data.data.id,
                data: trackDetailData,
            }
            return trackDetail

        } catch (err) {
            console.log(err)
            error.value = err.message
            return err
        }
    }

    return {
        form, isFormValid,  resetForm,
        isSubmitted, error,
        submit, sendTrackDetailForm
    }

}

