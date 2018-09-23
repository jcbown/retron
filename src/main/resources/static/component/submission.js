import * as Utils from "/utils.js"

export default {
    components: {},
    // language=HTML
    template: `
        <div class="row">
            <div v-for="cardType in cardTypes" class="col">
                <h3>{{cardType}}</h3>
                <div v-for="card in getCards(cardType)" class="card mb-2" @dblclick="editCard(card)">
                    <div class="card-body">
                        <input v-if="isEditing(card)" @keyup.enter="saveCard(card, $event)" @blur="saveCard(card, $event)" type="text" :value="card.text" size="30">
                        <span v-else>{{card.text}}</span>
                        <span class="float-right" width="20rem">
                            <a href="javascript:void(0)" class="badge badge-primary">{{card.owner}}</a>
                        </span>
                    </div>
                </div>
                <button type="button" class="btn"
                        :class="addCardButtonClasses"
                        @click="createCard(cardType)">Add Card
                </button>
            </div>
        </div>
    `,
    props: ["details"],
    data: function () {
        return {
            cards: [],
            cardTypes: [],
            uuidCurrentlyEditing: null
        }
    },
    created: function () {
        this.cards = this.details.cards;
        this.cardTypes = this.$cardTypes;
        this.$stompClient.subscribe("/user/topic/card/create", this.onCardCreated);
    },
    computed: {
        addCardButtonClasses: function () {
            return {
                'btn-primary': this.cards.length < 5,
                'btn-warning': this.cards.length >=5 && this.cards.length < 7,
                'btn-danger': this.cards.length >=7
            }
        }
    },
    methods: {
        createCard: function(cardType) {
            let uuid = Utils.guid();
            let card = {
                uuid: uuid,
                cardType: cardType,
                text: "enter some text"
            };
            this.$stompClient.send("/app/card/create", {}, JSON.stringify(card));
            this.editCard(card);
        },
        editCard: function(card) {
            this.uuidCurrentlyEditing = card.uuid;
        },
        saveCard: function(card, e) {
            let text = $(e.currentTarget).val();
            card.text = text;
            this.uuidCurrentlyEditing = null;
            this.$stompClient.send("/app/card/update", {}, JSON.stringify(card));
            this.uuidCurrentlyEditing = null;
        },
        isEditing: function(card) {
            return this.uuidCurrentlyEditing === card.uuid;
        },
        onCardCreated: function(msg) {
            let card = JSON.parse(msg.body);
            this.cards.push(card);
        },
        getCards: function (columnName) {
            return this.cards.filter(c => c.cardType === columnName);
        }
    }
}