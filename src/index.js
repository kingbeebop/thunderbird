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

fetch("http://localhost:3000/game")
.then(res=>res.json())
.then(data => {
    setPerson()
    runGame(data)
})

function render(){
    displayTitle.textContent = person.name
    displayImage.src = person.image
}

function setPerson(){
  fetch('https://random-data-api.com/api/name/random_name')
  .then(res=>res.json())
  .then(json=>{
      person.name = json.name
      person.likes = ['coffee', 'neo-soul', 'archery']
      person.mood = Math.random() * 100
      render(person)
  })
  
}

//TODO do this part:

function runGame(gameData){
    
    gameText.textcontent = gameData.intoText
    //FIX THIS PART:
    let turn = gameData[currentTime].options
    turn.forEach(option =>{
        console.log("test")
        let newButton = document.createElement('btn')
        newButton.textContent = option
        newButton.addEventListener('click',()=>{
            likeCheck(option)
            runGame(gameData)
        })
        gameButtons.appendChild(newButton)
    })

    currentTime ++

}

function likeCheck(option){
    person.likes.forEach(like => {
        if(like == option){
            person.mood += 10
            return
        }
    })
    person.mood -= 10
}