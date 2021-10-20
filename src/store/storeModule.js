const API = 'https://raw.githubusercontent.com/mucholocobbb/API-s/master/ForGeekBrains/vueCostsApi.json'
//import axios from 'axios';

const state = {
    operationList: [],
}

const getters = {
    getCostList: state => state.operationList,
}

const mutations = {
    setCostsArray(state, data) {
        Object.assign(state.operationList, data)
        state.operationList = [...state.operationList]
    },
}

const actions = {
    fetchCosts({
        commit
    }) {
        fetch(API)
           .then((response) => {
              return response.json();
          })
         .then((data) => {
            commit('setCostsArray', data)
        });


    },
}

export default {
    state,
    mutations,
    getters,
    actions
}
