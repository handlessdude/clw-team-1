import store from '../store/store'

export default async () => {
    const trackDetailsAxios = store.getters.serverAccess
    try {
        const url = store.state.tracksUrl
        const response = await trackDetailsAxios.get(url, store.state.configs.getConfig)
        console.log(response)
        return response
    } catch (e) {
        alert('Error has spawned!')
        console.log(e)
        return e
    }
}
