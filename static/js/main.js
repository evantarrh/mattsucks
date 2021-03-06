$().ready(function() {
    var buttonReset;
    var numclicks = 0;
    var rateLimited = false;

    var data = document.querySelector('#data');
    var first_name = data.dataset.firstname;
    var gender = data.dataset.gender;
    var urlstring = data.dataset.urlstring;
    var page_color = data.dataset.backgroundcolor;
    var text_count = data.dataset.textcount;
    
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

    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    function shuffle(o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    var bad_testimonials = ["\"I've been hating on " + first_name + " for years\u2014" + gender + " totally " + (gender === "they"? "suck" : "sucks") + ".\" - His Holiness the Dalai Lama",
        "\"I only met " + gender_pronoun_alt_one(gender) + " once, but yeah, " + first_name + " blows chunks.\" - Mary-Kate Olsen",
        "\"Please stop.\" - " + first_name,
        "\"Sorry " + first_name + ". But you do suck.\" - Jackie Chan",
        "\"" + first_name + " Is A Huge Weenie, And We All Know It\" - Jaden Smith",
        "\"Shut up, " + first_name + ".\" - Tom Hanks",
        "\"I visited Columbia yesterday, and " + first_name + " is the reason I'm not coming here.\" - Malia Obama",
        "\"" + first_name + " has a lot of opinions, and all of them are bad.\" - Morgan Freeman",
        "\"" + first_name + "? What a bag.\" - Former President Ronald Reagan",
        "\"I don't think anyone has ever liked " + first_name + ".\" - Dwayne \"The Rock\" Johnson",
        "\"Oh man, " + first_name + " tooootally sucks.\" - Justin Timberlake",
        "\"I've been to rehab 7 times, and even I know " + first_name + " needs help.\" - Lindsay Lohan",
        "\"It's about time someone took " + gender_pronoun_alt_one(gender) + " down a notch.\" – " + first_name + "'s mom",
        "\"" + first_name + " is uninspiring in every way. God, what a bummer.\" - Bill Gates"
        ];

    var cool_your_jets = ["Cool your jets",
        "Settle down now",
        "Okay " + gender + " " + (gender === "they"? "get" : "gets")+ " it",
        "That's quite enough",
        "Alright be nice",
        "Take a chill pill",
        "Easy there skipper",
        "Yikes",
        "Too much hate",
        "\u2639",
        "Simmer down simmer down",
        "Ease up",
        "Now go make nice",
        "Go hug someone or something",
        "Okay cut it out",
        "Stop that",
        first_name + " has feelings you know"
        ];

    var testimonialCount = 0;
    function getTestimonial() {
        // if we've returned every element, shuffle the array
        if (testimonialCount % bad_testimonials.length === 0) {
            shuffle(bad_testimonials);
        }
        return bad_testimonials[testimonialCount++ % bad_testimonials.length];
    }
    
    var coolantCount = 0;
    function getCoolant() {
        if (coolantCount % cool_your_jets.length === 0) {
            shuffle(cool_your_jets);
        }
        return cool_your_jets[coolantCount++ % cool_your_jets.length];
    }

    function simmerDown() {
            $("button").text(getCoolant());
            $("button").disabled = true;
            $("button").css({
                background: page_color,
                border: "2px solid " + shade(page_color, 0.9),
                cursor: "auto",
                boxShadow: "none",
                transform: "translate(3px, 3px)",
                color: shade(page_color, -0.4)
            });
            $("button").mouseover(function(){
                $(this).css({
                    boxShadow: "none",
                    transform: "translate(3px, 3px)"
                })
            }).mouseout(function() {
                $(this).css({
                    boxShadow: "none",
                    transform: "translate(3px, 3px)"
                })          
            });
    }

    var textCountTimeout;

    $("#hater-button").click(function(e) {
        numclicks++;
        window.clearInterval(buttonReset);

        if (typeof textCountTimeout !== "undefined") {
            clearInterval(textCountTimeout);
        }

        if(numclicks > 3 && !rateLimited){
            simmerDown();
            $("h2").text("And " + gender + " definitely " + (gender === "they"? "know" : "knows") +" it! That's enough texts for now...")
        } else {
            $.post("/sendtext/" + urlstring , function( data, textStatus, jqXHR ){
                // success, update button
                $("button").fadeIn(function() {
                    $(this).text("Nice! You told " + first_name + " " + gender + " " + (gender === "they"? "suck" : "sucks") + ".");
                    $(this).css("color", shade(page_color, -0.4));
                });
                buttonReset = setTimeout(function() {
                    $("button").fadeIn(function() {
                        $(this).text("Tell " + first_name + " " + gender + " " + (gender === "they"? "suck" : "sucks") + ".");
                        $(this).css("color", page_color);
                    });
                }, 4000);

                // update number at bottom of page
                $("#number").text(String(parseInt($("#number").html(), 10) + 1));
                $("#number").css({
                    color: shade(page_color, 0.9)
                });
                textCountTimeout = setTimeout(function(){
                    $('#number').fadeOut(400, function() {
                        $(this).css({
                            color: shade(page_color, -0.4)
                        }).fadeIn(400);
                    });
                }, 1250);

            }).fail(function(jqXHR, textStatus, errorThrown) {
                // get rate limited bitch
                if (errorThrown === "TOO MANY REQUESTS") {
                    rateLimited = true;
                    $("h2").text("You've been sending too many texts! Come back later\u2014or tell your friends.");
                    simmerDown();
                }
            });

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
        $('h1, h2, footer').css({
            color: shade(page_color, 0.9)
        });
        $('a, .alert, #link-container').css({
            color: page_color
        });
        $('#text-count > div, #number').css({
            color: shade(page_color, -0.4)
        });
        $('a').mouseover(function(){
            $(this).css({color: shade(page_color, 0.3)})
        }).mouseout(function() {
            $(this).css({color: page_color})            
        });
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
            $(this).text(getTestimonial());
        }).animate({'opacity': 1}, 1000);

    }, 6000);

    $(".close").click(function() {
        $(".alert-container").css({display: "none"});
    })

    function modalClose ( event ) {
        $("#modal-backdrop").fadeOut(200, function() {
            $(this).css({display: 'none'});
        });
    }

    //can only close after 1.5sec
    setTimeout(function() {
        // close modal by clicking on X
        $("#modal-close").click(modalClose);

        // close modal by clicking on the overlay
        $("#modal-backdrop").click(function( e ) {
            if (e.target == document.getElementById("modal").parentNode) {
                modalClose( e );
            }
        });

        // close modal with escape key
        $(document).keyup(function(e) { 
            if (e.keyCode == 27) { 
                modalClose(e);
            } 
        });
    }, 1500);

    // adding in text-count to footer & correcting padding
    $('footer').append('<div id="text-count"><div id="number">' + text_count + '</div><div>texts have been sent to ' + first_name + '\'s phone.</div></div>');
    setColors();
    $('.content').css({paddingBottom: "180px"});

});