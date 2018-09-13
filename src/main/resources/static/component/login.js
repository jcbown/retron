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
                            <input type="text" class="form-control" id="fullName" placeholder="Enter your first and second name">
                        </div>
                        <div class="form-group">
                            <label for="initials">Initials</label>
                            <input type="text" class="form-control" id="initials" placeholder="Enter your initials">
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

        }
    },
    created: function() {

    },
    methods: {
        submit: function() {
            this.$emit('logged-in', {
                fullName: $("#fullName").val(),
                initials: $("#initials").val()
            });
        }
    }
}