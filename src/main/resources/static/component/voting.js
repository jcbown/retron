import Theme from "./theme.js"


export default {
    components: {
        Theme
    },
    // language=HTML
    template: `
        <div>
            <div class="row mb-3">
                <div class="col">
                    <div>
                        <strong>Voters:</strong>
                        <!-- Put user gutter here -->
                    </div>
                    <div class="float-right">
                        <span><strong>Votes Remaining:</strong> {{totalVotesRemaining}}</span>
                        <button v-if="!voted && totalVotesRemaining === 0" @click="sendReady" class="btn btn-primary btn-sm">Submit Votes</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-for="cardType in cardTypes" class="col">
                    <h3>{{cardType}}</h3>
                    <theme v-for="theme in getThemes(cardType)" :key="theme.id" :theme="theme"
                           @click.native="onThemeClick(theme)" class="cursorPointer"/>
                </div>
            </div>
        </div>
    `,
    props: ["themes"],
    data: function () {
        return {
            cardTypes: [],
            voted: false
        }
    },
    computed: {
        totalVotesRemaining: function () {
            return 3 - this.themes.map(t => t.votesCast).reduce((sum, cur) => sum + cur, 0);
        }
    },
    created: function () {
        this.cardTypes = this.$cardTypes;
    },
    methods: {
        getThemes: function (cardType) {
            let result = [];
            // cards we've already seen and the current ones
            for (let i = 0; i < this.themes.length; i++) {
                if (this.themes[i].cards[0].cardType === cardType) {
                    result.push(this.themes[i]);
                }
            }
            return result;
        },
        onThemeClick: function (theme) {
            if (theme.votesCast < 3) {
                theme.votesCast += 1;
            } else {
                // rollover
                theme.votesCast = 0;
            }
        },
        sendReady: function () {
            if (this.totalVotesRemaining === 0) {
                let themeIds = [];
                this.themes.forEach(t => {
                    for (let i=0; i < t.votesCast; i++) {
                        themeIds.push(t.id);
                    }
                });
                this.$stompClient.send("/app/voting/cast", {}, JSON.stringify(themeIds));
                this.voted = true;
            }
        }
    }
}