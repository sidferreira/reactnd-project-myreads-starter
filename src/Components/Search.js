import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Book from './Book'

export default class BooksApp extends Component {
  state = {
    searchTerms: ''
  }

  _handleSearch = (searchTerms) => {
    this.setState({searchTerms})
    this.props.onBookSearch(searchTerms)
  }

  render () {
    const searchTerms = this.state.searchTerms
    const { books, onBookShelfChange, onBookSearch } = this.props
    return <div className='search-books'>
      <div className='search-books-bar'>
        <Link className='close-search' to='/'>Close</Link>
        <div className='search-books-input-wrapper'>
          {/* 
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
            
            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type='text' 
            placeholder='Search by title or author'
            value={searchTerms}
            onChange={({ target }) => this._handleSearch(target.value || '')} />
          
        </div>
      </div>
      <div className='search-books-results'>
        <ol className='books-grid'>
          {Array.isArray(books) && books.map(book => <Book key={book.id} book={book} onBookShelfChange={onBookShelfChange} />)}
        </ol>
      </div>
    </div>
  }
}
