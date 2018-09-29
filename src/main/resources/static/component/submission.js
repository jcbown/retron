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
                        <input ref="cardEditInput" v-if="isEditing(card)" @keyup.enter="saveCard(card, $event)" @blur="saveCard(card, $event)"
                               placeholder="Enter some text" type="text" :value="card.text" size="30">
                        <span v-else>{{card.text}}</span>
                        <span class="float-right" width="20rem">
                            <a href="javascript:void(0)" @click="editCard(card)">
                                <span class="oi oi-pencil" title="Edit Card" aria-hidden="true"></span>
                            </a>
                            <a href="javascript:void(0)" @click="deleteCard(card)">
                                <span class="oi oi-trash" title="Delete Card" aria-hidden="true"></span>
                            </a>
                        </span>
                        
                    </div>
                </div>
                <button type="button" class="btn addCardBtn"
                        data-toggle="tooltip" data-placement="right"
                        :class="cardButtonClasses"
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
        this.$stompClient.subscribe("/user/topic/card/delete", this.onCardDeleted);
    },
    mounted: function() {
        $('.addCardBtn').tooltip({
            title: this.cardButtonTooltip
        });
    },
    updated: function() {
        $('.addCardBtn').tooltip('dispose');
        $('.addCardBtn').tooltip({
            title: this.cardButtonTooltip
        });

        // ensure input is focussed if present
        if (this.$refs.cardEditInput) {
            this.$refs.cardEditInput.forEach(el => el.focus());
        }
    },
    computed: {
        cardsNormal: function() { return this.cards.length < 5; },
        cardsWarning: function() { return this.cards.length >=5 && this.cards.length < 7; },
        cardsError: function() { return this.cards.length >=7; },
        cardButtonClasses: function () {
            return {
                'btn-primary': this.cardsNormal,
                'btn-warning': this.cardsWarning,
                'btn-danger': this.cardsError
            }
        },
        cardButtonTooltip: function() {
            if (this.cardsWarning) {
                return "That's probably enough.";
            } else if (this.cardsError) {
                return "We don't want to be here all day. Consider deleting some cards.";
            } else {
                return null;
            }
        }
    },
    methods: {
        createCard: function(cardType) {
            let uuid = Utils.guid();
            let card = {
                uuid: uuid,
                cardType: cardType,
                text: ""
            };
            this.$stompClient.send("/app/card/create", {}, JSON.stringify(card));
            this.editCard(card);
        },
        editCard: function(card) {
            this.uuidCurrentlyEditing = card.uuid;
        },
        deleteCard: function(card) {
            this.$stompClient.send("/app/card/delete", {}, JSON.stringify(card));
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
        onCardDeleted: function(msg) {
            let card = JSON.parse(msg.body);
            _.remove(this.cards, c => c.uuid === card.uuid);
            this.cards = [...this.cards]; // since vue doesn't play nice with lodash
        },
        getCards: function (columnName) {
            return this.cards.filter(c => c.cardType === columnName);
        }
    }
}