/*import TrackApi from "../../api/Track";*/

export const trackPageModule = {
    state: () => ({
        title: 'track-page',
       /* trackInfo: {
            id:0,
        },*/
    }),
    getters: {
        /*getTrackInfo(state) {
            return state.trackInfo
        },*/
    },
    mutations: {
        /*setTrackInfo(state, trackInfo) {
            state.trackInfo = trackInfo
        },*/
    },
    actions: {
        /*async loadAndSetTrackInfo({ commit }) {
            try {
                const response = await TrackApi.get(this.state.id)
                console.log(response)
                commit("setTrackInfo", response.data)
                return response
            } catch (e) {
                alert("Error has spawned!")
                console.log(e)
                return e
            } finally {
                /!*commit("setIsTrackListLoading", false)*!/
            }
        },*/
    },
    namespaced: true
}
