import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/UserManagement/SignIn';
import SignUp from './pages/UserManagement/SignUp';
import Profile from './pages/UserManagement/Profile';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import UploadReceipt from './pages/NoveltySection/UploadReceipt';
import Timeline from './pages/NoveltySection/ShareRecipeSection/Timeline';
import Post from './pages/NoveltySection/ShareRecipeSection/CreatePost';
import SpecificPost from './pages/NoveltySection/ShareRecipeSection/SpecificPost';

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/timeline" element={<Timeline />} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/upload-receipt' element={<UploadReceipt />} />
          <Route path='/specific-Post/:id' element={<SpecificPost />} />
          <Route path="/post" element={<Post />} />
        </Route>

      </Routes>
    </BrowserRouter>
  


  )
}
