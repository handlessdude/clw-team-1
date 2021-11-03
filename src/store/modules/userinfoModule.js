export const userinfoModule = {
    state: {
        student: {
            userName: 'Иван Иванов',
            status: 'Студент',
            percentProgress: 39,
            avatar: '@/components/Images/Avatar.png',
            allTracks: 30,
            finTracks: 15,
            setTracks: 5,

        },
        teacher: {
            userName: 'Петр Петров',
            status: 'Преподаватель',
            percentProgress: 100,
            avatar: 'AvatarTeacher.png',
            allTracks: 30,
            finTracks: 30,
            setTracks: 0,

        }
    },
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    namespaced: true
}