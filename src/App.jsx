import './App.css'
import Login from './components/Login/Login'
import {Link, Route, Routes} from 'react-router-dom'
import Register from './components/Register/Register'

import ProfDashborad from './components/ProfDashborad/ProfDashborad'
import StudentDashbord from './components/StudentDashbord/StudentDashbord'
function App() {


  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profquizzes' element={<ProfDashborad/>}/>
        <Route path='/studentquizzes' element={<StudentDashbord/>}/>
      </Routes>
     
      <Link to='/login'>Login</Link> | 
      <Link to='/register'>Register</Link>
    </>
  )
}

export default App
