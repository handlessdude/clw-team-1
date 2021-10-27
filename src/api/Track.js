import axios from 'axios'
//import { store } from '../store/store'
import store from '../store/store';

export default class TrackApi {
    static async post(data) {
        try {
            const url = store.state.trackUrl
            //OR const url = store.getters.trackUrl

            console.log('POSTING NEW TRACK!')

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            axios.defaults.headers.common = {
                "X-API-Key": store.state.xApiKeyTeacher,
                //OR "X-API-Key": store.getters.xApiKeyTeacher,
            };

            const response = await axios({
                method: "post",
                url: url,
                data: data,
                config,
            })
            console.log(response)
        } catch (e) {
            alert('Error has spawned!')
            console.log(e)
        }
    }
    static async delete(data) {
        try {
            const url = `${store.state.trackUrl}/${data.id}`

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "accept": "*/*"
                },
            };

            axios.defaults.headers.common = {
                "X-API-Key": store.state.xApiKeyTeacher,
            };

            const response = await axios({
                method: "delete",
                url: url,
                config,
            })
            console.log(response)
        } catch (e) {
            alert('Error has spawned!')
            console.log(e)
        }
    }

}