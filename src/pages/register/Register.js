import './Register.css'

//importando os hooks

import {useState, useEffect} from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const {createUser, error: authError, loading} = useAuthentication();

    const handleSubmit = async (e) => { 
        e.preventDefault();

        setError('');

        const user = {
            displayName,
            email,
            password
        }

        if (password !== confirmPassword){
            setError("as senhas precisam ser iguais!")
            return
        }

        const res = await createUser(user)
        console.log(res);
    }

    useEffect(()=> { //tratando erros no formulario 

        if(authError){
            setError(authError);
        }

    }, [authError])

  return (
    <div className='register'>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuario e compartilhe suas historia</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Nome:</span>
                <input 
                    type="text" 
                    name='displayName' 
                    required placeholder='Nome do Usuario'
                    value={displayName}
                    onChange={(e)=> setDisplayName(e.target.value)}
                />
            </label>
            <label>
                <span>Email:</span>
                <input 
                    type="email" 
                    name='email' 
                    required placeholder='E-mail do Usuario'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
            </label>
            <label>
                <span>Senha:</span>
                <input 
                    type="password" 
                    name='password' 
                    required placeholder='Insira a sua senha'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
            </label>
            <label>
                <span>Confirmação de senha:</span>
                <input 
                    type="password" 
                    name='confirmPassword' 
                    required placeholder='Confirme a sua senha'
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                />
            </label>
            {!loading && <button className="btn">Cadastrar</button>}
            {loading && <button className="btn" disabled>Aguarde...</button>}
            {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Register;


/*Evento: "onSubmit" que tem como objetivo de enviar o formulario com todas as suas regras de negocio ou seja validações do fomulario reset do formulario entre outras funcionalidades

Evento: "onchange" que tem como objetivo resgatar os valores inseridos dentro do input*/