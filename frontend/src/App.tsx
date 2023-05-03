
import './App.css'
import 'https://kit.fontawesome.com/27558d2a58.js'
import Navbar from './components/Navbar/Navbar'
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home/Home'
import Ticket from './components/Ticket/Ticket'
import CreateTicket from './components/Ticket/CreateTicket'

function App() {

  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/ticket" element={<Ticket/>} />
          <Route path="/ticket/create" element={<CreateTicket/>} />
        </Routes>
      </div>

    </>
  )
}


export default App