import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Registration } from './pages/Registration'
import { ProfileCompletion } from './pages/ProfileCompletion'
import { Dashboard } from './pages/Dashboard'
import { Update } from './pages/Update'
import { AddBook } from './pages/AddBook'
import { BookList } from './pages/BookList'

function App() {

  return (
    <Routes>
    
      <Route path='/register' element={ <Registration /> }/>
      <Route path='/login' element={ <Login /> }/>
      <Route path='/Profile-Completion' element={ <ProfileCompletion /> }/>
      <Route path='/dashboard' element={ <Dashboard /> }/>
      <Route path='/update-details' element={ <Update /> }/>
      <Route path='/add-book' element={ <AddBook/> }/>
      <Route path='/all-books' element={ <BookList/> }/>
    </Routes>
  )
}

export default App
