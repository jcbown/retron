import Card from "./card.js"

export default {
    components: {
        Card
    },
    // language=HTML
    template: `
        <div class="row">
            <div class="col">
                <div v-for="theme in themes">
                    <card v-for="card in theme.cards" :key="card.id" :card="card"/>
                </div>
            </div>
        </div>
    `,
    props: ["details"],
    data: function () {
        return {
            themes: []
        }
    },
    created: function() {
        this.themes = this.details.themes;
    },
    methods: {
        func: function() {

        }
    }
}