export const configModule = {
    state: () => ({
        postPutConfig: {
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
            },
        },
        postPreviewConfig: {
            headers: {
                "accept": "application/json",
                "Content-Type": "multipart/form-data",
            },
        },
        getConfig: {
            headers: {
                "accept": "application/json",
            },
        },
        deleteConfig: {
            headers: {
                "accept": "*/*"
            },
        }
    }),
    namespaced: true
}