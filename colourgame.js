// Variables to be used
var numSquares = 6;

var colours = [];

var pickedColour;

var squares = document.querySelectorAll(".square");

var colourDisplay = document.querySelector("#colourDisplay");

var messageDisplay = document.querySelector("#message");

var h1 = document.querySelector("h1");

var resetButton = document.querySelector("#reset");

var modeButtons = document.querySelectorAll(".mode");

init();

// adds the class selected so the correct button gets selected
for (var i = 0; i < modeButtons.length; i++) {
	modeButtons[i].addEventListener("click", function() {
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		if (this.textContent === "Easy") {
			numSquares = 3;
		} else {
			numSquares = 6;
		}
		reset();
	});
}

// reset button
resetButton.addEventListener("click", function() {
	reset();
});

// FUNCTIONS //
function changeColours(colour){
	// loop through all squares
	for (var i = 0; i < squares.length; i++) {
	// change each colour to match given colour
	squares[i].style.backgroundColor = colour;
	}
}

// select a random colour
function pickColour() {
	 var random = Math.floor(Math.random() * colours.length);
	 return colours[random];
}

function generateRandomColours(num) {
	// make an array
	var arr = [];
	// repeat num times
	for (var i = 0; i < num; i++) {
		// get random colour and push into array
		arr.push(randomColour());
	}
	// return that array
	return arr;
}

function randomColour() {
	// pick a red from 0 - 255
	 var r = Math.floor(Math.random() * 256);	
	// pick a green form 0 - 255
	 var g = Math.floor(Math.random() * 256);
	// pick a blue from 0 - 255
	 var b = Math.floor(Math.random() * 256);
	// result in a long af string
	return "rgb(" + r + "," + " " + g + "," + " " + b + ")";
}

function reset() {
	// generate all new colours
	colours = generateRandomColours(numSquares);
	// pick a new colour from our array
	pickedColour = pickColour();
	// change colorDisplay to match picked colour
	colourDisplay.textContent = pickedColour;
	resetButton.textContent = "New Colours";
	// change colours of the squares
	for (var i = 0; i < squares.length; i++) {
		if (colours[i]) {
			squares[i].style = "block";
			squares[i].style.backgroundColor = colours[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
}

function init() {
	setupModeButtons();
	setupSquares();
	reset();
}

// set up the mode buttons
function setupModeButtons (){
		// mode buttons event listeners 
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numSquares = 3;
			} else {
				numSquares = 6;
			}
			reset();
		});
	}
}

// setting up the square logic
function setupSquares() {
	for (var i = 0; i < squares.length; i++) {
		// add click listener to the squares
		squares[i].addEventListener("click", function() {
		// grab colour of clicked square
		var clickedColour = this.style.backgroundColor;
		// compare colour to the picked square
		if(clickedColour === pickedColour){
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play again?";
			changeColours(clickedColour);
			h1.style.backgroundColor = clickedColour;
		} else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
			}
		});
	}
}