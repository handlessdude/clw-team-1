import {onMounted, ref, /*reactive,*//* toRefs*/ computed} from 'vue'
import TrackApi from '@/api/Track'
import timeConverter from '@/helpers/timeConverter'

export function useTrack(trackId) {
    /*these are reactive variables*/
    const isTrackLoading = ref(true)
    const response = ref(null)
    const TEST = ref(null)

    const fetchTrack = async () => {
        try {
            const result = await TrackApi.get(trackId)
            response.value = result
            TEST.value = result.data.data
            console.log('FETCHING TRACK!!!!!!!!!!')
        } catch (e) {
            alert(e)
        } finally {
            isTrackLoading.value = false
        }
    }

    onMounted(fetchTrack)

    const hrTimeStart = computed( () => timeConverter(TEST.value.data.dateTimeStart))
    const hrTimeFinish = computed( () => timeConverter(TEST.value.data.dateTimeFinish))

    return {
        response,


        isTrackLoading,
        fetchTrack,
        hrTimeStart,
        hrTimeFinish,
        TEST
    }
}