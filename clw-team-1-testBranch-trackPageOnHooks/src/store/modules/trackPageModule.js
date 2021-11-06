//import TrackApi from "../../api/Track"
//import nestedAccess from "../../helpers/nestedAccess"
export const trackPageModule = {
    state: () => ({
        title: 'track-page',
        /*trackId: 0,
        trackStatus: "",
        trackAssigned: false,
        trackData: {},*/
        trackData: {},
        isTrackLoading: false,
    }),
    getters: {
        /*getTrackData(state) {
            return state.trackData
        },
        getTrackParam: (state) => (path) => {
            return nestedAccess(state.trackData, path)
        }*/
    },
    mutations: {
        /*setTrackData(state, data) {
            /!*this.state.trackId = data.id
            this.state.trackStatus= data.status
            this.state.trackAssigned= data.assigned
            this.state.trackData = data.trackData*!/
            this.state.trackData = data
        },
        setIsTrackLoading(state, bool) {
            state.isTrackLoading = bool
        },*/
    },
    actions: {
        /*async loadAndSetTrack({ commit }, trackId) {
            try {
                commit("setIsTrackLoading", true)
                const response = await TrackApi.get(trackId)
                console.log(response)
                commit("setTrackInfo", response.data)
                return response
            } catch (e) {
                alert("Error has spawned!")
                console.log(e)
                return e
            } finally {
                commit("setIsTrackLoading", false)
            }
        },*/
    },
    namespaced: true
}
