import './App.css'
import { Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import UserDash from './pages/UserDash'
import BookedTickets from './components/BookedTickets'
import BusBooking from './components/BusBooking'
import OperatorDashboard from './pages/OperatorDashboard'
import AddBus from './components/AddBus'
import BusList from './components/BusList'
import ScheduleList from './components/ScheduleList'
import ShowBookings from './components/ShowBookings'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>} />
       
        <Route path='/operator' element={<OperatorDashboard/>}>
           <Route index element={<BusList/>}/>
           <Route path='add-bus' element={<AddBus/>}/> 
           <Route path='home' element={<BusList/>}/>
           <Route path="schedules/:busId" element={<ScheduleList />} />
           <Route path="booking/:scheduleId" element={<ShowBookings/>} />
        </Route>

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
