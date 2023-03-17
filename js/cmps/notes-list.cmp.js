
import noteImg from './notes.img.cmp.js'
import noteTxt from './note-txt.cmp.js'
import noteVideo from './note-video.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteMap from './note-map.cmp.js'

export default {
    name: 'notes-list',
    props: ['notes', 'pinnedNotes'],
    template: `
          <div class="flex column">
            <div class="pinned-noted-container">
                <h1 v-if="pinnedOn" class="title">Pinned Notes:</h1>
                <ul v-if="pinnedOn" class="notes flex flex-wrap align-center justify-center">
                <li class="note" v-for="note in pinnedNotes">
               <component :is="note.type" :note="note" @openDeleteModal="openDeleteModal"  @pin-note="pinNote" @clone-note="cloneNote" @update-note="updateNote">
                    </component>
                </li>
               </ul>
            </div>
         <div class="unpinned-noted-container">
             <h1 class="title">Notes:</h1>
            <ul class="notes flex flex-wrap align-center justify-center">
                <li class="note" v-for="note in notes">
                    <component :is="note.type" :note="note" @openDeleteModal="openDeleteModal" @pin-note="pinNote" @clone-note="cloneNote" @update-note="updateNote">
                    </component>
                </li>
               </ul>
          </div>
        </div> 
    `,
    data() {
        return {
            isPalleteShown: false,
        }
    },
    computed: {
        pinnedOn() {
            if (!this.pinnedNotes) return false
            else return true
        }
    },
    methods: {
        openDeleteModal(status, note) {
            this.$emit('openDeleteModal', status, note)
        },
        updateNote(note) {
            this.$emit('updateNote', note)
        },
        pinNote(note) {
            this.$emit('pin-note', note)
        },
        cloneNote(note) {
            this.$emit('clone-note', note)
        },
    },


    components: {
        noteTodos,
        noteVideo,
        noteTxt,
        noteImg,
        noteMap,
    }
}


