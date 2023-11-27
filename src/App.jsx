import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import useAuthContext from './hooks/useAuthContext';
import ProductForm from './pages/ProductForm';
import ProductDetails from './pages/ProductDetails';

function App() {
  const {isLoged} = useAuthContext();

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={ isLoged() ?  <Navigate to="/home" /> : <Login /> } />
        <Route path="/home" element={ isLoged() ? <Home /> : <Navigate to="/" /> } />
        <Route path="/produtos/:id" element={ isLoged() ? <ProductDetails /> : <Navigate to="/" /> } />
        <Route path="/cadastrar-produto" element={ isLoged() ? <ProductForm /> : <Navigate to="/" /> } />
        <Route path="/editar-produto/:id" element={ isLoged() ? <ProductForm /> : <Navigate to="/" /> } />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
