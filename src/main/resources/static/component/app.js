import Login from "./login.js"
import Home from "./home.js"

export default {
    components: {
        Login,
        Home
    },
    // language=HTML
    template: `
        <div class="fullHeight">
            <login v-if="!user" @logged-in="userLoggedIn"></login>
            <home v-if="user" :user="user"></home>
        </div>
    `,
    props: [

    ],
    data: function () {
        return {
            user: undefined
        }
    },
    created: function() {
        let myStorage = window.sessionStorage;
        let userJson = myStorage.getItem('userJson');
        if (userJson) {
            let user = JSON.parse(userJson);
            this.user = user;
        }
    },
    methods: {
        userLoggedIn: function(user) {
            let myStorage = window.sessionStorage;
            myStorage.setItem('userJson', JSON.stringify(user));
            this.user = user;
            console.log("User: " + user);
        }
    }
}