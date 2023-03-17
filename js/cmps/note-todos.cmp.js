import noteActions from './note-actions.cmp.js'


export default {
    props: ['note'],
    name: 'note-todos',
    template: `
       <div class="note-preview" :style="{ color: txtColor, backgroundColor: bcgColor, 'font-family': txtFont  }" >
       <note-actions :note="note" @openDeleteModal="openDeleteModal" @update-color="updateColor" @txt-font="changeTxtFont" @pin-note="pinNote"   @clone-note="cloneNote"/>
           <h5 :style="{color: txtColor, 'font-family': txtFont}">{{note.info.titleTxt}}</h5>
           <ul>
        <li @click.stop="markTodo(todo)" :class="{'mark-line': todo.isDone}" v-for="(todo, idx) in note.info.todos">{{todo.todo}} 
        <a  class="fas fa-eraser" @click.stop="removeTodo"></a>
        </li>
       </ul>
   </div>
 `,
    data() {
        return {
            isDone: false,
            txtColor: this.note.style.txtColor,
            txtFont: this.note.style.txtFont,
            bcgColor: this.note.style.bcgColor
        }
    },
    methods: {
        removeTodo(idx) {
            this.note.info.todos.splice(idx, 1)
            this.$emit('update-note', this.note)
        },
        openDeleteModal() {
            this.$emit('openDeleteModal', this.note)
        },
        markTodo(todo) {
            todo.isDone = !todo.isDone
            this.$emit('update-note', this.note)
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
            this.$emit('update-note', this.note)
        },
        update() {
            this.txtColor = this.note.style.txtColor
            this.bcgColor = this.note.style.bcgColor
            this.txtFont = this.note.style.txtFont

        },
        focusNote(note) {
            if (this.note.isOpen) {
                console.log(note)
            }
        },
        pinNote() {
            this.$emit('pin-note', this.note)
        },
        cloneNote() {
            this.$emit('clone-note', this.note)
        }
    },
    components: {
        noteActions,
    },

}