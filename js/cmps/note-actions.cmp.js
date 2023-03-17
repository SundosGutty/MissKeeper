import { utilService } from '../services/utils.js'

export default {
    name: 'action-btns',
    props: ['note'],
    template: `
        <div class="note-actions flex align-center self-end"> 
        <i class="fas fa-map-pin" @click="pin"></i>
        <i class="fas fa-copy" @click="clone" v-if="!note.isPinned"></i> 
        <i class="fas fa-trash-alt" @click="openDeleteModal"></i>
        <i class="fas fa-pen" @click="openColorModel('font')"></i>
        <i class="fas fa-font"><select  id="color-picker-wrapper"  @input="fontStyle($event)">
        <option>Georgia</option>
        <option>Times New Roman</option>
        <option>Verdana</option>
        </select></i>
         <i class="fas fa-palette" @click="openColorModel('bcg')"></i>
         <div class="color-container" v-if="isColorPalette">
        <div class="color" v-for="color in colors" :key="color" :class="color" @click="changeColor(color)"></div>
         </div>
        </div>
    </div>
 `,
    data() {
        return {
            colors: '',
            isColorPalette: false,
            type: ''
        }
    },
    created() {
        this.colors = utilService.getColors()
    },
    methods: {
        openDeleteModal() {
            this.$emit('openDeleteModal')
        },
        openColorModel(type) {
            this.type = type
            this.isColorPalette = !this.isColorPalette
        },
        pin() {
            this.$emit('pin-note')
        },
        clone() {
            this.$emit('clone-note')
        },
        changeColor(color) {
            this.$emit('update-color', color, this.type)
            this.isColorPalette = !this.isColorPalette
        },
        fontStyle(ev) {
            const font = ev.target.value
            this.$emit('txt-font', font)
        },
    },
}