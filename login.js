/***
 * App name: DDS
 * Desc: Admin or User login page
 * 
 * Author: Jamir O.
 * Created: 10\23\24
*/

let uName = document.getElementById('uName');
let email = document.getElementById('email');
let pWord = document.getElementById('pWord');
let errorText = document.getElementById('errorText1');
let nameError = document.getElementById('nameError');
let emailError = document.getElementById('emailError');

let adminLog = document.getElementById('adminLog');

adminLog.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      const pass = "Admin"
      if (adminLog.value === pass){
        window.location.href = "userMan.html";
        adminIn = true
      }
      else if(adminLog.value != pass) {
        alert('Password no correct');
      }
    }
});

let logBtn = document.getElementById('logBtn');

logBtn.addEventListener('click', function(){
    window.location.href = "sensor.html";
})

let state = 0;
function createProfile(){

  if (state === 0) {
    var logPrompt = document.getElementById('logPrompt');
    logPrompt.innerText="Create Your Profile";
  
    var logBtn = document.getElementById('logBtn');
    var or = document.getElementById('or');
    logBtn.style.display="none";
    or.style.display="none";
  
    var conPass = document.createElement('input');
    conPass.setAttribute('placeholder', 'Confirm Password');
    conPass.setAttribute('id', 'pWordCon');

    var errorText2 = document.createElement('p');
    errorText2.classList.add('errorText');
    errorText2.setAttribute('id', 'errorText2');

    var logInfo = document.getElementById('logInfo');
    logInfo.appendChild(conPass);
    logInfo.appendChild(errorText2);

    state = 1;
    console.log(state)
  }

  else {
    let nameValue = uName.value
    let emailValue = email.value

    let pwValue = pWord.value;
    let cpw = document.getElementById('pWordCon');
    let cpwValue = cpw.value;
    let pwLength = pwValue.length;

    // Clear any previous error messages before each validation
    errorText.style.display = 'none';
    let errorText2 = document.getElementById('errorText2');
    errorText2.style.display = 'none';
    
    if (nameValue === ''){
      nameError.innerText = "Don't leave blank."
      nameError.style.display = 'block'
    }

    else {
      nameError.style.display = 'none';
    }

    if (emailValue === ''){
      emailError.innerText = "Don't leave blank."
      emailError.style.display = 'block'
    }

    else{
      emailError.style.display = 'none';
    }
    
    // Condition 1: Check if password is shorter than 16 characters
    if (pwLength < 16) {
      errorText.innerText = "Password must be longer than 16 characters.";
      errorText.style.display = 'block';
    }
    // Condition 2: Check if password contains a special character
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwValue)) {
      errorText.innerText = "Password must contain at least one special character.";
      errorText.style.display = 'block';
    }
    // Condition 3: Check if password contains a number
    else if (!/[0123456789]/.test(pwValue)) {
      errorText.innerText = "Password must contain at least one number.";
      errorText.style.display = 'block';
    }
    // Condition 4: Check if password contains an uppercase letter
    else if (!/[A-Z]/.test(pwValue)) {
      errorText.innerText = "Password must contain at least one uppercase letter.";
      errorText.style.display = 'block';
    }
    // Condition 5: Check if passwords match
    else if (cpwValue !== pwValue) {
      errorText2.innerText = "Passwords must match.";
      errorText2.style.display = 'block';
    }
    // If all conditions are met, hide errors and proceed
    else {
      nameError.style.display = 'none';
      emailError.style.display = 'none';
      errorText.style.display = 'none';
      errorText2.style.display = 'none';
      localStorage.setItem('username', uName.value);
      localStorage.setItem('email', email.value);
      localStorage.setItem('password', pWord.value);
      window.location.href = "sensor.html";
    }
  }
}

