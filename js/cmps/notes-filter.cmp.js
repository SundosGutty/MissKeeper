export default {
    template: `
    <section class="filter-notes flex justify-center align-center">
    <fieldset class="filted-area flex">
        <legend>Your search area:</legend>
        <input type="text" v-model="searchKeyword" placeholder="Search by title" @input="searchByKeyword"/>
    <select class="select" @change="setFilter" v-model="filterType" v-if="options" >
     <option v-for="option in options" :value="option.value">{{option.txt}}</option>
    </select>
    </fieldset>
    </section>
    `,
    data() {
        return {
            filterType: '',
            options: [{ value: "", txt: "All" }, { value: "note-txt", txt: "Text Notes" }, { value: "note-img", txt: "Image Notes" }, { value: "note-video", txt: "Video Notes" }, { value: "note-map", txt: "Map Notes" }, { value: "note-todos", txt: "List Notes" }],
            searchKeyword: '',
        }
    },
    methods: {
        setFilter() {
            this.$emit('set-filter', this.filterType)

        },
        searchByKeyword() {
            this.$emit('set-search', this.searchKeyword)
        }
    }
}