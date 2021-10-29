import {onMounted, ref} from 'vue'
import TrackApi from '../../api/Track'

export function useTrack(trackId) {
    /*these are reactive variables*/
    const assigned = ref(false)
    const id = ref(0)
    const status = ref("")

    const dateTimeFinish = ref(0)
    const dateTimeStart= ref(0)
    const mode = ref("")
    const name = ref("")
    const previewPicture = ref("")
    const previewText = ref("")
    const published= ref(false)

    //onst TEST = ref()
    //console.log(typeof(TEST.value)) //undefined
    const fetching = async () => {
        try {
            const response = await TrackApi.get(trackId)
            const info = response.data.data
            //TEST.value = response.data.data
            //console.log(typeof(TEST.value))//object , но почему в TrackPage он снова undefined?
            //TODO: ask for more elegant solution maybe??
            assigned.value = info.assigned
            id.value = info.id
            status.value = info.status

            dateTimeFinish.value = info.data.dateTimeFinish
            dateTimeStart.value = info.data.dateTimeStart
            mode.value  = info.data.mode
            name.value  = info.data.name
            previewPicture.value  = info.data.previewPicture
            previewText.value  = info.data.previewText
            published.value = info.data.published

        } catch (e) {
            alert(e)
        }
    }
    onMounted(fetching)
    return {
        /*TEST,*/
        assigned,
        id ,
        status,
        dateTimeFinish ,
        dateTimeStart,
        mode,
        name ,
        previewPicture,
        previewText ,
        published,
    }
}
