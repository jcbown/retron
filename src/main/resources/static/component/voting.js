export default {
    components: {

    },
    // language=HTML
    template: `
        <div>
            
        </div>
    `,
    props: ["details"],
    data: function () {
        return {
            themes: []
        }
    },
    created: function() {
        this.themes = this.details.themes;
    },
    methods: {
        func: function() {

        }
    }
}