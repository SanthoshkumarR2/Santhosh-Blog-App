import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './components/Header'; // Corrected import statement
import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import AddBlogs from './components/AddBlogs';
import BlogDetail from './components/BlogDetail';

function App() {
  return (
    <React.Fragment>
      <header>
        <Header/>
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/blogs" element={<Blogs/>}></Route>
          <Route path="/myBlogs" element={<UserBlogs/>}></Route>
          <Route path="/myBlogs/:id" element={<BlogDetail/>}></Route>
          <Route path="/blogs/add" element={<AddBlogs />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
