export default {
    components: {},
    // language=HTML
    template: `
        <div class="row">
            <div v-for="cardType in cardTypes" class="col">
                <h3>{{cardType}}</h3>
                <div v-for="card in getCards(cardType)" class="card mb-2" :class="{highlightedCard : shouldHighlight(card)}">
                    <div class="card-body">
                        <span>{{card.text}}</span>
                        <span class="float-right" width="20rem">
                            <a href="javascript:void(0)" class="badge badge-primary">{{card.owner}}</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: ["details"],
    data: function () {
        return {
            cardsByOwner: [],
            currentOwner: 0,
            cardTypes: []
        }
    },
    created: function () {
        this.cardsByOwner = this.details.cardsByOwner;
        this.currentOwner = this.details.currentOwner;
        this.cardTypes = this.$cardTypes;
    },
    methods: {
        getCards: function(cardType) {
            return this.cardsByOwner[this.currentOwner].cards;
        },
        shouldHighlight: function (card) {
            return true;
        }
    }
}