import Card from "./card.js"

export default {
    components: {
        Card
    },
    // language=HTML
    template: `
        <div>
            <div class="theme">
                <card v-for="card in theme.cards" :key="card.id" :card="card"/>
                <span class="votePane">
                    <span v-for="i in theme.votesCast" class="vote pl-1">
                        <span class="badge badge-pill badge-success">&nbsp;</span>
                    </span>    
                </span>
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