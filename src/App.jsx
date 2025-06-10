import './App.css'
import { Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import UserDash from './pages/UserDash'
import BookedTickets from './components/User/BookedTickets'
import BusBooking from './components/User/BusBooking'
import OperatorDashboard from './pages/OperatorDashboard'
import AddBus from './components/AddBus'
import BusList from './components/BusList'
import ScheduleList from './components/ScheduleList'
import SelectSeats from './components/User/SelectSeats'
import Payment from './components/User/Payment'
import UserProfile from './components/User/UserProfile'
import OperatorProfile from './components/OperatorProfile'
import UserLogout from './components/User/UserLogout'
import OperatorLogout from './components/OperatorLogout'
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
           <Route path='profile' element={<OperatorProfile/>}/> 
           <Route path='home' element={<BusList/>}/>
           <Route path="schedules/:busId" element={<ScheduleList />} />
           <Route path='booking/:scheduleId' element={<ShowBookings/>}/>
           <Route path='logout' element={<OperatorLogout/>}/>
        </Route>

        <Route path='/user' element={<UserDash/>}>
            <Route index element={<BookedTickets/>}/>
            <Route path='booking-list' element={<BookedTickets/>}/>
            <Route path='profile' element={<UserProfile/>}/>
            <Route path='book-tickets' element={<BusBooking/>}/>
            <Route path='select-seats' element={<SelectSeats/>}/>
            <Route path='payment' element={<Payment/>}/>
            <Route path='logout' element={<UserLogout/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
