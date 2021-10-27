import axios from 'axios'
import store from '../store/store';

export default class TrackDetailApi {

    static trackDetailAxios = axios.create({
        baseURL: store.state.server,
        headers: {
            "X-API-Key": store.state.xApiKeyTeacher
        }
    })

    static async post(trackId, trackDetailData) {
        try {
            const url = `${store.state.trackUrl}/${trackId}/detail`
            const config = {
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                },
            }
            const response = await this.trackDetailAxios.post(url, trackDetailData, config)
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
            const config = {
                headers: {
                    "accept": "application/json",
                },
            }
            const response = await this.trackDetailAxios.get(url, config)
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
            const config = {
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                },
            }
            const response = await this.trackDetailAxios.put(url, trackDetailData, config)
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
            const config = {
                headers: {
                    "accept": "*/*",
                },
            }
            const response = await this.trackDetailAxios.delete(url, config)
            console.log(response)
            return response
        } catch (e) {
            alert('Error has spawned!')
            console.log(e)
            return e
        }
    }

}
