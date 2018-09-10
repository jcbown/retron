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
    stompClient.send("/app/reset");
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
    stompClient.send("/app/advance-phase");
}

function userJoin() {
    let user = {
        fullName: "James Bown",
        shortName: "JB"
    };
    stompClient.send("/app/user/join", {user: "James Bown"}, JSON.stringify(user));
}

function prepareCarousel() {
    $('.carousel').carousel({
        pause: true
    });
}

function setupPage() {
    Vue.component('home', {});
    var home = new Vue({});
}

setupPage();
connect();
prepareCarousel();


