export default {
    components: {

    },
    // language=HTML
    template: `
        <div class="container">
            <div class="row">
                <div class="col">
                    <form onsubmit="return false;">
                        <div class="form-group">
                            <label for="fullName">Full Name</label>
                            <input v-model="fullName" type="text" class="form-control" id="fullName" placeholder="Enter your first and second name">
                        </div>
                        <div class="form-group">
                            <label for="initials">Initials</label>
                            <input v-model="initials" type="text" class="form-control" id="initials" placeholder="Enter your initials">
                        </div>
                        <div>
                            Your badge will appear like this throughout the site: <a href="javascript:void(0)" class="badge badge-primary">{{fullName}}</a>
                        </div>
                        <button @click="submit()" type="submit" class="btn btn-primary">Submit</button>
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
            initials: ""
        }
    },
    created: function() {

    },
    methods: {
        submit: function() {
            this.$emit('logged-in', {
                fullName: this.fullName,
                initials: this.initials
            });
        }
    }
}