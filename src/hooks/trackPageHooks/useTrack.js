import {/*onMounted,*/ ref, computed } from 'vue'
import TrackApi from '@/api/Track'
import timeConverter from '@/helpers/timeConverter'

export async function useTrack(trackId) {
    /*these are reactive variables*/
    const isTrackLoading = ref(true)
    const response = ref(null)
    const TEST = ref({})

    const fetchTrack = async () => {
        try {
            const result = await TrackApi.get(trackId)
            response.value = result
            TEST.value = result.data.data //ok

            /*console.log('TEST in fetching: TEST = ', TEST)
            console.log('TEST in fetching: TEST.value = ', TEST.value)*/
        } catch (e) {
            alert(e)
        } finally {
            isTrackLoading.value = false
        }
    }

    await fetchTrack()
    //onMounted(fetchTrack)

    //human-readable time of start/finish
    const hrTimeStart = computed( () => timeConverter(TEST.value.data.dateTimeStart))
    const hrTimeFinish = computed( () => timeConverter(TEST.value.data.dateTimeFinish))

    return {
        response,

        isTrackLoading,
        fetchTrack,
        hrTimeStart,
        hrTimeFinish,

        TEST,
        //TEST2
    }
}