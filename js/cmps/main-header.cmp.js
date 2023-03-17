export default {
    template: `
        <header class="flex align-center space-between column">
        <div class="logo-container flex column align-center justify-center">
         <h1>Miss Keeper</h1>
         <p class="sub-heading">You do you, and we will do the rest</p>
        </div>
        </header>
    `,
    data() {
        return {

        }
    },
    methods: {
        toggleMenu() {
            document.body.classList.toggle('menu-open')
        }

    }

}