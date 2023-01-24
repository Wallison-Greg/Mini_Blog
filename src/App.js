import './App.css';

//importando o path do router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//importando path firebase
import { onAuthStateChanged } from 'firebase/auth';

//importando hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

//importando as paginas
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import CreatePost from './pages/createpost/CreatePost';
import Dashboard from './pages/dashboard/Dashboard';
import Search from './pages/search/Search';
import Post from './pages/Post/Post';

//importando o context
import { AuthProvider } from './context/AuthContext';


//importando componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, [auth])

  if (loadingUser){
    return <p>Carregando...</p>
  }


  return (
    <div className="app">
      <AuthProvider value={{user}}>
        <BrowserRouter>{/* BrowserRouter serve para encapsular as rotas */}

          <Navbar></Navbar>

          <div className="container">
            <Routes>{/* Routes ira receber as rotas */}

              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/posts/:id' element={<Post/>}/>
              {/* realizando bloquei de tela caso o usuario n esteja cadastrado */}
              <Route 
                path='/register' 
                element={!user ? <Register/> : <Navigate to='/'/> }
              />
              <Route 
                path='/login' 
                element={!user ? <Login/> : <Navigate to='/'/> } 
              />
              {/* verifica se o usuario esta logado, caso contrario ele sera redirecionado para a pagina de login */}
              <Route 
                path='/post/create' 
                element={user ? <CreatePost/> : <Navigate to='/login'/> }  
              />
              <Route 
                path='/dashboard' 
                element={user ? <Dashboard/> : <Navigate to='/login'/> } 
              />

            </Routes>
          </div>

          <Footer></Footer>

        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

/*paths instalados 
npx create-react-app
npm i firebase
npm i react-router-dom */
