import store from '../store/store';
import BasicRequester from '@/api/BasicRequester'

class TrackDetailOperationError extends Error {
    constructor(message) {
        super(message)
        this.name = "TrackDetailOperationError"
    }
}

export default class TrackDetailApi {

    static #ensureTrackDetailData(trackDetailData) {
        return {
            type: trackDetailData.type ?? "course",
            entityId: trackDetailData.entityId ?? 0,
            sortIndex: trackDetailData.sortIndex ?? 0,
            required: trackDetailData.required ?? true
        }
    }

    //static trackDetailAxios = store.getters.serverAccess
    /*static async post(trackId, trackDetailData) {
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
    }*/
    static async post(trackId, trackDetailData) {
        const url = `${store.state.trackUrl}/${trackId}/detail`
        return await BasicRequester.basicRequest(BasicRequester.POST_METHOD, url, this.#ensureTrackDetailData(trackDetailData))
            .catch(({message}) => {
                throw new TrackDetailOperationError(`TrackDetail post error: ${message}`)
            })
    }

    /*static async get(trackDetailId) {
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
    }*/
    static async get(trackDetailId) {
        const url = `${store.state.trackUrl}/detail/${trackDetailId}`
        return await BasicRequester.basicRequest(BasicRequester.GET_METHOD, url)
            .catch(({message}) => {
                throw new TrackDetailOperationError(`TrackDetail get error: ${message}`)
            })
    }

    /*static async put(trackDetailId, trackDetailData) {
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
    }*/

    static async put(trackDetailId, trackDetailData) {
        const url = `${store.state.trackUrl}/detail/${trackDetailId}`
        return await BasicRequester.basicRequest(BasicRequester.PUT_METHOD, url, this.#ensureTrackDetailData(trackDetailData))
            .catch(({message}) => {
                throw new TrackDetailOperationError(`TrackDetail put error: ${message}`)
            })
    }

    /*static async delete(trackDetailId) {
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
    }*/

    static async delete(trackDetailId) {
        const url = `${store.state.trackUrl}/detail/${trackDetailId}`
        return await BasicRequester.basicRequest(BasicRequester.DELETE_METHOD, url)
            .catch(({message}) => {
                throw new TrackDetailOperationError(`TrackDetail delete error: ${message}`)
            })
    }
}
