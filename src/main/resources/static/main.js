import App from '/component/app.js'

let stompClient;

function connect() {
    let socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({
            name: "James Bown"
        }, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/card/create', function (cards) {
            showCards(JSON.parse(cards.body));
        });
        stompClient.subscribe('/topic/notification', function (notification) {
            showNotification(JSON.parse(notification.body));
        });

        // subscribe with prefix /user for targeted messages
        stompClient.subscribe('/user/topic/phase/submission', function (msg) {
        });
        stompClient.subscribe('/topic/phase/submission', function (msg) {
        });
        stompClient.subscribe('/topic/phase/discussion', function (msg) {
        });
        stompClient.subscribe('/topic/phase/grouping', function (msg) {
        });
        stompClient.subscribe('/topic/phase/voting', function (msg) {
        });
        stompClient.subscribe('/topic/phase/actions', function (msg) {
        });
        resetState();
        userJoin();
        createCard();
        advancePhase();
        advancePhase();
        advancePhase();
        advancePhase();
    });
}

function resetState() {
    let r = confirm("Are you sure you know what you are doing? This cannot be undone!");
    if (r === true) {
        stompClient.send("/app/reset");
    }
}

function createCard() {
    let card = {
        uuid: guid(),
        cardType: "GOOD",
        text: "this is the first card",
        owner: "James Bown"
    };
    stompClient.send("/app/card/create", {}, JSON.stringify(card));
}

function showCards(cards) {
    $("body").append(cards);
}

function showNotification(notification) {
    console.log(notification.message);
}


function advancePhase() {
    let r = confirm("Are you sure you know what you are doing? This cannot be undone!");
    if (r === true) {
        stompClient.send("/app/advance-phase");
    }
}

function userJoin() {
    let user = {
        fullName: "James Bown",
        shortName: "JB"
    };
    stompClient.send("/app/user/join", {user: "James Bown"}, JSON.stringify(user));
}


function setupVue() {
    Vue.prototype.$cardTypes = [
        "Good",
        "Bad",
        "Opportunity",
        "Risk"
    ]
    var vm = new Vue({
        el: '#app',
        components: {
            App
        }
    });
}

setupVue();
// connect();


