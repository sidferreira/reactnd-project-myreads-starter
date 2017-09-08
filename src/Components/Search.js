import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Book from './Book'

export default class BooksApp extends Component {
  state = {
    searchTerms: ''
  }

  _handleSearch = (searchTerms) => {
    this.setState({searchTerms})
    if (searchTerms) {
      this.props.onBookSearch(searchTerms)
    }
  }

  render () {
    const searchTerms = this.state.searchTerms
    const { searchBooks, books, onBookShelfChange, onBookSearch } = this.props
    return <div className='search-books'>
      <div className='search-books-bar'>
        <Link className='close-search' to='/'>Close</Link>
        <div className='search-books-input-wrapper'>
          <input type='text' 
            placeholder='Search by title or author'
            value={searchTerms}
            onChange={({ target }) => this._handleSearch(target.value || '')} />
          
        </div>
      </div>
      <div className='search-books-results'>
        <ol className='books-grid'>
          {Array.isArray(searchBooks) && searchBooks.map(book => <Book key={book.id} book={book} books={books} onBookShelfChange={onBookShelfChange} />)}
        </ol>
      </div>
    </div>
  }
}
