import store from '../store/store'

export default async (trackId) => {
    const trackDetailsAxios = store.getters.serverAccess
    try {
        const url = `${store.state.trackUrl}/${trackId}/details`
        const response = await trackDetailsAxios.get(url, store.state.configs.getConfig)
        console.log(response)
        return response
    } catch (e) {
        alert('Error has spawned!')
        console.log(e)
        return e
    }
}
