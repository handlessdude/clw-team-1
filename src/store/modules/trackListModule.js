const API = 'https://raw.githubusercontent.com/mucholocobbb/API-s/master/ForGeekBrains/vueCostsApi.json'

const state = {
    trackList: []
}

const getters = {
    GET_TRACK_LIST: state => state.trackList,
}

const mutations = {
    SET_TRACK_LIST(state, data) {
        Object.assign(state.trackList, data)
        state.trackList = [...state.trackList]
    },
}

const actions = {
    fetchTrackList({
                   commit
               }) {
        fetch(API)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                commit('SET_TRACK_LIST', data)
            });
    },
}

export default {
    state,
    mutations,
    getters,
    actions
}
