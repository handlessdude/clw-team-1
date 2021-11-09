import BasicRequester from '@/api/BasicRequester'

class TrackOperationError extends Error {
    constructor(message) {
        super(message)
        this.name = "TrackOperationError"
    }
}
export default class searchApi {

    static async getReq(actualUrl) {
        console.log(actualUrl);
        const url = `${actualUrl}`
        return await BasicRequester.basicRequest(BasicRequester.GET_METHOD, url)
            .catch(({message}) => {
                throw new TrackOperationError(`Track get error: ${message}`)
            })
    }

    static async postReq(url, data) {
        return await BasicRequester.basicRequest(BasicRequester.POST_METHOD, url, data)
                    .catch(({message}) => {
                        throw new TrackOperationError(`Track post error: ${message}`)
                    })
    }
    static async delete(url, data) {
        return await BasicRequester.basicRequest(BasicRequester.DELETE_METHOD, url, data)
            .catch(({message}) => {
                throw new TrackOperationError(`Track delete error: ${message}`)
            })
    }


}
