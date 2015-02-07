
var testimonials = ["\"I've been shitting on Matt for years. He sucks.\" - Sahir",
	"\"I only met him once, but yeah, Matt blows chunks.\" - Nate",
	"\"Please stop.\" - Matt",
	"\"Sorry Matt. You do suck.\" - Evan"]

$().ready(function() {

	$("#matt-sucks").click(function(e) {

		console.log("Matt sucks a whole lot, you are doing god's work");

		$.post("/servo_post");

	});

	setInterval(function() {
		$("#testimonial").animate({'opacity': 0}, 1000, function(){
			$(this).text(testimonials[ Math.floor(Math.random() * testimonials.length) ]);
		})
		.animate({'opacity': 1}, 1000);
	}, 4000);


});