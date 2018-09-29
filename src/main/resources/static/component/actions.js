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
                    <h4>Plan Actions</h4>
                </div>
            </div>
            <div class="row" v-for="theme in actionThemes">
                <div class="col">
                    <theme :theme="theme"/>
                </div>
                <div class="col">
                    <span>Voters: </span>
                    <span v-for="vote in theme.votes" class="pr-2">
                        <span class="badge badge-pill badge-success">{{vote.user.fullName}}</span>
                    </span>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col">
                    <h4>Other Themes</h4>
                </div>
            </div>
            <div class="row muted-themes" v-for="theme in otherThemes">
                <div class="col">
                    <theme :theme="theme"/>
                </div>
                <div class="col">
                    <span v-for="vote in theme.votes" class="pr-2">
                        <span class="badge badge-pill badge-secondary">{{vote.user.fullName}}</span>
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