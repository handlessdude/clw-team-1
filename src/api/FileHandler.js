import store from '../store/store'
import BasicRequester from '@/api/BasicRequester'

class FileUploadError extends Error {
    constructor(message) {
        super(message)
        this.name = "FileUploadError"
    }
}

export default class FileHandler {

    static async postPreview(formData) {
        const url = `${store.state.trackUrl}/preview/`
        return await BasicRequester.basicRequest(BasicRequester.POST_METHOD, url, formData)
            .catch(({message}) => {
                throw new FileUploadError(`postPreview error: ${message}`)
            })
    }

}
