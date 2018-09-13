export default {
    components: {},
    // language=HTML
    template: `
        <div>
            Discussion time is upon us
            <div id="carousel" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <h3>James Bown</h3>
                        <h4>Good</h4>
                        <p>My text for this card is this</p>
                    </div>
                    <div class="carousel-item">
                        no more
                    </div>
                    <div class="carousel-item">
                        no more
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button"
                   data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button"
                   data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    `,
    props: ["details"],
    data: function () {
        return {
            cards: []
        }
    },
    created: function () {
        this.cards = this.details.cards;
    },
    methods: {
        func: function () {

        }
    }
}