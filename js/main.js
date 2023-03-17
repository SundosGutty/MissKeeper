import mainHeader from './cmps/main-header.cmp.js'

import userMsg from './general-cmps/user-msg.cmp.js'
import { router } from './routes.js'


const options = {
    el: '#app',
    router,
    template: `
        <section class="main-section">
        <user-msg />
            <main-header />
            <router-view class="main-layout"/>
             </section>
    `,
    components: {
        mainHeader,
        userMsg,
    }
};

new Vue(options)