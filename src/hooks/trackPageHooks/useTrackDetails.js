import {onMounted, ref} from 'vue'
import getTrackDetails from '@/api/TrackDetails'
import TrackDetailApi from '@/api/TrackDetail'

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
    const removeTrackDetail = async (TrackDetailId) => {
        try {
            const hasProperId = (trackDetail) => trackDetail.id === TrackDetailId
            const found = trackDetails.value.findIndex(hasProperId)
            if (!(found === -1)) {
                trackDetails.value.splice(found, 1)
                TrackDetailApi.delete(TrackDetailId)
            } else {
                alert('invalid id\ncouldn\'t remove from trackDetailsList')
            }
        } catch (e) {
            alert(e)
        }


    }
    onMounted(fetching)
    return {
        trackDetails,
        isTrackDetailsLoading,
        removeTrackDetail
    }
}
