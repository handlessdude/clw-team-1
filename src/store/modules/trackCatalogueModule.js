import TrackApi from "@/api/Track"

export const trackCatalogueModule = {
    state: () => ({
        title: "track-catalogue",
        tracks: [],
        isTrackListLoading: false,
        /*selectedSort: '',
            searchQuery: '',
            sortOptions: [ //array of select-list items
                { value: 'id', name: 'По ID'},
                { value: 'data.name', name: 'По названию'}
            ],*/
    }),
    getters: {
        getTracks(state) {
            return state.tracks
        },
        /*sortedTracks(state) {
                return [...state.tracks].sort((track1, track2) =>
                    String(resolvePath(track1, state.selectedSort))?.localeCompare(String(resolvePath(track2, state.selectedSort))))
            },
            sortedAndSearchedTracks(state, getters) {
                return getters.sortedTracks.filter(track => track.data.name.toLowerCase().includes(state.searchQuery.toLowerCase()))
            }*/
    },
    mutations: {
        setTracks(state, tracks) {
            state.tracks = tracks;
        },
        setIsTrackListLoading(state, bool) {
            state.isTrackListLoading = bool
        },
        /*setSelectedSort(state, selectedSort) {
                state.selectedSort = selectedSort
            },
            setSearchQuery(state, searchQuery) {
                state.searchQuery = searchQuery
            },*/
    },
    actions: {
        async loadAndSetTracks({ commit }) {
            try {
                commit("setIsTrackListLoading", true)
                const response = await TrackApi.getTracks()
                commit("setTracks", response.data.data)
                return response
            } catch (e) {
                console.log(e)
                return e
            } finally {
                commit("setIsTrackListLoading", false)
            }
        },
        async deleteTrack({ commit, state }, trackId) {
            try {
                await TrackApi.delete(trackId)
                commit("setTracks", state.tracks.filter(t => t.id !== trackId))
            } catch (e) {
                console.log(e)
                return e
            }
        },
    },
    namespaced: true,
};
