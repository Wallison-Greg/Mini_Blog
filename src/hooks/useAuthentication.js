//path firebase config

import {db} from '../firebase/config';

//path firebase de autenticação 
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
  } from "firebase/auth";

//path hooks

import { useState, useEffect } from 'react'


export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //cleanup
    //lidar com vazamento de memória

    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth(); //pegando a autenticação 

    function checkIfIsCancelled(){
        if (cancelled){
            return;
        }
    }

    //resgistrando usuario

    const createUser = async (data) =>{
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            
            const {user} = await createUserWithEmailAndPassword(
                auth, 
                data.email,
                data.password
            )

            await updateProfile(
                user, {
                    displayName: data.displayName
                }
            )

            setLoading(false);

            return user;
        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage

            if (error.message.includes('Password')){
                systemErrorMessage = 'A senha deve conter pelo menos 6 caracteres!'
            } else if (error.message.includes('Email-already')){
                systemErrorMessage = 'E-mail ja cadastrado!'
            } else {
                systemErrorMessage = 'Ocorreu um erro, tente mais tarde!'
            }

            setLoading(false);

            setError(systemErrorMessage);
        }
    }

    //logout - sign out 

    const logout = () => {
        checkIfIsCancelled();

        signOut(auth);
    }

    //login - sign in 

    const login = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(false);

        try {

            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false);

        } catch (error) {
            let systemErrorMessage

            if (error.message.includes('user-not-found')){
                systemErrorMessage = 'Usuario não encontrado'
            }else if (error.message.includes('wrong-password')){
                systemErrorMessage = 'Senha incorreta'
            }else{
                systemErrorMessage = 'Ocorreu um erro, tente mais tarde!'
            }

            setError(systemErrorMessage);
            setLoading(false);
        }
    }

    useEffect(()=>{
        return ()=> setCancelled(true);
    }, []);

    return { auth, createUser, error, loading, logout, login};

};

/*hook de autenticação de formulario 
Basicamente nesse hook definimos os padrões de autenticações que devem ser aplicados dentro do fomrulario para que as informações sejam enviadas de forma correta para a base de dados do firebase */
