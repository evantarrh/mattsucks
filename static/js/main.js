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

var buttonReset;
var numclicks = 0;

var data = document.querySelector('#data');
console.dir(data);
var first_name = data.dataset.first_name;
var urlstring = data.dataset.urlstring;

$().ready(function() {

	$("#matt-sucks").click(function(e) {
		window.clearInterval(buttonReset);
		if(numclicks >= 3){
			$('button').text("Cool your jets");
		}else{
			$.post("/sendtext/" + urlstring , function( response ){
				console.dir(response);
			});
			
			$("button").fadeIn(function() {
				$(this).text("Nice! You told Matt he sucks.");
				$(this).css("color", "#48d");
			});
			buttonReset = setTimeout(function() {
				$("button").fadeIn(function() {
					$(this).text("Tell Matt he sucks.");
					$(this).css("color", "#87cefa");
				});
			}, 4000);
		}
	});

	setInterval(function() {
		$("#testimonial").animate({'opacity': 0}, 1000, function(){
			$(this).text(bad_testimonials[ Math.floor(Math.random() * bad_testimonials.length) ]);
		}).animate({'opacity': 1}, 1000);

	}, 6000);


});