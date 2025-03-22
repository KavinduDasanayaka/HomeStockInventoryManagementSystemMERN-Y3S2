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
import ItemList from './pages/ItemBorrowingAndLendingManagement/ItemList';
import CreateItemList from './pages/ItemBorrowingAndLendingManagement/CreateItemList';
import UpdateItemList from './pages/ItemBorrowingAndLendingManagement/UpdateItemList';
import ItemPrivateRoute from './components/ItemPrivateRoute';
import GroceryList from './pages/GroceryListManagement/GroceryList';
import CreateGroceryList from './pages/GroceryListManagement/CreateGroceryList';
import UpdateGroceryList from './pages/GroceryListManagement/UpdateGroceryList';


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

        <Route element={<ItemPrivateRoute />}>
          <Route path='/item-list' element={<ItemList/>} />
        </Route>

        
        <Route path='/create-item-list' element={<CreateItemList />} />
        <Route path='/update-item-list/:id' element={<UpdateItemList />} />

        <Route path='/grocery-list' element={<GroceryList />} />
        <Route path='/create-grocery-list' element={<CreateGroceryList />} />
        <Route path='/update-grocery-list/:id' element={<UpdateGroceryList />} />

      </Routes>
    </BrowserRouter>
  


  )
}
