import Theme from "./theme.js"

export default {
    components: {
        Theme
    },
    // language=HTML
    template: `
        <div class="container">
            <div class="row">
                <div class="col">
                    <div v-for="theme in actionThemes">
                        <theme :theme="theme"/>
                        <span>Voters: </span>
                        <span v-for="vote in theme.votes">
                            <span class="badge badge-pill badge-success">{{vote.user.fullName}}</span>
                        </span>
                        <div>&nbsp;</div>
                    </div>
                    <div id="muted-themes" v-for="theme in otherThemes">
                        <theme :theme="theme"/>
                        <span v-for="vote in theme.votes">
                            <span class="badge badge-pill badge-secondary">{{vote.user.fullName}}</span>
                        </span>
                        <div>&nbsp;</div>
                    </div>
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