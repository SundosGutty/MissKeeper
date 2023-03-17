export const eventBus = new Vue()

export const EVENT_MSG = 'msg'
export const EVENT_SHOW_MSG = 'showMsg'

eventBus.$on(EVENT_MSG, (msg)=>{
    var msg = msg
    eventBus.$emit(EVENT_SHOW_MSG, msg)
})