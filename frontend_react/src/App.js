import './App.scss';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import logoImage from './media/logo.png'
import { useState } from 'react';

function App() {
  const [logoLoad,setLogoLoad]=useState(false);
  return (
    <div className="App">
      {logoLoad && <div className="LoadHolder">
      <img src={logoImage} className="LoadLogo" alt="Logo" />
        <div className='LoadBackdrop'/>
      </div>}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="dark" />
      <Routes>
        <Route path='/' element={<LandingPage setLogoLoad={setLogoLoad} />} />
        <Route path='/Home' element={<Home setLogoLoad={setLogoLoad}/>} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </div>
  );
}

export default App;
