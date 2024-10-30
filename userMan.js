// Variables
var users = document.getElementById("users");
var userQue = 0; // Will be incremented based on how many users are stored

// Creates a new user and adds it to localStorage
function newUser(username = '', password = '') { //the function takes in a username and password

    //these lines adds the elements to the html
    var newUser = document.createElement('div'); 
    newUser.classList.add('userItem');
    newUser.setAttribute('id', 'userItem' + userQue); //names the id based on the userQue (ex: userItem1)
    users.appendChild(newUser); //displays the html

    addUseritems(newUser, username, password); // Pass the username and password
    userQue += 1; 

    saveUsers(); // Saves user to local storage
}

// Add the input fields, buttons, and structure for each user
function addUseritems(userDiv, username, password) {

    //creates a remove button with associated id, class, etc. 
    var newRemBtn = document.createElement('button');
    newRemBtn.classList.add('remBtn');
    newRemBtn.innerText = "X";
    newRemBtn.setAttribute('id', 'userItem' + userQue);
    newRemBtn.setAttribute('onclick', 'remUser(event)');
    userDiv.appendChild(newRemBtn);

    //creates a username input field
    var newUsername = document.createElement('input');
    newUsername.setAttribute('placeholder', 'Enter Username');
    newUsername.setAttribute('id', 'userName' + userQue);
    newUsername.classList.add('usernameInput');
    newUsername.value = username;
    userDiv.appendChild(newUsername);

    //creates a password input field
    var newPass = document.createElement('input');
    newPass.setAttribute('placeholder', 'Create Password');
    newPass.setAttribute('id', 'passWord' + userQue);
    newPass.classList.add('passwordInput');
    newPass.value = password;
    userDiv.appendChild(newPass);

    //creates a reset button
    var newResBtn = document.createElement('button');
    newResBtn.classList.add('resBtn');
    newResBtn.innerText = 'Reset';
    newResBtn.setAttribute('onclick', 'resetFields(event)');
    userDiv.appendChild(newResBtn);

    //creates an update button
    var newUpdBtn = document.createElement('button');
    newUpdBtn.classList.add('updBtn');
    newUpdBtn.innerText = 'Update';
    newUpdBtn.setAttribute('onclick', 'update(event)');
    userDiv.appendChild(newUpdBtn);
}

// Saves the current state of all users to localStorage
function saveUsers() {

    var usersData = []; //creates an empty list to store the data of users
    var allUserDivs = document.querySelectorAll('.userItem'); //grabs all of the users and thier respective divs
    
    //stores the data in a key: value format
    allUserDivs.forEach(function(userDiv) {
        var username = userDiv.querySelector('.usernameInput').value;
        var password = userDiv.querySelector('.passwordInput').value;
        usersData.push({ username: username, password: password });
    });

    localStorage.setItem('users', JSON.stringify(usersData)); // stores the data as a string
}

// Load users on page load
function loadUsers() {
    var storedUsers = JSON.parse(localStorage.getItem('users'));

    if (storedUsers) {
        storedUsers.forEach(function(userData) {
            newUser(userData.username, userData.password); // Recreates each user div on page load
        });
    }
}

// Remove user div 
function remUser(event) {
    var remUser = event.target;
    var userDiv = remUser.parentElement;
    userDiv.remove();
    saveUsers(); // Update localStorage after removing
}

// Update user data 
function update(event) {
    saveUsers(); //saves the updated data to localStorage
}

// Reset input fields
function resetFields(event) {
    var resetButton = event.target;
    var userDiv = resetButton.parentElement;

    userDiv.querySelector('.usernameInput').value = '';
    userDiv.querySelector('.passwordInput').value = '';
}

// On page load, restore users from localStorage
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});


function toSens(){
    window.location.href = "sensor.html";
}