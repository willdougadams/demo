import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './home/Home'
import { NavBar } from "./navBar/NavBar";
import Box from '@mui/material/Box';
import { DrawerHeader } from "./common/styledComponents";
import { Contact } from './contact/Contact'

const App: React.FC = () => {
  return <NavBar />
};

export default App;