import store from '../store/store'
import BasicRequester from '@/api/BasicRequester'

class TrackOperationError extends Error {
    constructor(message) {
        super(message)
        this.name = "TrackOperationError"
    }
}

export default class TrackApi {

    static #ensureTrackData(trackData) {
        return {
            name: trackData.name,
            previewText: trackData.previewText ?? "",
            previewPicture: trackData.previewPicture ?? "",
            published: trackData.published,
            dateTimeStart: trackData.dateTimeStart ?? 0,
            dateTimeFinish: trackData.dateTimeFinish ?? 0,
            mode: trackData.mode
        }
    }

    static async post(trackData) {
        const url = store.state.trackUrl
        return await BasicRequester.basicRequest(BasicRequester.POST_METHOD, url, this.#ensureTrackData(trackData))
                    .catch(({message}) => {
                        throw new TrackOperationError(`Track post error: ${message}`)
                    })
    }

    static async get(trackId) {
        const url = `${store.state.trackUrl}/${trackId}`
        return await BasicRequester.basicRequest(BasicRequester.GET_METHOD, url)
            .catch(({message}) => {
                throw new TrackOperationError(`Track get error: ${message}`)
            })
    }

    static async put(trackId, trackData) {
        const url = `${store.state.trackUrl}/${trackId}`
        return await BasicRequester.basicRequest(BasicRequester.PUT_METHOD, url, this.#ensureTrackData(trackData))
            .catch(({message}) => {
                throw new TrackOperationError(`Track put error: ${message}`)
            })
    }

    static async delete(trackId) {
        const url = `${store.state.trackUrl}/${trackId}`
        return await BasicRequester.basicRequest(BasicRequester.DELETE_METHOD, url)
            .catch(({message}) => {
                throw new TrackOperationError(`Track delete error: ${message}`)
            })
    }

}
