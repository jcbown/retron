export default {
    components: {},
    // language=HTML
    template: `
        <div>
            Submission time is upon us
            <table class="table">
                <thead>
                <tr>
                    <th>Good</th>
                    <th>Bad</th>
                    <th>Opportunity</th>
                    <th>Risk</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="card in cardsGood()">
                    <td>{{ card.text }}</td>
                    <td>hmm</td>
                    <td>hmm</td>
                    <td>hmm</td>
                </tr>
                </tbody>
            </table>
        </div>
    `,
    props: [],
    data: function () {
        return {}
    },
    created: function () {

    },
    methods: {
        func: function () {

        },
        cardsGood: function () {
            return [{
                text: "hmasdfasdfm"
            },
                {
                    text: "morehmm"
                }];
        }
    }
}