import noteActions from './note-actions.cmp.js'


export default {
  props: ['note'],
  name: 'note-video',
  template: `
    <section class="note-preview" :style="{ color: txtColor, backgroundColor: bcgColor , 'font-family': txtFont }" >
    <note-actions :note="note"  @update-color="updateColor" @txt-font="changeTxtFont" @pin-note="pinNote"  @openDeleteModal="openDeleteModal"  @clone-note="cloneNote"/>
     <h5 :style="{color: txtColor, 'font-family': txtFont}">{{note.info.titleTxt}}</h5>
      <label>
    <iframe width="300" height="180" :src="note.info.url" title="YouTube video player" frameborder="0"></iframe>
    </label>         
</section>`,

  data() {
    return {
      txtColor: this.note.style.txtColor,
      txtFont: this.note.style.txtFont,
      bcgColor: this.note.style.bcgColor
    }
  },
  methods: {
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
    openDeleteModal() {
      this.$emit('openDeleteModal', this.note)
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