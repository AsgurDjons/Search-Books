import { makeAutoObservable, runInAction } from "mobx";

class Books {
  array = []
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
      fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:"${this.searchParams.books}"
    ${
        this.searchParams.categories !== "all"? "+subject:" + this.searchParams.categories:
          ""
      }&maxResults=30&orderBy=${
        this.searchParams.sorting
      }
    `)
        .then(response =>  response.json())
        .then( json =>  {
          runInAction(() => {
            this.count = json.totalItems
            this.count !== 0? (this.array = [... json.items]):( this.array = [])
            this.toggleDescr.toggle = false
          })
        })
    }catch (e) {
      console.log(e)
    }
  }
  fetchMoreArray() {
    try {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:"
    ${this.searchParams.books}
    "+subject:"
    ${this.searchParams.categories}
    &startIndex=
    ${this.array.length}
    &maxResults=30
    &orderBy=
    ${this.searchParams.sorting}
    `)
        .then(response => response.json())
        .then( json =>  {
          runInAction(() => {
            console.log(json)
            this.array = [...this.array, ... json.items]
          })
        })
    } catch (e) {
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
