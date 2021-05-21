const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const bookInfo = search.value

    messageOne.textContent = 'Loading...'

    fetch('/searchBook?bookInfo='+ bookInfo).then((response) => {
        response.json().then((data) => {
            urls = String(data).split(',')
            if (data.error){
                var par = document.createElement('p')
                par.textContent = data.error
                document.body.appendChild(par)
            } else {
                urls.forEach((item) => {
                    var par = document.createElement('a')
                    par.href = item
                    par.innerText = item
                    par.target = '_blank'
                    document.body.appendChild(par)
                    var par = document.createElement('br')
                    document.body.appendChild(par)
                })
            }
        })
    })
})