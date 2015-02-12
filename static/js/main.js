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


var subheadReset;
var numclicks = 0;

var data = document.querySelector('#data');
console.dir(data);
var first_name = data.dataset.first_name;
var urlstring = data.dataset.urlstring;



$().ready(function() {

	$("#matt-sucks").click(function(e) {
		window.clearInterval(subheadReset);
		if(numclicks >= 3){
			$('h2').text("Cool your jets");
		}else{
			$.post("/sendtext/" + urlstring , function( response ){
				console.dir(response);
			})
		}
	});






	setInterval(function() {
		$("#testimonial").animate({'opacity': 0}, 1000, function(){
			$(this).text(bad_testimonials[ Math.floor(Math.random() * bad_testimonials.length) ]);
		}).animate({'opacity': 1}, 1000);

	}, 6000);


});