$(function () {

	var count = 0
	/*variables here store the three templates for Handlebars*/
	var templatePrevious = Handlebars.compile($('#previous').html());
	var templateCurrent = Handlebars.compile($('#current').html());
	var templateNext = Handlebars.compile($('#next').html());

	function render () {
		$.ajax({
			url:"/data/eta.json"
		}).done(function(array){
			$('.previous').fadeOut(500, function(){
				$(this).html(templatePrevious(array[count-1]));
			}).fadeIn(500);
			$('.next').fadeOut(500, function(){
				$(this).html(templateNext(array[count+1]));
			}).fadeIn(500);
			$('.current').fadeOut(500, function(){
				$(this).html(templateCurrent(array[count]));
			}).fadeIn(500);
		});
	};

	render();

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
			count++;
			if (count==21) {
				count=0;
				render();
			}else{
				render();
			};
		}, 10000)
	});	

	$('.next').on('click', function() {
		count++;
		if (count==21) {
			count=0;
			render();
		}else{
			render();
		};
		clearInterval(slideShow);
		slideShow = setInterval(function(){
			count++;
			if (count==21) {
				count=0;
				render();
			}else{
				render();
			};
		}, 10000)
	});	

	var slideShow = setInterval(function(){
		count++;
		if (count==21) {
			count=0;
			render();
		}else{
			render();
		};
	}, 10000)
})