import store from '../store/store';

export default class TrackApi {

    static trackAxios = store.getters.serverAccess

    static async post(data) {
        try {
            const url = store.state.trackUrl
            const response = await this.trackAxios.post(url, data, store.state.configs.postPutConfig)
            console.log(response)
            return response
        } catch (e) {
            alert('Error has spawned!')
            console.log(e)
            return e
        }
    }

    static async postPreview(formData) {
        /*TODO: make out how it should be used*/
        try {
            const url = `${store.state.trackUrl}/preview/`
            const response = await this.trackAxios.post(url, formData, store.state.configs.postPreviewConfig)
            console.log(response)
            return response
        } catch (e) {
            alert('Error has spawned!')
            console.log(e)
            return e
        }
    }

    static async get(data) {
        try {
            const url = `${store.state.trackUrl}/${data.id}`
            const response = await this.trackAxios.get(url, store.state.configs.getConfig)
            console.log(response)
            return response
        } catch (e) {
            alert('Error has spawned!')
            console.log(e)
            return e
        }
    }

    static async put(data) {
        try {
            const url = store.state.trackUrl
            const response = await this.trackAxios.put(url, data, store.state.configs.postPutConfig)
            console.log(response)
            return response
        } catch (e) {
            alert('Error has spawned!')
            console.log(e)
            return e
        }
    }

    static async delete(data) {
        try {
            const url = `${store.state.trackUrl}/${data.id}`
            const response = await this.trackAxios.delete(url, store.state.configs.deleteConfig)
            console.log(response)
            return response
        } catch (e) {
            alert('Error has spawned!')
            console.log(e)
            return e
        }
    }

}
