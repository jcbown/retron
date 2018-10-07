import UserBadge from "./userBadge.js"

export default {
    components: {
        UserBadge
    },
    // language=HTML
    template: `
        <div class="container">
            <div class="row mt-3">
                <div class="col">
                    <h2>Retron</h2>
                    <form onsubmit="return false;">
                        <div class="form-group">
                            <label for="fullName">Full Name</label>
                            <input v-model="fullName" type="text" class="form-control" id="fullName" placeholder="Enter your full name">
                        </div>
                        <div class="form-group">
                            <label for="colour">Colour</label>
                            <input v-model="colour" type="color" class="form-control" id="colour">
                        </div>
                        <div>
                            Your badge will appear like this to others: <userBadge :fullName="fullName" :colour="colour"/>
                        </div>
                        <div>
                            <button @click="submit()" type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    props: [

    ],
    data: function () {
        return {
            fullName: "",
            colour: "#007bff"
        }
    },
    created: function() {

    },
    methods: {
        submit: function() {
            this.$emit('logged-in', {
                fullName: this.fullName,
                colour: this.colour
            });
        }
    }
}