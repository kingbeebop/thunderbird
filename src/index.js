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
const gameData = {}
let currentTime = 0

setPerson()

runGame()



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

function runGame(){
    currentTime ++
    gameText.textcontent = gameData.intoText
    gameData.game[`${currentTime}`].buttons.forEach(button =>{
        let newButton = document.createElement('btn')
        newButton.textContent = button.text
        newButton.addEventListener('click',()=>{
            person.mood += button.value
            runGame()
        })
        gameButtons.appendChild(newButton)
    })

}