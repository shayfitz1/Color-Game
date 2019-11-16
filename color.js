const tryAgainOrCorrect = document.querySelector("#tryAgainOrCorrect")
let colorDisplay = document.querySelector("#colorDisplay")
const square = document.querySelectorAll(".square");
const container = document.querySelector("#container");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const difficulty = document.querySelectorAll(".difficulty");
let numSquares = 6;
let colors = generateRandomColors(numSquares);
let winColor = pickColor();


//adds selected difficulty class to the difficulty
//if easy, shows 3 squares
//if difficult, shows 6 squares
for (let i = 0; i < difficulty.length; i++){
    difficulty[i].addEventListener("click", function(){
        difficulty[0].classList.remove("selectedDifficulty");
        difficulty[1].classList.remove("selectedDifficulty");
        this.classList.add("selectedDifficulty");
        this.textContent === "Easy" ? numSquares = 3 : numSquares = 6
        reset();
    });
}

//resets the game whenever someone clicks on Easy or Hard.
function reset(){
    resetButton.textContent = "New Colors";
    tryAgainOrCorrect.textContent = "";
    //generate new colors
    colors = generateRandomColors(numSquares);
    //pick a new random color
    winColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent = winColor;
    //change colors of the squares
    //if colors[i] exists, add colors to the squares and display them as block
    //if colors[i] does not exist (bottom row for easy mode), display none for those that don't exist
    for(let i = 0; i < square.length; i++){
        if (colors[i]){
            square[i].style.backgroundColor = colors[i];
            square[i].style.display = "block";
        } else {
            square[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
    hard.classList.add("selectedDifficulty");
    easy.classList.remove("selectedDifficulty");
}

resetButton.addEventListener("click", reset);


//displays the RGB syntax in the header
colorDisplay.textContent = winColor;

for(let i = 0; i < square.length; i++){
    //add colors to squares
    square[i].style.backgroundColor = colors[i];
    square[i].addEventListener("click", function(){
        //the color of the square that you click is saved as a variable 
        //the variable is then compared to the computers win color
        let clickedColor = this.style.backgroundColor;
        if (clickedColor === winColor){
            tryAgainOrCorrect.textContent = "Correct";
            changeColors(winColor);
            h1.style.backgroundColor = winColor;
            resetButton.textContent = "Play Again?";
        } else {
            this.style.backgroundColor = "#232323";
            tryAgainOrCorrect.textContent = "Try Again";
        }
    })
}

//changes the color of all the squares to the same color (aka winning color)
function changeColors(color){
    for (let i = 0; i < square.length; i++){
        square[i].style.backgroundColor = color;
    }
}

//random color that computer picks at the beginning of round
function pickColor(){
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

//generates random colors into an array,
//accepting num as an argument that determines how many squares (6 or 3)
function generateRandomColors(num){
    let arr = []
    for (let i = 0; i < num; i++){
        //get random color and push into array num times
        arr.push(randomColor());
    }
    //return array
    return arr;
}

//returns random RGB color
function randomColor(){
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}