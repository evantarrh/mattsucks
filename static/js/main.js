
var bad_testimonials = ["\"I've been shitting on Matt for years. He totally sucks.\" - Sahir",
	"\"I only met him once, but yeah, Matt blows chunks.\" - Nate",
	"\"Please stop.\" - Matt",
	"\"Sorry Matt. But you do suck.\" - Evan",
	"\"Having a second kid was a mistake.\" - Matt's dad",
	"\"Matt is a huge weenie, and we all know it\" - Jaden Smith",
	"\"Shut up, Matt.\" - Tom Hanks",
	"\"I visited Columbia yesterday, and Matt is the reason I'm not coming here.\" - Malia Obama",
	"\"Matt has a lot of opinions, and all of them are bad.\" - Eunice"
	];

var nice_testimonials = ["\"Actually Matt is cool\" - one guy",
	"\"Actually Matt is cool\" - another guy",
	"\"Actually Matt is cool\" - some dweeb"
	];

var howManyTimesHaveWeShatOnMatt = 0;

$().ready(function() {

	// $("#matt-rocks").click(function(e) {

	// 	console.log("Matt totally rocks!");

	// 	$.post("/mattrocks");
	// })

	$("#matt-sucks").click(function(e) {
		if (howManyTimesHaveWeShatOnMatt < 3) {
			//$.post("/mattsucks");
		}
		else if (howManyTimesHaveWeShatOnMatt === 3) {
			console.log($("#matt-sucks").css("display"));
			// $("#matt-sucks").css("display", "hidden");
			// $("#matt-rocks").css("display", "visible");
			$("h1").animate({'opacity': 0}, 1000, function() {
				$(this).text("Matt rocks");
			}).animate({"opacity": 1}, 1000);
			$("#matt-sucks").animate({'opacity': 0}, 1000, function() {
				$(this).text("No wait! Tell Matt he rocks.");
			}).animate({"opacity": 1}, 1000);
			//changeOfHeart();
		}
		else if (howManyTimesHaveWeShatOnMatt > 3 && howManyTimesHaveWeShatOnMatt < 6) {
			$.post("/mattrocks");
		}
		howManyTimesHaveWeShatOnMatt++;
	});

	// changeOfHeart = function() {
	// 	console.log("hi");
	// 	$("#matt-sucks").css("display", "hidden");
	// 	$("#matt-rocks").css("display", "visible");
	// 	$("h1").animate({'opacity': 0}, 1000, function() {
	// 		$(this).text("Matt rocks");
	// 	}).animate({"opacity": 1}, 1000);

	// }

	setInterval(function() {
		if (howManyTimesHaveWeShatOnMatt < 3) {
			$("#testimonial").animate({'opacity': 0}, 1000, function(){
				$(this).text(bad_testimonials[ Math.floor(Math.random() * bad_testimonials.length) ]);
			}).animate({'opacity': 1}, 1000);
		}
		else {
			$("#testimonial").animate({'opacity': 0}, 1000, function(){
				$(this).text(nice_testimonials[ Math.floor(Math.random() * nice_testimonials.length) ]);
			}).animate({'opacity': 1}, 1000);			
		}
	}, 4000);


});