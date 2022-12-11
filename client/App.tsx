import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './home/Home'
import { NavBar } from "./navBar/NavBar";


const App: React.FC = () => {
  return (
    <NavBar />
    // <Router>
    //   <div>
    //     <h2>Welcome to React Router Tutorial</h2>
    //     <nav>
    //     <div>
    //       <Link to={'/'}> Home </Link>
    //       <Link to={'/contact'}>Contact</Link>
    //       <Link to={'/about'}>About</Link>
    //     </div>
    //     </nav>
    //     <hr />
    //     <Routes>
    //         <Route path='/' element={<Home />} />
    //     </Routes>
    //   </div>
    // </Router>
  )
};

export default App;