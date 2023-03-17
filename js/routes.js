import notesApp from './pages/notes-app.cmp.js'


const routes = [
    {
        path: '/',
        component: notesApp,
        // children: [
        //     {
        //         path: 'edit',
        //         component: noteEdit,
        //     },
        // ],
    },
]
export const router = new VueRouter({ routes });