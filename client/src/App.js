import './App.css';
import { Route, Switch } from "react-router-dom";
import Header from './components/Header';
import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import AddBlogs from './components/AddBlogs';
import BlogDetail from './components/BlogDetail';
// import UpdateBlog from './components/UpdateBlog';

function App() {
  return (
    <React.Fragment>
      <header>
        <Header/>
      </header>
      <main>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/blogs" component={Blogs}></Route>
          <Route path="/myBlogs" component={UserBlogs}></Route>
          <Route path="/myBlog/:id" component={BlogDetail}></Route>
          {/* <Route path="/editBlog/:id" component={UpdateBlog}></Route> */}
          <Route path="/add" component={AddBlogs} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
