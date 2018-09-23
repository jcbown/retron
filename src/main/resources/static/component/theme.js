export default {
    components: {},
    // language=HTML
    template: `
        <div class="card mb-2">
            <div class="card-body">
                <span>{{card.text}}</span>
                <span class="float-right" width="20rem">
                        <a href="javascript:void(0)" class="badge badge-primary">{{card.owner}}</a>
                </span>
            </div>
        </div>
    `,
    props: ["card"],
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