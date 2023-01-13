import { NavLink } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
        <NavLink to="/" className="brand"> 
            Mini <span>Blog</span>
        </NavLink>
        <ul className="links_list">
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/login">Entrar</NavLink>
            </li>
            <li>
                <NavLink to="/register">Cadastrar</NavLink>
            </li>
            <li>
                <NavLink to="/about">Sobre</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar;

/* Basicamente o "NaviLink" server como um link html "a" nesse caso e definido para onde o usuario sera redirecionado dentro do parametro "to" */