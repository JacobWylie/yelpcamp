const newCampNameForm = document.querySelector('.newCampNameForm');
const newCampName = document.querySelector('input[id="name"]');
const newCampLocationForm = document.querySelector('.newCampLocation');
const newCampLocation = document.querySelector('input[id="location"]');
const newCampPriceForm = document.querySelector('.newCampPrice');
const newCampPrice = document.querySelector('input[id="price"]');
const newCampSummaryForm = document.querySelector('.newCampSummary');
const newCampSummary = document.querySelector('textarea[id="description"]');
const newCampImageForm = document.querySelector('.newCampImage');
const newCampImage = document.querySelector('input[id="image"]');
const submitButton = document.querySelector('.submit')

// Submit button is disabled on load
submitButton.disabled = true;

// Checks form input values 
const checkForm = () => {
	if (newCampName.value !== "" && 
		newCampLocation.value !== "" && 
		newCampPrice.value !== "" && 
		newCampSummary.value !== "" && 
		newCampImage.value !== "") {
		submitButton.disabled = false;
	} else {
		submitButton.disabled = true;
	}
}

newCampName.addEventListener('keyup', function() {
	if (this.value !== '') {
		newCampNameForm.classList.add('has-success');
		this.classList.add('form-control-success');
	} else {
		newCampNameForm.classList.remove('has-success');
		this.classList.remove('form-control-success');
	}
	checkForm();
})

newCampLocation.addEventListener('keyup', function() {
	if (this.value !== '') {
		newCampLocationForm.classList.add('has-success');
		this.classList.add('form-control-success');
	} else {
		newCampLocationForm.classList.remove('has-success');
		this.classList.remove('form-control-success');
	}
	checkForm();
})

newCampPrice.addEventListener('change', function() {
	if (this.value > 0) {
		newCampPriceForm.classList.add('has-success');
		this.classList.add('form-control-success');
	} else {
		newCampPriceForm.classList.remove('has-success');
		this.classList.remove('form-control-success');
	}
	checkForm();
})

newCampSummary.addEventListener('keyup', function() {
	if (this.value !== '') {
		newCampSummaryForm.classList.add('has-success');
		this.classList.add('form-control-success');
	} else {
		newCampSummaryForm.classList.remove('has-success');
		newCampSummary.classList.remove('form-control-success');
	}
	checkForm();
})

newCampImage.addEventListener('keyup', function() {
	if (this.value !== '') {
		newCampImageForm.classList.add('has-success');
		this.classList.add('form-control-success');
	} else {
		newCampImageForm.classList.remove('has-success');
		this.classList.remove('form-control-success');
	}
	checkForm();
})


