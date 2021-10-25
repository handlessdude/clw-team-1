import axios from "axios"
/*import store from "../store"
import resolvePath from './auxiliary.js'*/

export const trackCatalogueModule = {
    state: () => ({
        title: 'track-catalogue',
        tracks:[],
        isTrackListLoading: false,
        /*selectedSort: '',
        searchQuery: '',
        sortOptions: [ //array of select-list items
            { value: 'id', name: 'По ID'},
            { value: 'data.name', name: 'По названию'}
        ],*/
    }),
    getters: {
        getTracks(state){
            return state.tracks
        }
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
        async fetchTracks({/*state,*/ commit}){
            try {
                commit('setIsTrackListLoading', true)
                const url = "https://tml6.rosatom.ru/api/tracks"
                    const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                axios.defaults.headers.common = {
                    //teacher's token
                    "X-API-Key": "4kcwkcksk0gwcs4kc0wo4gws0sgcswgcosc88ok4",
                };

                const response = await axios({
                    method: "get",
                    url: url,
                    data: {
                        message: "Some message to a lonely_server",
                    },
                    config,
                })
                commit('setTracks', response.data.data)
                console.log(response)
            } catch (e) {
                alert('Error has spawned!')
                console.log(e)
            } finally {
                commit('setIsTrackListLoading', false)
            }
        }
    },
    namespaced: true
}
