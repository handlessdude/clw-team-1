import store from '@/store/store'
import BasicRequester from '@/api/BasicRequester'

class SearchError extends Error {
    constructor(message) {
        super(message)
        this.name = "SearchError"
    }
}
export default class searchApi {

    static async getReq(actualUrl) {
        console.log(actualUrl);
        const url = `${actualUrl}`
        return await BasicRequester.basicRequest(BasicRequester.GET_METHOD, url)
            .catch(({message}) => {
                throw new SearchError(`Track get error: ${message}`)
            })
    }
    /*why is that Egor??*/
    static async postReq(url, data) {
        return await BasicRequester.basicRequest(BasicRequester.POST_METHOD, url, data)
                    .catch(({message}) => {
                        throw new SearchError(`Track post error: ${message}`)
                    })
    }
    static async delete(url, data) {
        return await BasicRequester.basicRequest(BasicRequester.DELETE_METHOD, url, data)
            .catch(({message}) => {
                throw new SearchError(`Track delete error: ${message}`)
            })
    }

    /**
     * entity = searched resource'
     * */
    static async search(entityType, searchQueryString) {
        const url = `${store.state.searchUrl}/${entityType}?q=${searchQueryString}`
        const encodedUrl = encodeURI(url)
        return await BasicRequester.basicRequest(BasicRequester.GET_METHOD, encodedUrl)
            .catch(({message}) => {
                throw new SearchError(`${entityType} search error: ${message}`)
            })
    }

}
