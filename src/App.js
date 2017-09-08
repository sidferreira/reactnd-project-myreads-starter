import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './Services/BooksAPI'

import Search from './Components/Search'
import Reads from './Components/Reads'

import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchTerms: '',
    searchBooks: []
  }
  
  componentDidMount() {
    this._getAll()
  }

  _getAll = async () => {
    try {
      const books = await BooksAPI.getAll()
      this.setState({books})
    } catch (error) {
      alert(`Fetch error: ${error.message}`)
    }
  }
  
  _onBookShelfChange = async (book, nextShelf, currentShelf) => {
    try {
      await BooksAPI.update(book, nextShelf)
      this._getAll()
    } catch (error) {
      alert(`Update error: ${error.message}`)
    }
  }
  
  _onBookSearch = async searchTerms => {
    try {
      let searchBooks = await BooksAPI.search(searchTerms)
      searchBooks = searchBooks || []
      this.setState({searchBooks})
    } catch (error) {
      alert(`Search error: ${error.message}`)
    }
  }

  render () {
    return (
      <div className='app'>
        <Route exact path='/' 
          render={props => <Reads 
            {...props} 
            books={this.state.books} 
            onBookShelfChange={this._onBookShelfChange} />} 
        />
        <Route path='/search' 
          render={props => <Search 
            {...props} 
            books={this.state.books}
            searchBooks={this.state.searchBooks}
            onBookSearch={this._onBookSearch} 
            onBookShelfChange={this._onBookShelfChange} />} 
        />
      </div>
    )
  }
}

export default BooksApp
