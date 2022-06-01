
//set global variables
const person = {
    name: 'sara',
    likes: ['one','two','three'],
    image: 'https://thispersondoesnotexist.com/image',
    blabber: "I love myself",
    mood: 50
}
const displayTitle = document.getElementById("title")
const displayImage = document.getElementById("image")
const displayBlabber = document.getElementById('blabber')
const gameText = document.getElementById('game-text')
const gameButtons = document.getElementById('game-buttons')
let currentTime = 0

//fetch data and initiate game
fetch("http://localhost:3000/game")
.then(res=>res.json())
.then(data => {
    setPerson()
    runGame(data)
})

//render graphics
function render(){
    displayTitle.textContent = person.name
    displayImage.src = person.image
}

//generage new random person
function setPerson(){
  fetch('https://random-data-api.com/api/name/random_name')
  .then(res=>res.json())
  .then(json=>{
      person.name = json.name
      //TODO: randomize this
      fetch("http://localhost:3000/likes")
      .then(res=>res.json())
      .then(allLikes => {

          //set random interests
        let food = allLikes.food[Math.floor(Math.random()*allLikes.food.length)]
        let day = allLikes.day[Math.floor(Math.random()*allLikes.day.length)]
        let night = allLikes.night[Math.floor(Math.random()*allLikes.night.length)]
        person.likes = [food, day, night]

        //randomize starting mood
        person.mood = Math.random() * 100
        render(person)
      })
  })
  
}

//game engine:
function runGame(gameData){
 
    if(!gameData[currentTime]){
        endGame()
        return
    }

    //get current game paragraph
    console.log(gameData[currentTime].text)
    gameText.textContent = gameData[currentTime].text

    //set up interface:
    clearButtons()

    //populate new game options

    setButtons(gameData)
    // let turn = gameData[currentTime].options

    // turn.forEach(option =>{
    //     let newButton = document.createElement('btn')
    //     newButton.textContent = option
    //     newButton.addEventListener('click',()=>{
    //         likeCheck(option)
    //         runGame(gameData)
    //     })
    //     gameButtons.appendChild(newButton)
    // })

    //move to next game time interval
    currentTime ++

}

//endgame
function endGame(){
    let mood = person.mood
    if(mood>80){
        gameText.textContent = `${person.name} had a really great day!  Thanks for everything!`
    }
    else if(mood>60){
        gameText.textContent = `${person.name} had an OK day!  Thanks for playing.`
    }
    else if(mood>40){
        gameText.textContent = `${person.name}'s day was alright.  Thanks, I guess.`
    }
    else if(mood>20){
        gameText.textContent = `${person.name} had a pretty middling day.  Whatever.`
    }
    else{
        gameText.textContent = `${person.name} had an absolutely awful day.  Thanks for nothing, jerk.`

    }

    //create a reset button
    clearButtons()
    let resetButton = document.createElement('btn')
    resetButton.addEventListener('click',()=>{
        window.location.reload()
    })
    resetButton.textContent = 'TRY AGAIN'
    gameButtons.appendChild(resetButton)
}

//checks if an option matches person's interests 
function likeCheck(option){
    console.log(option)
    //if the button option is 'next', do nothing
    if(option.toLowerCase() == "next"){
        return
    }
    //if button matches any of person's interests, add to mood
    person.likes.forEach(like => {
        if(like == option){
            person.mood += 25
            return
        }
    })
    person.mood -= 25
}

//clears game console
function clearButtons(){
    while(gameButtons.firstChild){
        gameButtons.removeChild(gameButtons.firstChild)
    }
}

//sets up game buttons
function setButtons(gameData){
    let allOptions = gameData[currentTime].options

    let options = [...allOptions]

    options = options.sort(()=>{
        .5 * Math.random()
    })

    options = options.slice(0,3)

    if(!optCheck(options)){
        person.likes.forEach(like => {
            allOptions.forEach(option =>{
                if(like == option){
                    options[0] = like
                    options = options.sort(()=>{.5*Math.random()})
                }
            })
        })
    }



    options.forEach(option =>{
        let newButton = document.createElement('btn')
        newButton.textContent = option
        newButton.addEventListener('click',()=>{
            likeCheck(option)
            runGame(gameData)
        })
        gameButtons.appendChild(newButton)
    })
}

//opttion checker

function optCheck(options){
    options.forEach(option =>{
        person.likes.forEach(like=>{
            if(option == like){
                return true
            }
        })
    })
    return false
}