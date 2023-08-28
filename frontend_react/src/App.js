import './App.scss';
import { Route,Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
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
      theme="dark"/>
      <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/Home' element={<Home/>}/>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    </div>
  );
}

export default App;
