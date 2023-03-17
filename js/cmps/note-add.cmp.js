export default {
    name: 'noteAdd',
    template: `
    <section class="note-add flex align-center justify-center">
        <div class="input-container flex align-center justify-center">
            <input class="titleInput" @click="openInput($event)" type="text" placeholder="Enter title for the note" v-model="noteTitle"/>
            <input @click="openInput($event)" type="text" :placeholder="placeholderByType" v-model="noteBody"/>
        </div>
        <div class="control-area flex justify-center align-center">
        <fieldset class="flex align-center justify-center">
        <legend>Choose a note type:</legend>
            <i @click="setType('note-txt')"   title="Text note"><span class="fas fa-font fa-2x"></span></i>
            <i @click="setType('note-img')"  title="Image note"><span class="far fa-image fa-2x" ></span></i>
            <i @click="setType('note-video')" title="Video note"><span class="fab fa-youtube fa-2x"></span></i>
            <i @click="setType('note-map')"   title="Text note"><span class="fas fa-map-marked-alt fa-2x"></span></i>
            <i @click="setType('note-todos')"   title="List note"><span class="fas fa-list fa-2x"></span></i> 
        </fieldset>
         </div>   
        <div class="btn-add">
        <i @click="addNote" class="add-btn" title="Add note"><span  class="fas fa-plus fa-2x"></span></i>
       </div>
      
           
    </section>
    `,
    data() {
        return {
            noteType: 'note-txt',
            noteTitle: '',
            noteBody: '',
            note: { type: '', info: {} },
            isOn: false,
        }
    },
    created() {
        window.addEventListener('click', () => this.isOn = false)
    },
    methods: {
        setType(type) {
            event.stopPropagation()
            this.noteType = type
        },
        openInput(event) {
            event.stopPropagation()
            this.isOn = true
        },
        addNote() {
            if (!this.noteBody || !this.noteTitle) return

            this.note.type = this.noteType
            this.note.info.titleTxt = this.noteTitle

            if (this.note.type === 'note-txt') {
                this.note.info.bodyTxt = this.noteBody
            } else if (this.note.type === 'note-todos') {
                var todos = this.noteBody.split(',')
                todos = todos.map(todo => {
                    todo = { todo: todo.trim(), isDone: false }
                    return todo
                })
                console.log(todos)
                this.note.info.todos = todos
            } else if (this.note.type === 'note-map') {
                this.note.info.location = this.noteBody
            }
            else if (this.note.type === 'note-img' || 'note-video') {
                this.note.info.url = this.noteBody
            }
            this.$emit('add-note', this.note)
            this.noteTitle = ''
            this.noteBody = ''
            this.note = { type: '', info: {} }
        }
    },
    computed: {
        placeholderByType() {
            switch (this.noteType) {
                case 'note-txt':
                    return `What's on your mind...`
                case 'note-img':
                    return `Enter image URL...`
                case 'note-video':
                    return `Enter video URL...`
                case 'note-todos':
                    return `Enter comma separated list...`
                case 'note-map':
                    return `Enter location...`
            }
        }
    }

}