import './App.css'
import Fixtures from './components/Fixtures'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/fixtures' element={<Fixtures />} />
      </Routes>
    </>
  )
}

export default App
