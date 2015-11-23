$(function () {

	var count = 0
	/*variables here store the three templates for Handlebars*/
	var templatePrevious = Handlebars.compile($('#previous').html());
	var templateCurrent = Handlebars.compile($('#current').html());
	var templateNext = Handlebars.compile($('#next').html());

	/*Uses Ajax to feed data into Handlebars templates with fade animations*/
	function render () {
		$.ajax({
			url:"/data/eta.json"
		}).done(function(array){
			$('.previous').fadeOut(500, function(){
				$(this).html(templatePrevious(array[count-1]));//renders the previous button
			}).fadeIn(500);
			$('.next').fadeOut(500, function(){
				$(this).html(templateNext(array[count+1]));//renders the next button
			}).fadeIn(500);
			$('.current').fadeOut(500, function(){
				$(this).html(templateCurrent(array[count]));//renders the current info section
			}).fadeIn(500);
		});
	};
	/*Advances through the carousel one step*/
	function advance (){
		count++;
		if (count==21) {
			count=0;
			render();
		}else{
			render();
		};
	};
	/*calls the render function*/
	render();
	/*Event handler for the previous button also resets the setInterval*/
	$('.previous').on('click', function() {
		count--;
		if (count<0){
			count = 20;
			render();
		}else{
		render();
		};
		clearInterval(slideShow);
		slideShow = setInterval(function(){
			advance();
		}, 10000)
	});	
	/*Event handler for the next button also resets the setInterval*/
	$('.next').on('click', function() {
		advance();
		clearInterval(slideShow);
		slideShow = setInterval(function(){
			advance();
		}, 10000)
	});	
	/*Sets the interval for carousel of student data*/
	var slideShow = setInterval(function(){
		advance();
	}, 10000)
})