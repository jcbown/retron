import Submission from "./submission.js"
import Discussion from "./discussion.js"


export default {
    components: {
        Submission,
        Discussion
    },
    // language=HTML
    template: `
        <div class="row">
            <div class="col">

                <span>{{ user.fullName }} - {{ user.initials }}</span>
                
                <div class="alert alert-primary" role="alert">
                    <strong>Current Phase:</strong> {{ getPhaseText(currentPhase) }}
                </div>

                <button type="button" class="btn btn-primary float-right"
                        @click="advancePhase()">Next Phase
                </button>

                <submission v-if="this.currentPhase == 'SUBMISSION'"></submission>
                <discussion v-if="this.currentPhase == 'DISCUSSION'"></discussion>
                <!--<grouping v-if="this.currentPhase == 'GROUPING'"></grouping>-->
                <!--<voting v-if="this.currentPhase == 'VOTING'"></voting>-->
                <!--<actions v-if="this.currentPhase == 'ACTIONS'"></actions>-->

            </div>
        </div>
    `,
    props: ["user"],
    created: function () {

        // Initialise Stomp
        let socket = new SockJS('/gs-guide-websocket');
        let stompClient = Stomp.over(socket);
        Vue.prototype.$stompClient = stompClient; // make available to other components
        stompClient.connect({
            name: this.user.fullName
        }, function (frame) {
            console.log('Connected: ' + frame);

            this.resetState(); // TODO REMOVEME

            stompClient.subscribe('/user/topic/phase/submission', function (msg) {
                this.displaySubmissionPhase(msg);
            }.bind(this));
            stompClient.subscribe('/topic/phase/submission', function (msg) {
                this.displaySubmissionPhase(msg);
            }.bind(this));
            stompClient.subscribe('/user/topic/phase/discussion', function (msg) {
                this.displayDiscussionPhase(msg);
            }.bind(this));
            stompClient.subscribe('/topic/phase/discussion', function (msg) {
                this.displayDiscussionPhase(msg);
            }.bind(this));
            stompClient.subscribe('/user/topic/phase/grouping', function (msg) {
                this.displayGroupingPhase(msg);
            }.bind(this));
            stompClient.subscribe('/topic/phase/grouping', function (msg) {
                this.displayGroupingPhase(msg);
            }.bind(this));
            stompClient.subscribe('/user/topic/phase/voting', function (msg) {
                this.displayVotingPhase(msg);
            }.bind(this));
            stompClient.subscribe('/topic/phase/voting', function (msg) {
                this.displayVotingPhase(msg);
            }.bind(this));
            stompClient.subscribe('/user/topic/phase/actions', function (msg) {
                this.displayActionsPhase(msg);
            }.bind(this));
            stompClient.subscribe('/topic/phase/actions', function (msg) {
                this.displayActionsPhase(msg);
            }.bind(this));

            // Join session
            let user = {
                fullName: this.user.fullName,
                shortName: this.user.initials
            };
            stompClient.send("/app/user/join", {user: "James Bown"}, JSON.stringify(user));
        }.bind(this));
    },
    data: function () {
        return {
            currentPhase: null,
            submissionPhase: null,
            discussionPhase: null,
            groupingPhase: null,
            votingPhase: null,
            actionsPhase: null,
            phaseText: {
                SUBMISSION: "Submission - submit your innermost thoughts",
                DISCUSSION: "Discussion - let's chat",
                GROUPING: "Grouping - group the common ideas together",
                VOTING: "Voting - nearly done now",
                ACTIONS: "Actions - let's not make this all a waste of time"
            }
        }
    },
    methods: {

        displaySubmissionPhase: function (msg) {
            this.currentPhase = "SUBMISSION";
            this.submissionPhase = JSON.parse(msg.body);
        },
        displayDiscussionPhase: function (msg) {
            this.currentPhase = "DISCUSSION";
            this.discussionPhase = JSON.parse(msg.body);
        },
        displayGroupingPhase: function (msg) {

        },
        displayVotingPhase: function (msg) {

        },
        displayActionsPhase: function (msg) {

        },
        resetState: function () {
            this.$stompClient.send("/app/reset");
        },
        getPhaseText: function (currentPhase) {
            if (currentPhase) {
                return this.phaseText[currentPhase];
            }
        },
        advancePhase: function () {
            this.$stompClient.send("/app/advance-phase");
        }
    }
}