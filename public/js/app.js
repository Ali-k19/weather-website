console.log('client side js file is loaded')

//Selecting elements by there name
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')
//Changing the text of the property
//messageOne.textContent

//event listener on the form if submitted
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevent the browser from refreshing after hitting submit (It's default behavior)

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    //Not accessable in node js cant use it there
    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
}) 

