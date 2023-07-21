/*----- constants -----*/
const options = {
    games: ["Diablo", "GTA", "Mafia", "Halo", "Poker", "Chess"],
    animals: ["Sabrecat", "Rhinoceros", "Pidgeon", "Crocodile", "Dog", "Cat"],
    languages: ["English", "Mandarin", "Arabic", "Hindi", "Spanish", "French"]
};

/*----- state variables -----*/
// Count
let winCount = 0;
let count = 0;

let chosenWord = "";

/*----- cached elements  -----*/
const letterContainer = document.getElementById("letterBox");
const optionsContainer = document.getElementById("selectOptions");
const userInputSection = document.getElementById("userInput");
const newGameContainer = document.getElementById("newGameShow");
const newGameButton = document.getElementById("newGameButton");
const spaceShip1 = document.getElementById("partOne");
const spaceShip2 = document.getElementById("partTwo");
const spaceShip3 = document.getElementById("partThree");
const spaceShip4 = document.getElementById("partFour");
const spaceShip5 = document.getElementById("partFive");
const resultText = document.getElementById("gameDecision");

/*----- event listeners -----*/
// Initial Function 
const initializer = () => {
    winCount = 0;
    count = 0;
  
    // Initially erase all content and hide letters and new game button
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    spaceShip1.classList.add("hide");
    spaceShip2.classList.add("hide");
    spaceShip3.classList.add("hide");
    spaceShip4.classList.add("hide");
    spaceShip5.classList.add("hide");
    letterContainer.innerHTML = "";
  
    // For creating letter buttons
    for (let i = 65; i < 91; i++) {
      let button = document.createElement("button");
      button.classList.add("letters");
      // Number to ASCII[A-Z]
      button.innerText = String.fromCharCode(i);
      // Character button click
      button.addEventListener("click", () => {
        let charArray = chosenWord.split("");
        let dashes = document.getElementsByClassName("dashes");
        // If array contains clicked value replace the matched dash with letter else input a space part
        if (charArray.includes(button.innerText)) {
          charArray.forEach((char, index) => {
            // If character in array is same as clicked button
            if (char === button.innerText) {
              // Replace dash with letter
              dashes[index].innerText = char;
              // Increment counter
              winCount += 1;
              // If winCount equals word length
              if (winCount == charArray.length) {
                resultText.innerHTML = `<h2 class='winMessage'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                // Block all buttons
                blocker();
              }
            }
          });
        } else {
          // Lose count
          count += 1;

          // For drawing spaceship
          if (count == 1) {
            spaceShip1.classList.remove('hide');
          } else if (count == 2) {
            spaceShip2.classList.remove('hide');
          } else if (count == 3) {
            spaceShip3.classList.remove('hide');
          } else if (count == 4) {
            spaceShip4.classList.remove('hide');
          } else if (count == 5) {
            spaceShip5.classList.remove('hide');
          }

          // Count==5 Since there are 5 parts of the spaceship
          if (count == 5) {
            resultText.innerHTML = `<h2 class='loseMessage'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
            blocker();
          }
        }
        //Disable clicked button
        button.disabled = true;
      });
      letterContainer.append(button);
    }
  
    displayOptions();
};

/*----- functions -----*/
// Display option buttons
const displayOptions = () => {
    optionsContainer.innerHTML += `<h3>Select A Subject!</h3>`;
    let buttonContainer = document.createElement("div");
    for (let value in options) {
      buttonContainer.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }
    optionsContainer.appendChild(buttonContainer);
  };

// Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");

  // Disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  // Disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

// Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");

  // If optionValue matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  // Initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  // Choose random word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  // Replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  // Display each element as span
  userInputSection.innerHTML = displayItem;
};

// New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;