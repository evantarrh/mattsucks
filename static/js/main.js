$().ready(function() {

	$("#matt-sucks").click(function(e) {

		console.log("Matt sucks a whole lot, you are doing god's work");

		$.post("/servo_post");

	});


});