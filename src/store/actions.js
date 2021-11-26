import {makeAutoObservable, runInAction, toJS} from "mobx";

class Books {
  arrayBooks = []
  count = 0
  toggleDescr = {
    toggle: false,
    id: ''
  }
  searchParams = {
    books: '',
    categories: 'all',
    sorting: 'relevance',
  }
  constructor() {
    makeAutoObservable(this)
  }

  fetchArray() {
    try {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle
    "${this.searchParams.books}
    "${this.searchParams.categories !== "all"? "+subject:" + this.searchParams.categories:""}
    &startIndex=0&maxResults=30&orderBy=${this.searchParams.sorting}`)
        .then(response =>  response.json())
        .then( json =>  {
          runInAction(() => {
            this.count = json.totalItems
            this.count !== 0? (this.arrayBooks = [... json.items]):( this.arrayBooks = [])
            this.toggleDescr.toggle = false
          })
        })
    }catch (e) {
      console.log(e)
    }
  }

  fetchMoreArray() {
    try {
      console.log(toJS(this.searchParams))
      console.log(this.arrayBooks.length)
      fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle
    "${this.searchParams.books}
    "${this.searchParams.categories !== "all"? "+subject:" + this.searchParams.categories:""}
    &startIndex=${this.arrayBooks.length}&maxResults=30&orderBy=${this.searchParams.sorting}`)
        .then(response => response.json())
        .then(json => {
          runInAction(() => {
            if (typeof json.items !== 'undefined'){
              this.arrayBooks = [...this.arrayBooks, ...json.items]
            }
          })
        })
    }catch (e) {
      console.log(e)
    }
  }

  toggleDescription (id = '') {
    this.toggleDescr = {
      toggle: !this.toggleDescr.toggle,
        id: id
    }
  }
   inputBooks (value) {
    this.searchParams.books = value
  }
   inputCategories (value) {
    this.searchParams.categories = value
  }
   inputSorting (value) {
    this.searchParams.sorting = value
  }
  get descrToggle () {
    return this.toggleDescr.toggle
  }
  get descrID () {
    return this.toggleDescr.id
  }

  get booksCount () {
    return this.count
  }
}
export default new Books() ;

