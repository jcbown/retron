export default {
    components: {

    },
    // language=HTML
    template: `
        <span class="user-badge mr-2">
            <span class="badge badge-primary" :class="{'user-badge-transparent': done}" :style="{'background-color': colour}">{{fullName}}</span>
            <span v-if="done" class="oi oi-check user-badge-done" title="Done" aria-hidden="true"></span>
        </span>
    `,
    props: ["fullName", "colour", "done"],
    data: function () {
        return {

        }
    },
    created: function() {
    },
    methods: {
        func: function() {

        }
    }
}