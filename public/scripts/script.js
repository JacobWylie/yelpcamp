const newCampNameForm = document.querySelector('.newCampNameForm');
const newCampName = document.querySelector('input[id="name"]');
const newCampSummaryForm = document.querySelector('.newCampSummary');
const newCampSummary = document.querySelector('textarea[id="campSummary"]');
const newCampImageForm = document.querySelector('.newCampImage');
const newCampImage = document.querySelector('input[id="image"]');

newCampName.addEventListener('keyup', function() {
	if (this.value !== '') {
		newCampNameForm.classList.add('has-success');
		this.classList.add('form-control-success');
	} else {
		newCampNameForm.classList.remove('has-success');
		this.classList.remove('form-control-success');
	}
})

newCampSummary.addEventListener('keyup', function() {
	if (this.value !== '') {
		newCampSummaryForm.classList.add('has-success');
		this.classList.add('form-control-success');
	} else {
		newCampSummaryForm.classList.remove('has-success');
		newCampSummary.classList.remove('form-control-success');
	}
})

newCampImage.addEventListener('keyup', function() {
	if (this.value !== '') {
		newCampImageForm.classList.add('has-success');
		this.classList.add('form-control-success');
	} else {
		newCampImageForm.classList.remove('has-success');
		this.classList.remove('form-control-success');
	}
})