import { notesService } from '../services/keep-service.js';
import notesList from '../cmps/notes-list.cmp.js'
import filterNotes from '../cmps/notes-filter.cmp.js';
import { eventBus } from '../services/event-bus-service.js'
import noteAdd from '../cmps/note-add.cmp.js'
import { deleteModal } from '../general-cmps/delete-modal.cmp.js'


export default {
    name: 'notes-app',
    template: `
    <section class="note-app">
    <note-add @add-note="addNote"></note-add>

    <!-- filter -->
    <filter-notes  
    @set-filter="setFilter" 
    @set-search="setSearch"/>

    <!-- delete-modal -->
    <delete-modal v-if="isShown" 
    @approveRemove="approveRemove"/>

    <!-- list -->
    <notes-list  
    @openDeleteModal="openDeleteModal"
    @clone-note="cloneNote" 
    @pin-note="pinNote" 
    @updateNote="updateNote"
    :notes="notesToShow" 
    :pinnedNotes="pinnedNotesToShow"/>


</section>
    `,
    data() {
        return {
            notes: [],
            noteToEdit: null,
            pinnedNotes: [],
            filterBy: null,
            searchBy: '',
            isShown: false,
            currNote: null,

        }
    },
    created() {
        this.loadNotes()
        this.loadPinnedNotes()
    },

    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        setSearch(searchBy) {
            this.searchBy = searchBy
        },
        loadNotes() {
            notesService.query()
                .then(notes => {
                    return this.notes = notes
                })
        },
        loadPinnedNotes() {
            notesService.getPinnedNotes()
                .then(pinnedNotes => {
                    return this.pinnedNotes = pinnedNotes
                })
        },
        addNote(note) {
            notesService.addNote(note)
                .then(this.loadNotes())
                .then(() => { const msg = { content: `a`, type: 'success' }; eventBus.$emit('showMsg', msg); })
                .catch(err => { const msg = { content: `err`, type: 'error' }; eventBus.$emit('showMsg', msg); });
        },
        openDeleteModal(note) {
            this.isShown = !this.isShown
            this.currNote = note
        },
        approveRemove(status) {
            if (status) {
                this.isShown = !this.isShown
                if (this.currNote.isPinned) { notesService.removePinnedNote(this.currNote).then(() => this.loadPinnedNotes()) }
                else { notesService.remove(this.currNote).then(() => this.loadNotes()) }
            } else this.isShown = false
        },
        pinNote(note) {
            this.currNote = note
            if (note.isPinned) this.unpinNote(note)
            else {
                note.isPinned = true
                notesService.pinnNote(note)
                    .then(() => this.loadNotes())
                    .then(() => this.loadPinnedNotes())
                    .then(() => { const msg = { content: `p`, type: 'success' }; eventBus.$emit('showMsg', msg); })
                    .catch(err => { const msg = { content: `err`, type: 'error' }; eventBus.$emit('showMsg', msg); });

            }
        },
        unpinNote(note) {
            note.isPinned = false
            this.currNote = note
            notesService.unpinnNote(note)
                .then(() => this.loadPinnedNotes())
                .then(() => this.loadNotes())
                .then(() => { const msg = { content: `un`, type: 'success' }; eventBus.$emit('showMsg', msg); })
                .catch(err => { const msg = { content: `err`, type: 'error' }; eventBus.$emit('showMsg', msg); });
        },
        updateNote(note) {
            // this.currNote = note
            notesService.updateNote(note)
                .then(() => this.loadNotes())
                .then(() => this.loadPinnedNotes())
        },
        cloneNote(note) {
            notesService.cloneNote(note)
                .then(() => this.loadNotes())
                .then(() => { const msg = { content: `c`, type: 'success' }; eventBus.$emit('showMsg', msg); })
                .catch(err => { const msg = { content: `err`, type: 'error' }; eventBus.$emit('showMsg', msg); });
        },
    },
    computed: {
        notesToShow() {
            if (!this.filterBy && !this.searchBy) return this.notes
            let notesToShow = this.notes
            if (this.searchBy) {
                notesToShow = notesToShow.filter(note => note.info.titleTxt.toLowerCase().includes(this.searchBy.toLowerCase()))
            }
            if (this.filterBy === 'All') return notesToShow.filter(note => note.type === this.filterBy)
            if (this.filterBy) return notesToShow.filter(note => note.type === this.filterBy)
            return notesToShow
        },
        pinnedNotesToShow() {
            if (!this.pinnedNotes || !this.pinnedNotes.length) return
            if (!this.filterBy && !this.searchBy) return this.pinnedNotes
            let pinnedNotesToShow = this.pinnedNotes
            if (this.searchBy) {
                pinnedNotesToShow = pinnedNotesToShow.filter(note => note.info.titleTxt.toLowerCase().includes(this.searchBy.toLowerCase()))
            }
            if (this.filterBy === 'All') return pinnedNotesToShow.filter(note => note.type === this.filterBy)
            if (this.filterBy) return pinnedNotesToShow.filter(note => note.type === this.filterBy)
            return pinnedNotesToShow
        }
    },

    components: {
        notesList,
        filterNotes,
        noteAdd,
        deleteModal,
    }

}
