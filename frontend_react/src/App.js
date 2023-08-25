import './App.scss';
import { Route,Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/Home' element={<Home/>}/>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    </div>
  );
}

export default App;
