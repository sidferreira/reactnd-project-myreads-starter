import React from 'react'

export default ({book, books, onBookShelfChange}) => {
  const {imageLinks, title, authors} = book
  books = books || []
  const shelfedBook = books.filter(({id}) => id === book.id)
  const shelf = shelfedBook.length === 1 ? shelfedBook[0].shelf : 'none'
  return <li>
    <div className='book'>
      <div className='book-top'>
        <div className='book-cover'
          style={{ width: 128, height: 193, backgroundImage: `url('${imageLinks ? imageLinks.thumbnail : ''}')` }} />
        <div className='book-shelf-changer'>
          <select defaultValue={shelf} onChange={event => onBookShelfChange(book, event.target.value, shelf)}>
            <option value='none' disabled>Move to...</option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        </div>
      </div>
      <div className='book-title'>{title}</div>
      <div className='book-authors'>{authors ? authors.join(', ') : ''}</div>
    </div>
  </li>
}
