import React from 'react'
import { Route } from 'react-router-dom'

import Search from './Components/Search'
import Reads from './Components/Reads'

import './App.css'

class BooksApp extends React.Component {
  render () {
    return (
      <div className='app'>
        <Route exact path='/' component={Reads} />
        <Route path='/search' component={Search} />
      </div>
    )
  }
}

export default BooksApp
