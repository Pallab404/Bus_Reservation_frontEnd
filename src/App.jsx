import './App.css'
import { Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import UserDash from './pages/UserDash'
import BookedTickets from './components/BookedTickets'
import BusBooking from './components/User/BusBooking'
import OperatorDashboard from './pages/OperatorDashboard'
import AddBus from './components/AddBus'
import BusList from './components/BusList'
import ScheduleList from './components/ScheduleList'
import SelectSeats from './components/User/SelectSeats'
import Payment from './components/User/Payment'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>} />
       
        <Route path='/operator' element={<OperatorDashboard/>}>
           <Route path='add-bus' element={<AddBus/>}/> 
           <Route path='home' element={<BusList/>}/>
           <Route path="schedules/:busId" element={<ScheduleList />} />
        </Route>

        <Route path='/user' element={<UserDash/>}>
            <Route index element={<BookedTickets/>}/>
            <Route path='booking-list' element={<BookedTickets/>}/>
            <Route path='book-tickets' element={<BusBooking/>}/>
            <Route path='select-seats' element={<SelectSeats/>}/>
            <Route path='payment' element={<Payment/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
