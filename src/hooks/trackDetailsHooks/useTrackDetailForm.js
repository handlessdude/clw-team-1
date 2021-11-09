import {ref, /*onErrorCaptured*/ } from 'vue'
//import TrackDetailApi from '@/api/TrackDetail'
import TrackDetailApi from '@/api/TrackDetail'

import { useForm } from '@/hooks/useForm'
import { isRequired } from '@/helpers/Validators'

export function useTrackDetailForm() {
    const isSubmitted = ref(false)
    const error = ref(null)

    const { form, isFormValid } = useForm({
        type: {
            value: '',
            validators: { isRequired }
        },
        entityName: {
            value: '',
            validators: { isRequired }
        },
        entityDuration: {
            value: '',
            validators: { isRequired }
        },
        required: {
            value: false,
            validators: {  }
        }
    })

    const submit = () => {
        console.log('Form = ', form)
        isSubmitted.value = true
    }

    /*onErrorCaptured(e => {
        error.value = e.message
    })*/

    const sendTrackDetailForm = async (/*method,*/
                                       trackId,
                                       /*trackDetails*/) => {
        try {
            const trackDetailData = {}
            for (const [key, val] of Object.entries(form.value)) {
                trackDetailData[key] = val.value
            }

            //console.log('method = ',method)
            const response = await TrackDetailApi.post(trackId, trackDetailData)
            const trackDetail = {
                id: response.data.data.id,
                data: trackDetailData,
            }
            return trackDetail

        } catch (err) {
            console.log(err)
            return err
        }
    }

    return { form, isFormValid, isSubmitted, error, submit, sendTrackDetailForm }

}

