// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewVouchers from './components/ViewVouchers';
import Navbar from './components/Navbar';

function App() {
  return (
   <BrowserRouter>
    <Navbar />
    <br></br>
    <br></br>
   <Routes>
    <Route path="/viewvouchers" element={<ViewVouchers/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
