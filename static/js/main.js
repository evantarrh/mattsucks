$().ready(function() {
	var buttonReset;
	var numclicks = 0;

	var data = document.querySelector('#data');
	var first_name = data.dataset.firstname;
	var gender = data.dataset.gender;
	var urlstring = data.dataset.urlstring;
	var page_color = data.dataset.backgroundcolor;
	
	function gender_pronoun_alt_one(gender_one) {
		switch(gender_one) {
			case ("he"):
				return "him";
			case ("she"):
				return "her";
			default:
				return "them";
		}
	}

	var bad_testimonials = ["\"I've been hating on " + first_name + " for years. Yeah, " + gender + " totally " + (gender === "they"? "suck" : "sucks") + ".\" - His Holiness the Dalai Lama",
		"\"I only met " + gender_pronoun_alt_one(gender) + " once, but yeah, " + first_name + " blows chunks.\" - Mary-Kate Olsen",
		"\"Please stop.\" - " + first_name,
		"\"Sorry " + first_name + ". But you do suck.\" - Jackie Chan",
		"\"" + first_name + " Is A Huge Weenie, And We All Know It\" - Jaden Smith",
		"\"Shut up, " + first_name + ".\" - Tom Hanks",
		"\"I visited Columbia yesterday, and " + first_name + " is the reason I'm not coming here.\" - Malia Obama",
		"\"" + first_name + " has a lot of opinions, and all of them are bad.\" - Morgan Freeman",
		"\"" + first_name + "? What a bag.\" - Former President Ronald Reagan",
		"\"It's about time someone took " + gender_pronoun_alt_one(gender) + " down a notch.\" – " + first_name + "'s mom"
		];

	$("#matt-sucks").click(function(e) {
		window.clearInterval(buttonReset);
		if(numclicks >= 3){
			$('button').text("Cool your jets");
		}else{
			$.post("/sendtext/" + urlstring , function( response ){
				console.dir(response);
			});
			
			$("button").fadeIn(function() {
				$(this).text("Nice! You told " + first_name + " he sucks.");
				$(this).css("color", shade(page_color, -0.4));
			});
			buttonReset = setTimeout(function() {
				$("button").fadeIn(function() {
					$(this).text("Tell " + first_name + " he sucks.");
					$(this).css("color", page_color);
				});
			}, 4000);
		}
	});

	function setColors() {
		$('body,html').css({
			background: page_color
		});
		$('button').css({
			color: page_color,
			background: shade(page_color, 0.9),
			boxShadow: "6px 6px 2px" + shade(page_color, -0.2)
		});
		$('button').mouseover(function(){
			$(this).css({boxShadow: "3px 3px 1px" + shade(page_color, -0.3)})
		}).mouseout(function() {
			$(this).css({boxShadow: "6px 6px 2px" + shade(page_color, -0.2)})			
		});
		$('h1, footer').css({
			color: shade(page_color, 0.9)
		});
		$('a, .alert').css({
			color: page_color
		});
		$('a').mouseover(function(){
			$(this).css({color: shade(page_color, 0.3)})
		}).mouseout(function() {
			$(this).css({color: page_color})			
		});
		$('#text-count').css({
			color: shade(page_color, -0.5),
			background: page_color
		})
	}

	function shade(color, percent) {   
	    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
	    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
	}

	// gives testimonial a default value
	$("#testimonial").text(bad_testimonials[ Math.floor(Math.random() * bad_testimonials.length) ]);

	// updates testimonials w/ random new one every 6 seconds
	setInterval(function() {
		$("#testimonial").animate({'opacity': 0}, 1000, function(){
			$(this).text(bad_testimonials[ Math.floor(Math.random() * bad_testimonials.length) ]);
		}).animate({'opacity': 1}, 1000);

	}, 6000);

	$(".close").click(function() {
		$(".alert-container").css({display: "none"});
	})

	setColors();


});