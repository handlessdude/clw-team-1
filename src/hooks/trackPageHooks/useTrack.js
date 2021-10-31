import {onMounted, ref, /*reactive,*//* toRefs*/ computed} from 'vue'
import TrackApi from '@/api/Track'
import timeConverter from '@/helpers/timeConverter'

export function useTrack(trackId) {
    /*these are reactive variables*/
    const isTrackLoading = ref(true)

   /* const assigned = ref(false)
    const id = ref(0)
    const status = ref("")
    const trDat = reactive({})
*/

    const response = ref(null)

    const assigned = ref(false)
    const id = ref(0)
    const status = ref("")
    const trackData = ref(null)

    const fetchTrack = async () => {
        try {
            const result = await TrackApi.get(trackId)
            response.value = result
            assigned.value = result.data.data.assigned
            id.value = result.data.data.id
            status.value = result.data.data.status
            trackData.value = result.data.data.data
            console.log('response.value = ',response.value)

            console.log('trackData.value = ',trackData.value)
            console.log('assigned.value = ',assigned.value)
            console.log('status.value = ',status.value)
            console.log('trackData.value = ',trackData.value)

        } catch (e) {
            alert(e)
        } finally {
            isTrackLoading.value = false
        }
    }
    //onMounted(fetching)
    //const trackData = toRefs(trDat)
    //fetchTrack()
    onMounted(fetchTrack)
    const hrTimeStart = computed( () => timeConverter(trackData.value.dateTimeStart))
    const hrTimeFinish = computed( () => timeConverter(trackData.value.dateTimeFinish))
    return {
        response,

        assigned ,
        id,
        status,
        trackData,
        /*...toRefs(RESULT),
        assigned,
        id ,
        status,*/
        isTrackLoading,
        fetchTrack,
        hrTimeStart,
        hrTimeFinish,
       // ...toRefs(trDat),

    }
}