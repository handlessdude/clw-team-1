import axios from "axios";
import store from "../store";

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
            return state.tracks;
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
            state.isTrackListLoading = bool;
        },
        /*setSelectedSort(state, selectedSort) {
                state.selectedSort = selectedSort
            },
            setSearchQuery(state, searchQuery) {
                state.searchQuery = searchQuery
            },*/
    },
    actions: {
        async fetchTracks({
            /*state,*/
            commit,
        }) {
            try {
                commit("setIsTrackListLoading", true);
                const tracksAxios = axios.create({
                    baseURL: store.state.server,
                    headers: {
                        "X-API-Key": store.state.xApiKeyTeacher
                    }
                })
                const url = store.state.tracksUrl
                const config = {
                    headers: {
                        "accept": "application/json",
                    },
                }
                const response = await tracksAxios.get(url, config)
                commit("setTracks", response.data.data);
                console.log(response);
                return response
            } catch (e) {
                alert("Error has spawned!");
                console.log(e);
                return e
            } finally {
                commit("setIsTrackListLoading", false);
            }
        },
    },
    namespaced: true,
};