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
        <div id="home">
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <a class="navbar-brand" href="javascript:void(0)" @click="reloadPage()">retron</a>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mr-auto"> <!-- We have this as it stretches across the navbar -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Admin
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item" href="javascript:void(0)" @click="advancePhase()">Force Next Phase</a>
                                <a class="dropdown-item" href="javascript:void(0)" @click="resetState()">Reset Retrospective</a>
                            </div>
                        </li>
                    </ul>
                    <span class="navbar-text">
                      <strong>Phase: </strong>{{ getPhaseName() }}
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
                      {{ user.fullName }}
                    </span>
                </div>
            </nav>
            <div id="home-container" class="container-fluid">
                <div class="row">
                    <div class="col">

                        

                        <div class="alert alert-success hidden" id="notification">
                            <strong>Notification! </strong>
                            {{notification}}
                        </div>


                        <submission v-if="this.currentPhase == 'SUBMISSION'" :details="submissionPhase"></submission>
                        <discussion v-if="this.currentPhase == 'DISCUSSION'" :cardsByOwner="discussionPhase.cardsByOwner" :currentOwnerIndex="discussionPhase.currentOwner"></discussion>
                        <grouping v-if="this.currentPhase == 'GROUPING'" :details="groupingPhase"></grouping>
                        <voting v-if="this.currentPhase == 'VOTING'" :details="votingPhase"></voting>
                        <actions v-if="this.currentPhase == 'ACTIONS'" :details="actionsPhase"></actions>

                    </div>
                </div>
            </div>
            <footer id="home-footer">
                <div class="container">
                    <span class="text-muted"><strong>{{ getPhaseName() }}</strong> - {{ getPhaseHelp() }}</span>
                </div>
            </footer>
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
            phaseHelp: {
                SUBMISSION: "Add cards to the board with your thoughts for this retrospective. Double click on a card to edit.",
                DISCUSSION: "You can use the left and right arrow keys to navigate through users.",
                GROUPING: "Click on cards to group them into similar themes.",
                VOTING: "Click on a theme to vote for it. You have three votes available. You can vote for the same theme more than once.",
                ACTIONS: "Decide on actions for the themes with the most votes."
            },
            phaseName: {
                SUBMISSION: "Submission",
                DISCUSSION: "Discussion",
                GROUPING: "Grouping",
                VOTING: "Voting",
                ACTIONS: "Actions"
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
            this.actionsPhase = JSON.parse(msg.body);
            this.currentPhase = "ACTIONS";
        },
        reloadPage: function() {
            location.reload(true);
        },
        resetState: function () {
            this.$stompClient.send("/app/reset");
        },
        showNotification: function (msg) {
            this.notification = JSON.parse(msg.body).message;
            $("#notification").fadeTo(2000, 500).slideUp(500, function () {
                $("#notification").slideUp(500);
            });
        },
        showAdvancePhaseBtn: function () {
            return this.currentPhase !== "ACTIONS";
        },
        getPhaseName: function () {
            if (this.currentPhase) {
                return this.phaseName[this.currentPhase];
            }
        },
        getPhaseHelp: function () {
            if (this.currentPhase) {
                return this.phaseHelp[this.currentPhase];
            }
        },
        advancePhase: function () {
            this.$stompClient.send("/app/advance-phase");
        }
    }
}