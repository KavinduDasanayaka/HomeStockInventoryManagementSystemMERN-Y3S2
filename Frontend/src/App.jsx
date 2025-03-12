import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/UserManagement/SignIn';
import SignUp from './pages/UserManagement/SignUp';
import Profile from './pages/UserManagement/Profile';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  


  )
}
