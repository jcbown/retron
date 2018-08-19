let stompClient;

function connect() {
    let socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/card/create', function (cards) {
            showCards(JSON.parse(cards.body));
        });
        stompClient.subscribe('/topic/notification', function (notification) {
            showNotification(JSON.parse(notification.body));
        });
        advancePhase();
    });
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

connect();


