import noteActions from './note-actions.cmp.js'

export default {
    props: ['note'],
    name: 'note-map',
    template: `
    <div class="note-preview" :style="{ color: txtColor, backgroundColor: bcgColor, 'font-family': txtFont  }" >
       <note-actions :note="note" @update-color="updateColor" @txt-font="changeTxtFont" @openDeleteModal="openDeleteModal" @pin-note="pinNote"  @clone-note="cloneNote"/>
           <h5 :style="{ color: txtColor}">{{note.info.titleTxt}}</h5>
           <iframe width="100%" height="200px" ref="map" :src="src"></iframe>
   </div>
 `,
    data() {
        return {
            txtColor: this.note.style.txtColor,
            txtFont: this.note.style.txtFont,
            bcgColor: this.note.style.bcgColor,
            API_KEY: "AIzaSyBt1Hk9ABAS1VJuCb5MmbqqWZs-15yoLHc"
        }
    },
    methods: {
        removeTodo(idx) {
            this.note.info.todos.splice(idx, 1)
        },
        markTodo(todo) {
            todo.isDone = !todo.isDone
        },
        updateColor(color, type) {
            if (type === 'font') this.note.style.txtColor = color
            else this.note.style.bcgColor = color
            this.update()
            this.$emit('update-note', this.note)
        },
        changeTxtFont(font) {
            this.note.style.txtFont = font
            this.update()
            this.$emit('update-note', font, this.note)
        },
        update() {
            this.txtColor = this.note.style.txtColor
            this.bcgColor = this.note.style.bcgColor
            this.txtFont = this.note.style.txtFont
        },
        pinNote() {
            this.$emit('pin-note', this.note)
        },
        cloneNote() {
            this.$emit('clone-note', this.note)
        },
        openDeleteModal() {
            this.$emit('openDeleteModal', this.note)
        },
    },
    computed: {
        src() {
            return ('https://www.google.com/maps/embed/v1/place?q=' + this.note.info.location + `&key=${this.API_KEY}`)
            // window.location.replace(src);
        }
    },
    components: {
        noteActions,
    },

}