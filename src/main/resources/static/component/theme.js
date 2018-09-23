import Card from "./card.js"

export default {
    components: {
        Card
    },
    // language=HTML
    template: `
        <div>
            <div>
                <card v-for="card in theme.cards" :key="card.id" :card="card"/>
                <span v-for="i in theme.votesCast"><strong>+1</strong></span>
            </div>
        </div>
    `,
    props: ["theme"],
    data: function () {
        return {}
    },
    created: function () {

    },
    methods: {
        func: function () {

        }
    }
}