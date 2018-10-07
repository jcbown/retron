import * as Utils from "/utils.js"
import UserBadge from "./userBadge.js"

export default {
    components: {
        UserBadge
    },
    // language=HTML
    template: `
        <div>
            <div class="row">
                <div class="col">
                    <strong>Submitting Cards: </strong>
                    <userBadge v-for="user in users" :key="user.id" :fullName="user.fullName" :colour="user.colour" :done="user.ready"/>
                    <button :disabled="submitted" @click="sendReady" class="btn btn-primary float-right">Submit Cards</button>
                </div>
            </div>
            <div class="row">
                <div v-for="cardType in cardTypes" class="col">
                    <h3>{{cardType}}</h3>
                    <div v-for="card in getCards(cardType)" class="card mb-2" @dblclick="editCard(card)">
                        <div class="card-body">
                            <input ref="cardEditInput" v-if="isEditing(card)" @keyup.enter="saveCard(card, $event)" @blur="saveCard(card, $event)"
                                   placeholder="Enter some text" type="text" :value="card.text" size="30">
                            <span v-else>{{card.text}}</span>
                            <span class="float-right" width="20rem">
                                <button :disabled="submitted" class="btn btn-link pl-0 pr-0" @click="editCard(card)">
                                    <span class="oi oi-pencil" title="Edit Card" aria-hidden="true"></span>
                                </button>
                                <button :disabled="submitted" class="btn btn-link pl-0 pr-0" @click="deleteCard(card)">
                                    <span class="oi oi-trash" title="Delete Card" aria-hidden="true"></span>
                                </button>
                            </span>
                            
                        </div>
                    </div>
                    <button type="button" class="btn addCardBtn"
                            data-toggle="tooltip" data-placement="right"
                            :class="cardButtonClasses"
                            :disabled="submitted"
                            @click="createCard(cardType)">Add Card
                    </button>
                </div>
            </div>
        </div>
    `,
    props: ["details", "users"],
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
                'btn-secondary': this.cardsNormal,
                'btn-warning': this.cardsWarning,
                'btn-danger': this.cardsError
            }
        },
        cardButtonTooltip: function() {
            if (this.cardsWarning) {
                return "That's probably enough";
            } else if (this.cardsError) {
                return "Consider deleting some cards";
            } else {
                return "";
            }
        },
        submitted: function() {
            let currentUser = _.find(this.users, u => u.fullName === this.$currentUser.fullName);
            return currentUser ? currentUser.ready : true;
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
            if (!this.submitted) {
                this.uuidCurrentlyEditing = card.uuid;
            }
        },
        deleteCard: function(card) {
            if (!this.submitted) {
                this.$stompClient.send("/app/card/delete", {}, JSON.stringify(card));
            }
        },
        saveCard: function(card, e) {
            if (!this.submitted) {
                let text = $(e.currentTarget).val();
                card.text = text;
                this.uuidCurrentlyEditing = null;
                this.$stompClient.send("/app/card/update", {}, JSON.stringify(card));
                this.uuidCurrentlyEditing = null;
            }
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
        },
        sendReady: function() {
            this.$stompClient.send("/app/submission/userReady");
        }
    }
}