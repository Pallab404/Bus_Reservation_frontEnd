import './App.css'
import { Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import UserDash from './pages/UserDash'
import BookedTickets from './components/BookedTickets'
import BusBooking from './components/BusBooking'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>} />


        <Route path='/user' element={<UserDash/>}>
            <Route index element={<BookedTickets/>}/>
            <Route path='booking-list' element={<BookedTickets/>}/>
            <Route path='book-tickets' element={<BusBooking/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
