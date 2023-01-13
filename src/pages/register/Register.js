import './Register.css'

//importando os hooks

import {useState, useEffect} from 'react';

const Register = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

  return (
    <div className='register'>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuario e compartilhe suas historia</p>
        <form>
            <label>
                <span>Nome:</span>
                <input type="text" name='displayName' required placeholder='Nome do Usuario'/>
            </label>
            <label>
                <span>Email:</span>
                <input type="email" name='email' required placeholder='E-mail do Usuario'/>
            </label>
            <label>
                <span>Senha:</span>
                <input type="password" name='password' required placeholder='Insira a sua senha'/>
            </label>
            <label>
                <span>Confirmação de senha:</span>
                <input type="password" name='confirmPassword' required placeholder='Confirme a sua senha'/>
            </label>
            <button className="btn">Cadastrar</button>
        </form>
    </div>
  )
}

export default Register;