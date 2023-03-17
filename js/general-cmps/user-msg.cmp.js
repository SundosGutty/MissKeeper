import { eventBus } from '../services/event-bus-service.js'

export default {
    template: `
         <div v-if="msg" class="user-msg" :class="msg.type">
            <p>{{getUserMsg}}</p>
        </div>
    `,
    data() {
        return {
            msg: null
        };
    },
    created() {
        eventBus.$on('showMsg', this.showMsg);
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            console.log(this.msg)
            setTimeout(() => {
                this.msg = null;
            }, 3000);
        }
    },
    computed: {
        getUserMsg() {
            switch (this.msg.content) {
                case 'a':
                    return `The note was added successfully!`
                case 'c':
                    return `The note was duplicated successfully!`
                case 'p':
                    return `The note was pinned successfully!`
                case 'un':
                    return `The note was unpinned successfully!`
                case 'err':
                    return `'Error. Please try later`
            }
        }
    },
    destroyed() {
        eventBus.$off('showMsg', this.showMsg);
    }

};