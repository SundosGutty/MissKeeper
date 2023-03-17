import { asyncStorageService } from './async-storage-service.js'
import { utilService } from './utils.js';


export const notesService = {
    query,
    save,
    remove,
    getById,
    updateNote,
    addNote,
    getPinnedNotes,
    addPinnedNote,
    removePinnedNote,
    cloneNote,
    pinnNote,
    unpinnNote
}

const NOTES_KEY = 'NOTES'
const PINNED_KEY = 'PINNED_NOTES'

var gNotes = _createNotes()
var gPinnedNotes = _createPinnedNotes()

function _createPinnedNotes() {
    var pinnedNotes = utilService.loadFromStorage(PINNED_KEY)
    if (!pinnedNotes || !pinnedNotes.length) {
        pinnedNotes = []
        utilService.saveToStorage(PINNED_KEY, pinnedNotes);
    }
    return pinnedNotes
}

function _createNotes() {
    var notes = utilService.loadFromStorage(NOTES_KEY)

    if (!notes || !notes.length) {
        notes = [
            _createNote('note-todos', { titleTxt: 'My list', todos: [{ todo: 'Do not cry when console log prints undefined', isDone: false }, { todo: 'Do not cry when you fix a bug but then 10000 more appear', isDone: false }, { todo: 'Do not cry when it is ten minutes to submission and your project is far from being done', isDone: false }] }, '#e6e6fa'),
            _createNote('note-txt', { titleTxt: 'My first note', bodyTxt: 'Things aren’t always #000000 and #FFFFFF.' }, '#fafad2'),
            _createNote('note-img', { titleTxt: 'Img Note', url: 'https://addons-media.operacdn.com/media/CACHE/images/themes/45/123745/1.0-rev1/images/d43cd5fe-8407-46bb-858f-54d825dead48/c31dc78b6602cb4bf0a8d2b93385e5a2.jpg' }, '#b0c4de'),
            _createNote('note-todos', { titleTxt: 'My list', todos: [{ todo: 'Wake up early(never happens)', isDone: false }, { todo: 'Laugh more (at yourself mostly, not at others!)', isDone: false }, { todo: 'Eat healthy (we all know that this will not happen)', isDone: false }] }, '#ffa07a'),
            _createNote('note-video', { titleTxt: 'Video Note', url: 'https://www.youtube.com/embed/FjHGZj2IjBk' }, '#20b2aa'),
            _createNote('note-txt', { titleTxt: 'My first note', bodyTxt: '“Software Developer” – An organism that turns caffeine into software.' }, '#ffb6b6'),
            _createNote('note-video', { titleTxt: 'Video Note', url: 'https://www.youtube.com/embed/FjHGZj2IjBk' }, '#87cefa'),
            _createNote('note-todos', { titleTxt: 'My list', todos: [{ todo: 'Buy tickets to Bali', isDone: false }, { todo: 'Get a day off!', isDone: false }, { todo: 'Read a book', isDone: false }] }, '#cff1ef'),
            _createNote('note-img', { titleTxt: 'Img Note', url: 'https://addons-media.operacdn.com/media/CACHE/images/themes/45/123745/1.0-rev1/images/d43cd5fe-8407-46bb-858f-54d825dead48/c31dc78b6602cb4bf0a8d2b93385e5a2.jpg' }, '#e7d39f'),
            _createNote('note-txt', { titleTxt: 'My first note', bodyTxt: 'Learn Vue they said, it will be fun they said.' }, '#20b2aa'),
            _createNote('note-video', { titleTxt: 'Video Note', url: 'https://www.youtube.com/embed/FjHGZj2IjBk' }, '#fafad2'),
            _createNote('note-txt', { titleTxt: 'My first note', bodyTxt: 'One man’s crappy software is another man’s full time job.' }, '#ffb6b6'),
            _createNote('note-img', { titleTxt: 'Img Note', url: 'https://addons-media.operacdn.com/media/CACHE/images/themes/45/123745/1.0-rev1/images/d43cd5fe-8407-46bb-858f-54d825dead48/c31dc78b6602cb4bf0a8d2b93385e5a2.jpg' }, '#87cefa'),
            _createNote('note-todos', { titleTxt: 'My list', todos: [{ todo: 'learn Javascript', isDone: false }, { todo: 'do some css changes in my app', isDone: false }, { todo: 'learn vue and write a lot of cool components!!!', isDone: false }] }, '#a0ffe6'),
            _createNote('note-video', { titleTxt: 'Video Note', url: 'https://www.youtube.com/embed/FjHGZj2IjBk' }, '#a0ffe6'),
            _createNote('note-map', { titleTxt: 'Map Note', location: 'tel aviv' }, '#c2b0c9'),
            _createNote('note-video', { titleTxt: 'Video Note', url: 'https://www.youtube.com/embed/FjHGZj2IjBk' }, '#e6e6fa'),
        ];
        utilService.saveToStorage(NOTES_KEY, notes);
    }
    return notes
}

function _createNote(type, info, bcgColor = 'rgb(212, 209, 209)') {
    return {
        id: utilService.makeId(),
        type: type,
        isPinned: false,
        isMarked: false,
        isOpen: false,
        createdTime: Date.now(),
        style: {
            txtColor: '#000',
            bcgColor,
            txtFont: 'Arial, Helvetica, sans-serif',
        },
        info: info,
    }
}


function addNote(note) {
    var newNote = _createNote(note.type, note.info)
    gNotes.unshift(newNote)
    localStorage[NOTES_KEY] = JSON.stringify(gNotes);
    return Promise.resolve('add')
}

function addPinnedNote(note) {
    gPinnedNotes.unshift(note)
    savePinnedNote(note)
}


function pinnNote(note) {
    remove(note)
    addPinnedNote(note)
    return Promise.resolve('add')
}

function unpinnNote(note) {
    save(note)
    removePinnedNote(note)
    return Promise.resolve('add')
}

function cloneNote(note) {
    let noteCopy = { ...note }
    noteCopy.id = ''
    console.log(noteCopy)
    if (!note.isPinned) {
        let idx = gNotes.findIndex(n => n.id === note.id)
        gNotes.splice(idx + 1, 0, noteCopy)
        save(noteCopy)
    } else {
        let idx = gPinnedNotes.findIndex(n => n.id === note.id)
        gPinnedNotes.splice(idx + 1, 0, noteCopy)
        savePinnedNote(noteCopy)
    }
    return Promise.resolve('add')
}

function removePinnedNote(note) {
    return asyncStorageService.remove(PINNED_KEY, note.id);
}

function query() {
    return asyncStorageService.query(NOTES_KEY)
}


function getPinnedNotes() {
    return asyncStorageService.query(PINNED_KEY)
}

function remove(note) {
    return asyncStorageService.remove(NOTES_KEY, note.id);
}

function updateNote(note) {
    if (note.isPinned) {
        return asyncStorageService.put(PINNED_KEY, note);
    }
    return asyncStorageService.put(NOTES_KEY, note);
}

function save(note) {
    return asyncStorageService.post(NOTES_KEY, note);
}

function savePinnedNote(note) {
    return asyncStorageService.post(PINNED_KEY, note);
}


function getById(noteId) {
    return asyncStorageService.get(NOTES_KEY, noteId)
}
