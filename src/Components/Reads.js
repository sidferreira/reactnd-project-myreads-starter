import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Shelf from './Shelf'
import * as BooksAPI from '../Services/BooksAPI'

export default class Search extends Component {
  state = {
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none: []
    }
  }
  
  componentDidMount() {
    this._getAll()
  }

  _getAll = async () => {
    const shelves = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none: []
    }
    try {
      const books = await BooksAPI.getAll()
      if (Array.isArray(books)) {
        books.map(book => shelves[book.shelf || 'none'].push(book))
      }
      this.setState({shelves})
    } catch (error) {
      alert(error.message)
    }
  }

  _onBookShelfChange = async (book, nextShelf, currentShelf) => {
    try {
      const result = await BooksAPI.update(book, nextShelf)
      console.log(result)
      const shelves = this.state.shelves
      shelves[currentShelf] = shelves[currentShelf].filter(({id}) => id !== book.id)
      book.shelf = nextShelf
      shelves[nextShelf].push(book)
      this.setState({shelves})
    } catch (error) {
      alert(error.message)
    }
  }
  
  render () {
    return <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            <Shelf title='Currently Reading' books={this.state.shelves.currentlyReading} onBookShelfChange={this._onBookShelfChange} />
            <Shelf title='Want to Read' books={this.state.shelves.wantToRead} onBookShelfChange={this._onBookShelfChange} />
            <Shelf title='Read' books={this.state.shelves.read} onBookShelfChange={this._onBookShelfChange} />
          </div>
        </div>
        <div className='open-search'>
          <Link to="/search">Add a book</Link>
        </div>
      </div>
  }
}
