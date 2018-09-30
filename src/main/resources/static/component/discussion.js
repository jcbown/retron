import Card from "./card.js"
import UserBadge from "./userBadge.js"

export default {
    components: {
        Card,
        UserBadge
    },
    // language=HTML
    template: `
        <div>
            <div class="row mb-4">
                <div class="col">
                    <span>
                        <userBadge v-for="user in getSeenUsers()" :fullName="user.fullName" :colour="user.colour" :done="true" class="mr-4"/>
                        <userBadge v-for="user in getUnseenUsers()" :fullName="user.fullName" :colour="user.colour" :done="false" class="mr-4"/>
                    </span>
                    <span class="float-right">
                        <span class="mr-1">
                            <button @click="previousOwner" class="btn btn-secondary">Previous</button>
                            <button @click="nextOwner" class="btn btn-secondary">Next</button> 
                        </span>
                        <button :disabled="!isLastOwner" @click="nextPhase" class="btn btn-primary btn-sm">Next Phase</button>
                    </span>
                </div>
            </div>
            <div class="row">
                <div v-for="cardType in cardTypes" class="col">
                    <h3>{{cardType}}</h3>
                    <card v-for="card in getHighlightedCards(cardType)" :key="card.id" :card="card" class="bg-secondary text-white"/>
                </div>
            </div>
            <hr/>
            <div class="row">
                <div v-for="cardType in cardTypes" class="col">
                    <card v-for="card in getOtherCards(cardType)" :key="card.id" :card="card"/>
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
    computed: {
        isLastOwner: function() {
            return this.cardsByOwner.length === this.currentOwnerIndex + 1;
        }
    },
    created: function () {
        this.cardTypes = this.$cardTypes;
    },
    methods: {
        getSeenUsers: function() {
            let result = [];
            for (let i=0; i <= this.currentOwnerIndex; i++) {
                result.push(this.cardsByOwner[i].owner);
            }
            return result;
        },
        getUnseenUsers: function() {
            let result = [];
            for (let i=this.currentOwnerIndex + 1; i < this.cardsByOwner.length; i++) {
                result.push(this.cardsByOwner[i].owner);
            }
            return result;
        },
        getHighlightedCards: function(cardType) {
            return this.cardsByOwner[this.currentOwnerIndex].cards.filter(c => c.cardType === cardType)
        },
        getOtherCards: function (cardType) {
            let result = [];
            // cards we've already seen and the current ones
            for (let i = 0; i < this.currentOwnerIndex; i++) {
                result = result.concat(this.cardsByOwner[i].cards.filter(c => c.cardType === cardType));
            }
            return result;
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