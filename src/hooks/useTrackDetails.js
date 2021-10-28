import {onMounted, ref} from 'vue'
import getTrackDetails from '../api/TrackDetails'

export function useTrackDetails(trackId) {
    /*these are reactive variables*/
    const trackDetails = ref([])
    const isTrackDetailsLoading = ref(true)

    const fetching = async () => {
        try {
            const response = await getTrackDetails(trackId)
            trackDetails.value = response.data.data
        } catch (e) {
            alert(e)
        } finally {
            isTrackDetailsLoading.value = false
        }
    }
    onMounted(fetching)
    return {
        trackDetails,
        isTrackDetailsLoading
    }
}
