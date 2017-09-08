import React from 'react'

import Book from './Book'

export default ({title, books, onBookShelfChange}) => {
  return <div className='bookshelf'>
    <h2 className='bookshelf-title'>{title}</h2>
    <div className='bookshelf-books'>
      <ol className='books-grid'>
        {books.map(book => <Book key={book.id} book={book} onBookShelfChange={onBookShelfChange} />)}
      </ol>
    </div>
  </div>
}
