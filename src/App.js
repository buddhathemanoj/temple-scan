import React from 'react'
import Scanner from './Scanner'
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import ShowTicket from './ShowTicket';
import ListBookings from './Scanneddata/ListBookings';
import Navbar from './NNavbar/navbar';


const App = () => {
  return (
   <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/scanner" element={<Scanner/>}/>
          <Route path="/showticket" element={<ShowTicket/>}/>
          <Route path="/details/:id" element={<><ListBookings/></>} /> 
         
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App