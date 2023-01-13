import './App.css';

//importando o path do router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//importando as paginas
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Register from './pages/register/Register';
import Login from './pages/login/Login';


//importando componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';



function App() {
  return (
    <div className="app">
      <BrowserRouter>{/* BrowserRouter serve para encapsular as rotas */}

        <Navbar></Navbar>

        <div className="container">
          <Routes>{/* Routes ira receber as rotas */}
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </div>

        <Footer></Footer>

      </BrowserRouter>
    </div>
  );
}

export default App;
