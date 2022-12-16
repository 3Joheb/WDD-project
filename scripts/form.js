//identifying each ID needed for the form validation//
const form = document.getElementById('form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const home = document.getElementById('home');
const second = document.getElementById('second');
const third = document.getElementById('third');
const pick1 = document.getElementById('pick1');
const pick2 = document.getElementById('pick2');
const pick3 = document.getElementById('pick3');
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const choice3 = document.getElementById('choice3');
const choice4 = document.getElementById('choice4');
const choice5 = document.getElementById('choice5');
const drop = document.getElementById('drop');
const quantity = document.getElementById('quantity');
//altering the effect of the button so that it doesn't automatically submit evrytime it's clicked//	
form.addEventListener('submit', (e) => {
	
	
	e.preventDefault()			
		checkInputs();
});
//using trim so that spaces don't count as characters//			
function checkInputs() {
	const fnameValue = fname.value.trim();
	const lnameValue = lname.value.trim();
	const homeValue = home.value.trim();
	const secondValue = second.value.trim();
	const thirdValue = third.value.trim();
	const pick1Value = pick1.value.trim();
	const pick2Value = pick2.value.trim();
	const pick3Value = pick3.value.trim();
	const choice1Value = choice1.value.trim();
	const choice2Value = choice2.value.trim();
	const choice3Value = choice3.value.trim();
	const choice4Value = choice4.value.trim();
	const choice5Value = choice5.value.trim();
	const dropValue = drop.value.trim();
	const quantityValue = quantity.value.trim();
//the set conditions for if the input shows up correct or incorrect//				
	if(fnameValue === '') {
		setErrorFor(fname, 'Invalid First Name');
	} 
	else{
		setSuccessFor(fname);
	}
	if(lnameValue === '') {
		setErrorFor(lname, 'Invalid Last Name');
	} 
	else{
		setSuccessFor(lname);
	}
	if(home.checked || second.checked || third.checked){
		setSuccessFor(third);
	} 
	else{
		setErrorFor(third, 'Invalid option');
	}
	if(pick1.checked || pick2.checked || pick3.checked){
		setSuccessFor(pick3);
	} 
	else{
		setErrorFor(pick3, 'Invalid option');
	}
	if(choice1.checked || choice2.checked || choice3.checked ||  choice4.checked ||  choice5.checked){
		setSuccessFor(choice5);
	} 
	else{
		setErrorFor(choice5, 'Invalid option');
	}
	if(drop.value == "0"){
		setErrorFor(drop, 'Invalid option');
	} 
	else{
		setSuccessFor(drop);
	}
	if(quantity.value == 0){
		setErrorFor(quantity, 'Invalid score');
	} 
	else{
		setSuccessFor(quantity);
	}
	
}
//controls the exclamtion mark icon that shows up and allows for custom error messages if the input is incorrect//
function setErrorFor(input, message){
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	small.innerText = message;
	formControl.className = 'form-control error';
}
//controls the check mark that shows up if the input is correct//
function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
//https://www.youtube.com/watch?v=rsd4FNGTRBw&t=1013s validation inspiration//
