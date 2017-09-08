import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Book from './Book'
import * as BooksAPI from '../Services/BooksAPI'

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      books: [],
      searchTerms: ''
    }
  }
  
  _handleSearch = ( { target } ) => {
    const searchTerms = target.value || ''
    this.setState({searchTerms})
    this._searchBooks(searchTerms)
  }

  _searchBooks = async searchTerms => {
    let books = await BooksAPI.search(searchTerms)
    books = books || []
    this.setState({books})
  }
  
  _onBookShelfChange = async (book, nextShelf, currentShelf) => {
    try {
      const result = await BooksAPI.update(book, nextShelf)
      const books = this.state.books.map(_book => {
        if (_book.id === book.id) {
          _book.shelf = nextShelf
        }
        return _book
      })
      this.setState({books})
    } catch (error) {
      alert(error.message)
    }
  }
  
  render () {
    const { books } = this.state
    return <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          {/* 
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
            
            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text" 
            placeholder="Search by title or author"
            value={this.state.searchTerms}
            onChange={this._handleSearch} />
          
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {Array.isArray(books) && books.map(book => <Book key={book.id} book={book} onBookShelfChange={this._onBookShelfChange} />)}
        </ol>
      </div>
    </div>
  }
}
