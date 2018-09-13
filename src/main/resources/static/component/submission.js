import * as Utils from "/utils.js"

export default {
    components: {},
    // language=HTML
    template: `
        <div class="row">
        <div v-for="cardType in cardTypes" class="col">
            <h3>{{cardType}}</h3>
            <div v-for="card in getCards(cardType)">
                {{card.text}}
            </div>
            <button type="button" class="btn btn-primary"
                    @click="addCard(cardType)">Add Card
            </button>
        </div>
        <!--<div>-->
            <!--<table class="table">-->
                <!--<thead>-->
                <!--<tr>-->
                    <!--<th>Good</th>-->
                    <!--<th>Bad</th>-->
                    <!--<th>Opportunity</th>-->
                    <!--<th>Risk</th>-->
                <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--<tr v-for="card in cardsGood()">-->
                    <!--<td>{{ card.text }}</td>-->
                    <!--<td>hmm</td>-->
                    <!--<td>hmm</td>-->
                    <!--<td>hmm</td>-->
                <!--</tr>-->
                <!--</tbody>-->
            <!--</table>-->
        <!--</div>-->
        </div>
    `,
    props: ["details"],
    data: function () {
        return {
            cards: [],
            cardTypes: []
        }
    },
    created: function () {
        this.cards = this.details.cards;
        this.cardTypes = this.$cardTypes;
        this.$stompClient.subscribe("/user/topic/card/create", this.onCardAdded);
    },
    methods: {
        addCard: function(cardType) {
            let card = {
                uuid: Utils.guid(),
                cardType: cardType,
                text: "this is the first card"
            };
            this.$stompClient.send("/app/card/create", {}, JSON.stringify(card));
        },
        onCardAdded: function(msg) {
            let card = JSON.parse(msg.body);
            this.cards.push(card);
        },
        getCards: function (columnName) {
            return this.cards.filter(c => c.cardType === columnName);
        }
    }
}