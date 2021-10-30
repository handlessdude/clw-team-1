import {onMounted, ref, reactive, toRefs} from 'vue'
import TrackApi from '../../api/Track'

export function useTrack(trackId) {
    /*these are reactive variables*/
    const isTrackLoading = ref(true)

    const assigned = ref(false)
    const id = ref(0)
    const status = ref("")
    const trDat = reactive({})

    const fetching = async () => {
        try {
            const response = await TrackApi.get(trackId)
            const info = response.data.data
            assigned.value = info.assigned
            id.value = info.id
            status.value = info.status

            for (const key of Object.keys(info.data)) {
                trackData[key] = info.data[key]
            }
            //trackData = toRefs(trackData)
            //trackData.target = reactive(info.data)
        } catch (e) {
            alert(e)
        } finally {
            isTrackLoading.value = false
        }
    }
    onMounted(fetching)
    const trackData = toRefs(trDat)
    return {
        assigned,
        id ,
        status,
        isTrackLoading,
        trackData,

    }
}