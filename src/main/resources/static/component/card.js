import UserBadge from "./userBadge.js"


export default {
    components: {
        UserBadge
    },
    // language=HTML
    template: `
        <div class="card mb-2">
            <div class="card-body">
                <h6 v-if="showCardType" class="card-subtitle mb-2 text-muted">{{card.cardType}}</h6>
                <span>{{card.text}}</span>
                <span class="float-right" width="20rem">
                    <userBadge :fullName="card.user.fullName" :colour="card.user.colour"/>
                </span>
            </div>
        </div>
    `,
    props: ["card", "showCardType"],
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