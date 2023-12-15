import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from "./components/Home";
import Posts from "./components/posts";
import AddPost from "./components/addPosts";
import { BrowserRouter as Router, Routes, Route, Link }
    from 'react-router-dom';
import * as React from "react";
import NotFound from "./components/NotFound";
function App() {

  return (
      <Router>
          <nav style={{ margin: 10 }}>
              <Link to="/" style={{ padding: 5 }}>
                  Home
              </Link>
              <Link to="/posts" style={{ padding: 5 }}>
                  Posts
              </Link>
              <Link to="/addpost" style={{ padding: 5 }}>
                  Add post
              </Link>
              <Link to="/abefabf" style={{ padding: 5 }}>
                  abefabf
              </Link>

          </nav>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/addpost" element={<AddPost />} />
              <Route path="*" element={<NotFound/>}/>
          </Routes>
      </Router>

  )
}

export default App
