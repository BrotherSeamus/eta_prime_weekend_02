$(function () {

	var count = 0

	var templatePrevious = Handlebars.compile($('#previous').html());
	var templateCurrent = Handlebars.compile($('#current').html());
	var templateNext = Handlebars.compile($('#next').html());

	function render () {
		$.ajax({
			url:"/data/eta.json"
		}).done(function(array){
			$('.previous, .current, .next').empty();
			$('.previous').append(templatePrevious(array[count-1]));
			$('.next').append(templateNext(array[count+1]));
			$('.current').append(templateCurrent(array[count]));
		});
	};
	
	render();


	$('.previous').on('click', function() {
		count--;
		if (count<0){
			alert("No, bad, go the other way!");
		}else{
		render();
	}
		
	})	

	$('.next').on('click', function() {
		count++;
		if (count==21) {
			alert("No, bad, go the other way!");
		}else{
			render();
		}
	})	
})