
import './App.css'
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import TaskQueue from './pages/AddTask'
import Footer from './components/Footer';

function App() {


  return (
    <>
     <Navbar/>
     <Outlet/>
     <Footer/>
    </>
  )
}

export default App
