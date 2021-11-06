import store from '../store/store';
import axios from "axios";

export default class BasicRequester {

    static POST_METHOD = 'post'
    static PUT_METHOD = 'put'
    static GET_METHOD = 'get'
    static DELETE_METHOD = 'delete'

    static #HEADERS = {
        "accept": "application/json",
        "Content-Type": "application/json",
    }

    static #setUserToken(headers) {
        //TODO set actualuser.token
        headers['X-API-KEY'] = store.state.xApiKeyTeacher
    }

    static _formRequestConfig(method, url, data = {}) {
        this.#setUserToken(this.#HEADERS)
        return {
            method,
            url,
            data,
            params: method === this.GET_METHOD ? data : null,
            headers: this.#HEADERS,
            responseType: 'json',
        }
    }

    static async basicRequest(method, url, data = {}) {
        try {
            const response = await axios(this._formRequestConfig(method, url, data))
            console.log(response)
            return response
        } catch (e) {
            console.log(e)
            return e
        }
    }

}
