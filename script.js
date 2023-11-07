const form = document.getElementsByTagName('form')[0]
const author = document.getElementById('author')
const title = document.getElementById('title')
const pages = document.getElementById('pages')
const read = document.getElementById('read')
const tbody = document.getElementsByTagName('tbody')[0]

function Book(id, author, title, pages, read) {
  this.id = id
  this.author = author
  this.title = title
  this.pages = pages
  this.read = read
}

function Library() {
  this.list = [
    {
      id: 1,
      author: 'Danggro',
      title: 'This Is Just Example',
      pages: 50,
      read: false,
    },
  ]
  const localMyLibrary = JSON.parse(localStorage.getItem('myLibrary'))
  if (localMyLibrary) {
    this.list = localMyLibrary
  }

  this.list.forEach((book) => {
    addElementBook(book, book.id)
  })

  this.addBook = function (event) {
    event.preventDefault()
    const book = new Book(
      this.list.length + 1,
      author.value,
      title.value,
      pages.value,
      read.checked
    )

    this.list.push(book)
    addElementBook(book, book.id)
    localStorage.setItem('myLibrary', JSON.stringify(this.list))
  }

  this.deleteBook = function (event) {
    const elementBook = event.target.parentElement.parentElement
    const filteredLibrary = this.list.filter(
      (bookInList) => bookInList.id !== Number(elementBook.dataset.id)
    )
    this.list = filteredLibrary
    localStorage.setItem('myLibrary', JSON.stringify(this.list))
    elementBook.remove()
  }

  this.changeReadBook = function (event) {
    const idBook = Number(event.target.parentElement.parentElement.dataset.id)

    const book = this.list.find((bookInList) => bookInList.id === idBook)

    book.read = !book.read
    const changedLibrary = this.list.map((bookInList) =>
      bookInList.id === idBook ? book : bookInList
    )

    this.list = changedLibrary
    localStorage.setItem('myLibrary', JSON.stringify(this.list))

    event.target.checked
      ? (event.target.previousSibling.textContent = 'Already')
      : (event.target.previousSibling.textContent = 'Not yet')
  }
}

const library = new Library()

function addElementBook(book, id) {
  const tr = document.createElement('tr')
  tr.setAttribute('data-id', id)
  tbody.appendChild(tr)

  const tdAuthor = document.createElement('td')
  const tdTitle = document.createElement('td')
  const tdPages = document.createElement('td')
  const tdRead = document.createElement('td')
  const tdDelete = document.createElement('td')
  const buttonDelete = document.createElement('button')
  buttonDelete.setAttribute('onclick', 'library.deleteBook(event)')
  buttonDelete.innerHTML = 'Delete'
  const checkRead = document.createElement('input')
  checkRead.setAttribute('type', 'checkbox')
  if (book.read) {
    checkRead.setAttribute('checked', '')
  }
  checkRead.setAttribute('onchange', 'library.changeReadBook(event)')

  const textAuthor = document.createTextNode(book.author)
  const textTitle = document.createTextNode(book.title)
  const textPages = document.createTextNode(book.pages + ' page')
  const textRead = document.createTextNode(book.read ? 'Already' : 'Not yet')

  tdAuthor.appendChild(textAuthor)
  tr.appendChild(tdAuthor)
  tdTitle.appendChild(textTitle)
  tr.appendChild(tdTitle)
  tdPages.appendChild(textPages)
  tr.appendChild(tdPages)
  tdRead.appendChild(textRead)
  tdRead.appendChild(checkRead)
  tr.appendChild(tdRead)
  tdDelete.appendChild(buttonDelete)
  tr.appendChild(tdDelete)
}
