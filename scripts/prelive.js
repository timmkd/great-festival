$(document).ready(function(){

	var responsiveStates = (function(){
		return {
			init : function(){
				ssm = ssm || {};

				ssm.addStates([
					{
						id :'xs',
						maxWidth: 479
					},
					{
						id :'sm',
						minWidth: 480,
						maxWidth: 767
					},
					{
						id :'md',
						minWidth: 768,
						maxWidth: 991
					},
					{
						id :'lg',
						minWidth: 992
					}] 
					).ready();
				},
				is: function(state){
					var states = ssm.getCurrentStates();
					for ( var prop in states ){
						if (states.hasOwnProperty(prop)){
							if (states[prop].id === state){
								return true;
							}
						}
					}
					return false;

				}
		}
	}());

	responsiveStates.init();

	//CLOSE OVERLAY
	$('.close').on('click',function(e){
		if(responsiveStates.is('md')||responsiveStates.is('lg')){
			e.preventDefault();
			$('.content-overlay').addClass('hidden');
		}
	});

	//OPEN SUBSCRIPTION FORM
	$('.js-register').on('click',function(e){
		if(responsiveStates.is('md')||responsiveStates.is('lg')){
			e.preventDefault();
			$('#register').removeClass('hidden');
		}
	});

	$('#register form').on('submit',function(e){
		if(responsiveStates.is('md')||responsiveStates.is('lg')){
			e.preventDefault();
			if($(this).valid()){
				$('#thankyou').removeClass('hidden');
				$('#register').addClass('hidden');
			}
		}
	}).validate();
});