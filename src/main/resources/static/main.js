import App from '/component/app.js'

function setupVue() {
    Vue.prototype.$cardTypes = [
        "Good",
        "Bad",
        "Opportunity",
        "Risk"
    ];
    var vm = new Vue({
        el: '#app',
        components: {
            App
        }
    });
}

setupVue();


