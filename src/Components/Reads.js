import React from 'react'
import { Link } from 'react-router-dom'

import Shelf from './Shelf'

export default ({books, onBookShelfChange}) => <div className='list-books'>
  <div className='list-books-title'>
    <h1>MyReads</h1>
  </div>
  <div className='list-books-content'>
    <div>
      <Shelf title='Currently Reading'
        books={books.filter(({shelf}) => shelf === 'currentlyReading')}
        onBookShelfChange={onBookShelfChange} />
      <Shelf title='Want to Read'
        books={books.filter(({shelf}) => shelf === 'wantToRead')}
        onBookShelfChange={onBookShelfChange} />
      <Shelf title='Read'
        books={books.filter(({shelf}) => shelf === 'read')}
        onBookShelfChange={onBookShelfChange} />
    </div>
  </div>
  <div className='open-search'>
    <Link to='/search'>Add a book</Link>
  </div>
</div>
