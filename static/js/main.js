
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

var subheadReset;

$().ready(function() {

	$("#matt-sucks").click(function(e) {
		window.clearInterval(subheadReset);

		if (howManyTimesHaveWeShatOnMatt < 3) {
			$("h2").animate({'opacity': 0}, 200, function() {
				$(this).text("The text you just sent him: \"Hey Matt! You suck.\"");
				$(this).css("color", "#455996");
			}).animate({"opacity": 1}, 200);
			subheadReset = setTimeout(function() {
				$("h2").animate({'opacity': 0}, 800, function() {
					$(this).text("And he deserves to know it.");
					$(this).css("color", "#f0fafa");
				}).animate({"opacity": 1}, 300);
			}, 4000)
			//$.post("/mattsucks");
		}
		else if (howManyTimesHaveWeShatOnMatt === 3) {
			$("h1").animate({'opacity': 0}, 1000, function() {
				$(this).text("Matt rocks");
				$(this).css("text-shadow", "3px 3px #ccc")
			}).animate({"opacity": 1}, 1000);
			$("#matt-sucks").animate({'opacity': 0}, 1000, function() {
				$(this).text("No wait! Tell Matt he rocks.");
			}).animate({"opacity": 1}, 1000);
			subheadReset = setTimeout(function() {
				$("h2").animate({'opacity': 0}, 1000, function() {
					$(this).text("And he deserves to know it.");
				}).animate({"opacity": 1}, 1000);
			}, 4000)
		}
		else if (howManyTimesHaveWeShatOnMatt > 3 && howManyTimesHaveWeShatOnMatt < 6) {
			$("h2").animate({'opacity': 0}, 200, function() {
				$(this).text("You just told him to follow his dreams!");
			}).animate({"opacity": 1}, 200);
			subheadReset = setTimeout(function() {
				$("h2").animate({'opacity': 0}, 1000, function() {
					$(this).text("And he deserves to know it.");
				}).animate({"opacity": 1}, 1000);
			}, 4000)
			//$.post("/mattrocks");
		}
		else {
			$("h2").animate({'opacity': 0}, 200, function() {
				$(this).text("Okay cool your jets he gets it.");
			}).animate({"opacity": 1}, 200);
			subheadReset = setTimeout(function() {
				$("h2").animate({'opacity': 0}, 1000, function() {
					$(this).text("And he deserves to know it.");
				}).animate({"opacity": 1}, 1000);
			}, 4000)
		}
		howManyTimesHaveWeShatOnMatt++;
	});

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
	}, 6000);


});