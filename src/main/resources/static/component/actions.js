import Theme from "./theme.js"
import UserBadge from "./userBadge.js"

export default {
    components: {
        Theme,
        UserBadge
    },
    // language=HTML
    template: `
        <div class="container">
            <div class="row">
                <div class="col">
                    <h4>Plan Actions</h4>
                </div>
            </div>
            <div class="row align-items-center" v-for="theme in actionThemes">
                <div class="col">
                    <theme :theme="theme" showCardTypes="true"/>
                </div>
                <div class="col">
                    <span class="mr-2"><strong>Voters: </strong></span>
                    <span v-for="vote in theme.votes" class="pr-2">
                        <userBadge :fullName="vote.user.fullName" :colour="vote.user.colour"/>
                    </span>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col">
                    <h4>Other Themes</h4>
                </div>
            </div>
            <div class="row align-items-center" v-for="theme in otherThemes">
                <div class="col">
                    <theme :theme="theme" showCardTypes="true"/>
                </div>
                <div class="col">
                    <span class="mr-2"><strong>Voters: </strong></span>
                    <span v-for="vote in theme.votes" class="pr-2">
                        <userBadge :fullName="vote.user.fullName" :colour="vote.user.colour"/>
                    </span>
                </div>
            </div>
        </div>
    `,
    props: ["actionThemes", "otherThemes"],
    data: function () {
        return {
            blah: []
        }
    },
    created: function () {
    },
    methods: {
        func: function () {

        }
    }
}