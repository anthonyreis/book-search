const main = document.querySelector('.main-content')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

function clearElements(className) {
    const arrHtml = document.getElementsByClassName(className);
    const arrTags = document.getElementsByTagName('br');

      while (!!arrHtml.length) {
        arrHtml[0].parentNode.removeChild(arrHtml[0])
      }

      while (!!arrTags.length) {
        arrTags[0].parentNode.removeChild(arrTags[0])
      }
}

main.addEventListener('submit', (e) => {
    e.preventDefault()

    const bookInfo = search.value

    messageOne.textContent = 'Loading...'

    clearElements('album py-5 bg-light')
    
    window.location = "/searchBook?bookInfo=" + bookInfo;
})
