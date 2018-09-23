import Card from "./card.js"

export default {
    components: {
        Card
    },
    // language=HTML
    template: `
        <div>
            <div class="row">
                <div class="col">
                    <button @click="previousOwner" class="btn btn-secondary">Previous Team Member</button>
                    <button @click="nextOwner" class="btn btn-secondary">Next Team Member</button>
                    <button @click="nextPhase" class="btn btn-primary btn-sm">Next Phase</button>
                </div>
            </div>
            <div class="row" @keyup.37="previousOwner" @keyup.39="nextOwner">
                <div v-for="cardType in cardTypes" class="col">
                    <h3>{{cardType}}</h3>
                    <card v-for="card in getCards(cardType)" :key="card.id" :card="card"
                          :class="{highlightedCard : shouldHighlight(card)}"/>
                </div>
            </div>
        </div>
    `,
    props: ["cardsByOwner", "currentOwnerIndex"],
    data: function () {
        return {
            cardTypes: []
        }
    },
    created: function () {
        this.cardTypes = this.$cardTypes;
    },
    methods: {
        getCards: function (cardType) {
            let result = [];
            // cards we've already seen and the current ones
            for (let i = 0; i <= this.currentOwnerIndex; i++) {
                result = result.concat(this.cardsByOwner[i].cards.filter(c => c.cardType === cardType));
            }
            return result.reverse();
        },
        shouldHighlight: function (card) {
            return card.owner === this.cardsByOwner[this.currentOwnerIndex].owner;
        },
        previousOwner() {
            this.$stompClient.send("/app/discussion/previousOwner");
        },
        nextOwner() {
            this.$stompClient.send("/app/discussion/nextOwner");
        },
        nextPhase() {
            this.$stompClient.send("/app/advance-phase");
        }
    }
}