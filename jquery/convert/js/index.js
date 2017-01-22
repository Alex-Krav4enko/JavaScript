$.get('http://university.netology.ru/api/currency', function(data){
	
	var objCurrent = data;

	var formList = $('.form__list');
	var formInput = $('.form__input');
	var formCurrent = $('.form__current');

	var j;
	var cloneLi;

	var digits = '0123456789.,';

	formInput[0].value = 1;

	var newLi = document.createElement('li');
	$(newLi).addClass('form__item');


	function hideList() {
		$(formList).each(function(indx, elem){
			$(elem).hide();
		});
	}

	function charCodeList(numberOfList) {
		objCurrent.forEach(function(elem, indx) {
			cloneLi = newLi.cloneNode(true);
			cloneLi.textContent = elem.CharCode; 
			formList[numberOfList].appendChild(cloneLi);
		});
	}

	function calcCurrency() {
		var valueFirst;
		var valueSecond;
		
		objCurrent.forEach(function (elem) {
			if (elem.CharCode == formCurrent[0].textContent) {
				valueFirst = elem.Value;
			} 
			
			if (elem.CharCode == formCurrent[1].textContent) {
				valueSecond = elem.Value;
			} else if (formCurrent[1].textContent == 'RUB') {
				valueSecond = 1;
			}
		}); 
		
		formInput[1].value = valueFirst * formInput[0].value / valueSecond;
	}

	function delLetter () {
		var i;
		var inputVal = '';

		for (i = 0; i < this.value.length; i++){
			if (digits.indexOf(this.value[i]) != -1) {
				inputVal += this.value[i];
			}
		}

		this.value = inputVal.split(',').join('.');

		if (this.value.split('.').length > 2) {
			inputVal = this.value.split('.'); 
			this.value = inputVal[0] + '.' + inputVal[1];
		}
	}

	$(document).on('click', function(e) {
		var target = e.target;
		
		if (target.className == 'form__current') {
			hideList();
			$(target).next().show();
		} else if (target.className == 'form__item') {
			hideList();
			target.parentElement.previousElementSibling.textContent = target.textContent;
			calcCurrency();
		} else { 
			hideList();
		}
	});

	calcCurrency();

	$(formList).each(function(indx){
		 charCodeList(indx);
	});

	$(formInput).each(function(indx){
		$(this).on('input', delLetter).on('input', calcCurrency);
	});
 
});