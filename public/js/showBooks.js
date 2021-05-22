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

    /*fetch('/searchBook?bookInfo='+ bookInfo).then((response) => {
        response.json().then((data) => {
            var urls = String(data).split(',')
            if (data.error){
                var par = document.createElement('p')
                par.className = 'link'
                par.textContent = data.error
                main.appendChild(par)
            } else {
                urls.forEach((item) => {
                    /*var div = document.createElement('div');
                    div.className = 'row';
                    var div2 = document.createElement('div');
                    div2.className = 'col-md-4';
                    var div3 = document.createElement('div');
                    div3.className = 'card mb-4 shadow-sm';
                    var div4 = document.createElement('img');
                    div4.className = 'card-img-top';
                    div4.src = '../img/book.jpg'
                    var div5 = document.createElement('div');
                    div5.className = 'card-body';
                    var div6 = document.createElement('h5');
                    div6.className = 'card-title';
                    div6.innerText = 'Book name';
                    var div7 = document.createElement('p');
                    div7.className = 'card-text';
                    div7.innerText = 'Book description ..............';
                    var div8 = document.createElement('div');
                    div8.className = 'd-flex justify-content-between align-items-center';
                    var div9 = document.createElement('div');
                    div9.className = 'btn-group';
                    var div10 = document.createElement('a');
                    div10.className = 'btn btn-primary my-2';
                    div10.href = '../img/book.jpg';
                    var div11 = document.createElement('small');
                    div11.className = 'text-muted';
                    div11.innerText = '9 mins';
                    //div9.appendChild(div11)
                    div9.appendChild(div10)
                    div8.appendChild(div9)
                    div7.appendChild(div8)
                    div6.appendChild(div7)
                    div5.appendChild(div6)
                    div4.appendChild(div5)
                    div3.appendChild(div4)
                    div2.appendChild(div3)
                    div.appendChild(div2)
                    var par = document.createElement('a')
                    par.className = 'link'
                    par.href = item
                    par.innerText = item
                    par.target = '_blank'
                    main.appendChild(par)
                    var par = document.createElement('br')
                    main.appendChild(par)
                })
                messageOne.textContent = ''
            }
        })
    })*/
})