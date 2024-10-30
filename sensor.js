var building = document.getElementById('building');
var floorQue = 0; // Sets a queue to label floors

// Function to create a new floor
function newFloor() {
    // Create the new floor div
    var newFloor = document.createElement('div');
    newFloor.classList.add('floor');
    newFloor.setAttribute('id', 'floor' + floorQue);
    building.appendChild(newFloor);

    // Add items to the new floor
    addFloorItems(newFloor);

    // Update all floor labels
    updateFloorLabels();

    floorQue += 1; // Increment unique ID counter
}

// Function to add floor items (controls, sensors)
function addFloorItems(floorDiv) {
    // Create control section for the floor
    var newFctrl = document.createElement('div');
    newFctrl.classList.add('floorCtrl');
    floorDiv.appendChild(newFctrl);

    // Adds the remove button
    var newRemBtn = document.createElement('button');
    newRemBtn.innerText = 'x';
    newRemBtn.setAttribute('onclick', 'remFloor(event)');
    newRemBtn.setAttribute('id', 'remFloor');
    newFctrl.appendChild(newRemBtn);

    // Adds a title 
    var newFtitle = document.createElement('p');
    newFtitle.classList.add('floorTitle');
    newFctrl.appendChild(newFtitle);

    // Adds fire, smoke, and heat elements
    addElement(floorDiv, 'Fire', 0);
    addElement(floorDiv, 'Smoke', 0);
    addElement(floorDiv, 'Heat', 0);
}

// Function to add a sensor (Fire, Smoke, Heat) to a floor
function addElement(parentDiv, type, count) {
    var newDiv = document.createElement('div');
    newDiv.classList.add('element');
    parentDiv.appendChild(newDiv);

    var divType = document.createElement('p');
    divType.innerText = type;
    newDiv.appendChild(divType);
    
    var divCount = document.createElement('p');
    divCount.innerText = count;
    divCount.classList.add('count');
    newDiv.appendChild(divCount);

    var countAdd = document.createElement('button');
    countAdd.innerText = '+';
    countAdd.setAttribute('onclick', 'addCount(this)');
    newDiv.appendChild(countAdd);

    var countMin = document.createElement('button');
    countMin.innerText = '-';
    countMin.setAttribute('onclick', 'minCount(this)');
    newDiv.appendChild(countMin);
}

// Function to remove a floor
function remFloor(event) {
    var remBtn = event.target;
    var floorDiv = remBtn.closest('.floor');
    floorDiv.remove();

    // After removing the floor, update all floor labels again
    updateFloorLabels();
}

// Function to update the floor labels (titles)
function updateFloorLabels() {
    var floors = document.querySelectorAll('.floor'); // Get all floors

    // Loop through the floors and update their titles based on current position
    floors.forEach((floor, index) => {
        var titleElement = floor.querySelector('.floorTitle');
        titleElement.innerText = 'Floor ' + (index + 1); // Floors start at 1, not 0
    });
}

// Function to increment the count for a sensor
function addCount(button) {
    // Get the parent div of the clicked button (which is the 'element' div)
    var parentDiv = button.parentElement;

    // Find the paragraph element that holds the count ('.count')
    var countElement = parentDiv.querySelector('.count');

    // Get the current count value, increment it, and update the text
    var currentCount = parseInt(countElement.innerText);
    countElement.innerText = currentCount + 1;
}

// Function to decrement the count for a sensor
function minCount(button) {
    var parentDiv = button.parentElement;
    var countElement = parentDiv.querySelector('.count');
    var currentCount = parseInt(countElement.innerText);
    countElement.innerText = currentCount > 0 ? currentCount - 1 : 0;
}

// Function to save the current state of the building to localStorage
function saveFloors() {
    var floorsData = [];
    var floors = document.querySelectorAll('.floor');

    floors.forEach(floor => {
        var floorInfo = {
            title: floor.querySelector('.floorTitle').innerText, // Save the floor title
            elements: [] // Store elements (fire, smoke, heat)
        };

        // Capture each sensor's data (Fire, Smoke, Heat)
        var elements = floor.querySelectorAll('.element');
        elements.forEach(element => {
            var type = element.querySelector('p').innerText; // Sensor type (Fire, Smoke, Heat)
            var count = parseInt(element.querySelector('.count').innerText); // Sensor count
            floorInfo.elements.push({ type: type, count: count });
        });

        floorsData.push(floorInfo); // Add floor info to floorsData array
    });

    // Save floorsData array in localStorage as a JSON string
    localStorage.setItem('floors', JSON.stringify(floorsData));
}

// Function to load the saved floors from localStorage
function loadFloors() {
    var savedFloors = localStorage.getItem('floors'); // Get saved data from localStorage
    if (savedFloors) {
        var floorsData = JSON.parse(savedFloors); // Parse JSON back into JavaScript object

        // Reset floorQue to match the number of floors loaded
        floorQue = floorsData.length;

        floorsData.forEach(floorInfo => {
            // Create a new floor div
            var newFloor = document.createElement('div');
            newFloor.classList.add('floor');
            building.appendChild(newFloor);

            // Add control section and title
            addFloorItems(newFloor);
            
            // Update the floor title with the saved title
            var titleElement = newFloor.querySelector('.floorTitle');
            titleElement.innerText = floorInfo.title;

            // Add elements with the correct counts
            var elements = newFloor.querySelectorAll('.element');
            elements.forEach((element, index) => {
                var type = floorInfo.elements[index].type; // Load sensor type (Fire, Smoke, Heat)
                var count = floorInfo.elements[index].count; // Load sensor count

                // Update the type and count for each element
                var typeElement = element.querySelector('p');
                var countElement = element.querySelector('.count');

                typeElement.innerText = type; // Update the sensor type (Fire, Smoke, Heat)
                countElement.innerText = count; // Update the sensor count
            });
        });

        // Update the floor labels
        updateFloorLabels();
    }
}

// Call loadFloors when the page loads to restore previous state
window.onload = function() {
    loadFloors();
};

// Call saveFloors before the user leaves the page
window.onbeforeunload = function() {
    saveFloors();
};

function logOut(){
    window.location.href = "index.html";
}