import store from '../store/store';

export default class TrackDetailApi {

    static trackDetailAxios = store.getters.serverAccess

    static async post(trackId, trackDetailData) {
        try {
            const url = `${store.state.trackUrl}/${trackId}/detail`
            const response = await this.trackDetailAxios.post(url, trackDetailData, store.state.configs.postPutConfig)
            console.log(response)
            return response
        } catch (e) {
            alert('Error has spawned!')
            console.log(e)
            return e
        }
    }

    static async get(trackDetailId) {
        try {
            const url = `${store.state.trackUrl}/detail/${trackDetailId}`
            const response = await this.trackDetailAxios.get(url, store.state.configs.getConfig)
            console.log(response)
            return response
        } catch (e) {
            alert('Error has spawned!')
            console.log(e)
            return e
        }
    }

    static async put(trackDetailId, trackDetailData) {
        try {
            const url = `${store.state.trackUrl}/detail/${trackDetailId}`
            const response = await this.trackDetailAxios.put(url, trackDetailData, store.state.configs.postPutConfig)
            console.log(response)
            return response
        } catch (e) {
            alert('Error has spawned!')
            console.log(e)
            return e
        }
    }

    static async delete(trackDetailId) {
        try {
            const url = `${store.state.trackUrl}/detail/${trackDetailId}`
            const response = await this.trackDetailAxios.delete(url, store.state.configs.deleteConfig)
            console.log(response)
            return response
        } catch (e) {
            alert('Error has spawned!')
            console.log(e)
            return e
        }
    }

}
