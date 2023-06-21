// Declaring global variables
const highScore = document.querySelector('#detail-high-score')
let currentGame

// Fetching data from db.json file
fetch('http://localhost:3000/games')
.then(res => res.json())
.then(data => {
    // Looping through data array
    // For each object calling loadMenu function (and passing it that object)
    data.forEach(item => loadMenu(item))
    // Passing the first object from db.json to displayItem function to render it once the page loads
    displayItem(data[0])
})
.catch(err => console.log(`💥 ERROR from the fetch to /games: ${err}`))

// Function that displays all the games in the menu
function loadMenu(item) {
    // Get element with class 'game-list'
    const menu = document.querySelector('.game-list')
    // Create h5 element
    const h5 = document.createElement('h5')
    // Assign content to h5 element
    h5.innerText = `${item.name} (${item.manufacturer_name})`
    // Append h5 to the menu
    menu.appendChild(h5)
   // Add 'click' event listener to every menu element
   // call displayItem function and pass it the item(object)
    h5.addEventListener('click', () => displayItem(item))
}

// Function that displays detailed info about the game
function displayItem(game) {
    // Assigning game to currentGame(to fake persisting of the score)
    currentGame = game
    // Get elements to display title and image
    const title = document.querySelector('#detail-title')
    const image = document.querySelector('#detail-image')

    // Assign content, src to elements
    title.textContent = game.name
    image.src = game.image
    highScore.textContent = game.high_score
}

// Function that is called once the form is submitted to update the score
function updateHighScore(e) {
    // 1. Prevent default behavior (page refresh)
    e.preventDefault()
    // 2. Update current game score
    currentGame.high_score = e.target['score-input'].value
    // 3. Update text content of the score element
    highScore.textContent = e.target['score-input'].value
    // 4. Reset the form (not necessary, but sure looks nice 😃)
    e.target.reset()
}

// SOLUTION TO UPDATE HIGH SCORE BY ADDING UP NUMBERS
// function updateHighScore(e) {
//     // 1. Prevent default behavior (page refresh)
//     e.preventDefault()
//     // 2. Get score from input
//     const score = e.target['score-input'].value
//     // 3. Update current game score by adding previous score and user input
//     currentGame.high_score = parseInt(currentGame.high_score) + parseInt(score)
//     // 4. Update text content of the score element
//     highScore.textContent = currentGame.high_score
//     // 5. Reset the form (not necessary, but sure looks nice 😃)
//     e.target.reset()
// }


// Select form 
// Add 'submit' event listener
// Call updateHighScore function on submit
document.querySelector('#high-score-form').addEventListener('submit', updateHighScore)

