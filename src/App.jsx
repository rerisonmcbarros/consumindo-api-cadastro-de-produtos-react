import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import useAuthContext from './hooks/useAuthContext';

function App() {
  const {isLoged} = useAuthContext();

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={ isLoged() ?  <Navigate to="/home" /> : <Login /> } />
        <Route path="/home" element={ isLoged() ? <Home /> : <Navigate to="/" /> } />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
