import './App.css'
import Login from './components/Login/Login'
import {Link, Route, Routes} from 'react-router-dom'
import Register from './components/Register/Register'
function App() {


  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Link to='/login'>Login</Link> | 
      <Link to='/register'>Register</Link>
    </>
  )
}

export default App
