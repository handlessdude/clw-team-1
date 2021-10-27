import axios from 'axios'
import store from '../store/store';

export default class TrackApi {

    static trackAxios = axios.create({
        baseURL: store.state.server,
        headers: {
            "X-API-Key": store.state.xApiKeyTeacher
        }
    })

    static async post(data) {
        try {
            const url = store.state.trackUrl
            const config = {
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                },
            }
            const response = await this.trackAxios.post(url, data, config)
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
            const config = {
                headers: {
                    "accept": "application/json",
                    "Content-Type": "multipart/form-data",
                },
            }
            const response = await this.trackAxios.post(url, formData, config)
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
            const config = {
                headers: {
                    "accept": "*/*"
                },
            }
            const response = await this.trackAxios.delete(url, config)
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
            const config = {
                headers: {
                    "accept": "application/json",
                },
            }
            const response = await this.trackAxios.get(url, config)
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
            const config = {
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                },
            }
            const response = await this.trackAxios.put(url, data, config)
            console.log(response)
            return response
        } catch (e) {
            alert('Error has spawned!')
            console.log(e)
            return e
        }
    }
}
