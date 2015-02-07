var bad_testimonials = ["\"I've been hating on Matt for years. He totally sucks.\" - Sahir",
	"\"I only met him once, but yeah, Matt blows chunks.\" - Nate",
	"\"Please stop.\" - Matt",
	"\"Sorry Matt. But you do suck.\" - Evan",
	"\"Matt Is A Huge Weenie, And We All Know It\" - Jaden Smith",
	"\"Shut up, Matt.\" - Tom Hanks",
	"\"I visited Columbia yesterday, and Matt is the reason I'm not coming here.\" - Malia Obama",
	"\"Matt has a lot of opinions, and all of them are bad.\" - Eunice",
	"\"Matt? What a bag.\" - All of the judges"
	];

var nice_testimonials = ["\"Actually Matt is super cool\" - some guy probably",
	"\"Oh, Matt? Matt has sick references.\" - Rasmi",
	"\"Most of the time, Matt doesn't suck.\" - Yih-Jen",
	"\"Matt has killer dance moves.\" - Brian",
	"\"Matt is a brilliant person.\" - Evan after Matt beat him at Trivia Crack",
	"\"I freaking love that guy.\" - Dan",
	"\"His presence shines radiance.\" - Lil B",
	"\"Matt knows what to do. All the time.\" - W3Schools"
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
			$.post("/mattsucks");
		}
		else if (howManyTimesHaveWeShatOnMatt === 3) {
			$("h1").animate({'opacity': 0}, 1000, function() {
				$(this).text("Matt rocks");
				$(this).css("text-shadow", "3px 3px #ccc");
				$(this).css("color", "#faa073");
			}).animate({"opacity": 1}, 1000);
			$("#matt-sucks").animate({'opacity': 0}, 1000, function() {
				$(this).text("No wait! Tell Matt he rocks.");
			}).animate({"opacity": 1}, 1000);
			subheadReset = setTimeout(function() {
				$("h2").animate({'opacity': 0}, 1000, function() {
					$(this).text("And he deserves to know it!");
				}).animate({"opacity": 1}, 1000);
			}, 4000)
		}
		else if (howManyTimesHaveWeShatOnMatt > 3 && howManyTimesHaveWeShatOnMatt < 6) {
			$("h2").animate({'opacity': 0}, 200, function() {
				$(this).text("You just told him to follow his dreams!");
			}).animate({"opacity": 1}, 200);
			subheadReset = setTimeout(function() {
				$("h2").animate({'opacity': 0}, 1000, function() {
					$(this).text("And he deserves to know it!");
					$(this).css("color", "#f0fafa");
				}).animate({"opacity": 1}, 1000);
			}, 4000)
			$.post("/mattrocks");
		}
		else {
			$("h2").animate({'opacity': 0}, 200, function() {
				$(this).text("Okay cool your jets he gets it.");
			}).animate({"opacity": 1}, 200);
			subheadReset = setTimeout(function() {
				$("h2").animate({'opacity': 0}, 1000, function() {
					$(this).text("And he deserves to know it!");
					$(this).css("color", "#f0fafa");
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