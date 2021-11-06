export const userinfoModule = {
    state: [
        {
            token: "4kcwkcksk0gwcs4kc0wo4gws0sgcswgcosc88ok4",
            user: [{
                id: "743441",
                login: "string",
                fullName: "Петр Петров",
                data: [{
                    firstName: "Петр",
                    lastName: "Иванович",
                    secondName: "Петров",
                    avatarUrl: "@/components/Images/AvatarTeacher.png",
                    department: "string",
                    company: "string",
                    status: 'Преподаватель',
                    percentProgress: 100,
                    allTracks: 30,
                    finTracks: 30,
                    setTracks: 0,
                }]
            }],
            roles: [
                "teacher"
            ],
            permissions: [{
                rsname: "string",
                scopes: [
                    "string"
                ]
            }]
        },
        {
            token: "s8oogko8cckkwcs4ksws088wsccggok0k08s4oog",
            user: [{
                id: "743436",
                login: "string",
                fullName: "Иван Иванов",
                data: [{
                    firstName: "Иван",
                    lastName: "Петрович",
                    secondName: "Иванов",
                    avatarUrl: "@/components/Images/Avatar.png",
                    department: "string",
                    company: "string",
                    status: 'Студент',
                    percentProgress: 39,
                    allTracks: 30,
                    finTracks: 15,
                    setTracks: 5,
                }]
            }],
            roles: [
                "student"
            ],
            permissions: [{
                rsname: "string",
                scopes: [
                    "string"
                ]
            }]
        }


    ],
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    namespaced: true
}