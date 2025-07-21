import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar'
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Download from './Download';
import Gallery from './Gallery';
import './App.css'

const App = () => {
  return (
    <div className='main_app'>

      {/* {console.log('Entered in App.js')} */}

      <Navbar />
      <Searchbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/download' element={<Download />} />
        <Route path='/gallery' element={<Gallery />} />
      </Routes>
    </div>
  )
}

export default App
