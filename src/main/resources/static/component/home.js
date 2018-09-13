import Submission from "./submission.js"
import Discussion from "./discussion.js"
import Grouping from "./grouping.js"
import Voting from "./voting.js"
import Actions from "./actions.js"


export default {
    components: {
        Submission,
        Discussion,
        Grouping,
        Voting,
        Actions
    },
    // language=HTML
    template: `
        <div class="row">
            <div class="col">

                <div>{{ user.fullName }} - {{ user.initials }}</div>

                <div class="alert alert-success hidden" id="notification">
                    <strong>Notification! </strong>
                    {{notification}}
                </div>
                
                <div class="alert alert-primary" role="alert">
                    <strong>Current Phase:</strong> {{ getPhaseText(currentPhase) }}
                </div>

                <button type="button" class="btn btn-primary float-right"
                        @click="advancePhase()">Next Phase
                </button>

                <submission v-if="this.currentPhase == 'SUBMISSION'" :details="submissionPhase" ></submission>
                <discussion v-if="this.currentPhase == 'DISCUSSION'" :details="discussionPhase"></discussion>
                <grouping v-if="this.currentPhase == 'GROUPING'" :details="groupingPhase"></grouping>
                <voting v-if="this.currentPhase == 'VOTING'" :details="votingPhase"></voting>
                <actions v-if="this.currentPhase == 'ACTIONS'" :details="actionsPhase"></actions>

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

            // Subscribe to Phase Changes
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

            // Subscribe to Notifications
            stompClient.subscribe('/topic/notification', this.showNotification);

            // Join session
            let user = {
                fullName: this.user.fullName,
                shortName: this.user.initials
            };
            stompClient.send("/app/user/join", {user: user.fullName}, JSON.stringify(user));
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
                SUBMISSION: "Submission - enter your innermost thoughts",
                DISCUSSION: "Discussion - let's chat",
                GROUPING: "Grouping - group the common ideas together",
                VOTING: "Voting - nearly done now",
                ACTIONS: "Actions - let's not make this all a waste of time"
            },
            notification: null
        }
    },
    methods: {

        displaySubmissionPhase: function (msg) {
            this.submissionPhase = JSON.parse(msg.body);
            this.currentPhase = "SUBMISSION";
        },
        displayDiscussionPhase: function (msg) {
            this.discussionPhase = JSON.parse(msg.body);
            this.currentPhase = "DISCUSSION";
        },
        displayGroupingPhase: function (msg) {
            this.groupingPhase = JSON.parse(msg.body);
            this.currentPhase = "GROUPING";
        },
        displayVotingPhase: function (msg) {
            this.votingPhase = JSON.parse(msg.body);
            this.currentPhase = "VOTING";
        },
        displayActionsPhase: function (msg) {
            this.actionPhase = JSON.parse(msg.body);
            this.currentPhase = "ACTIONS";
        },
        resetState: function () {
            this.$stompClient.send("/app/reset");
        },
        showNotification: function(msg) {
            this.notification = JSON.parse(msg.body).message;
            $("#notification").fadeTo(2000, 500).slideUp(500, function(){
                $("#notification").slideUp(500);
            });
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