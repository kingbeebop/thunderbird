const person = {
    name: 'sara',
    likes: ['one','two','three'],
    image: 'https://thispersondoesnotexist.com/image',
    blabber: "I love myself",
    mood: 50
}
const displayTitle = document.getElementById("title")
const displayImage = document.getElementById("image")

setPerson()

render()




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