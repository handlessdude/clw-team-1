import store from '../store/store'

export default async () => {
    const tracksAxios = store.getters.serverAccess
    try {
        const url = store.state.tracksUrl
        const response = await tracksAxios.get(url, store.state.configs.getConfig)
        console.log(response)
        return response
    } catch (e) {
        alert('Error has spawned!')
        console.log(e)
        return e
    }
}
