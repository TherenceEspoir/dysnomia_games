import './index.css' ;
//import {AuthContext} from '../../hooks/useAuth';
import { useToken,useTokenSetter } from '../../hooks/useToken';

import React, { useState, useContext } from 'react';


//on a besoin du username et du password pour s'inscrire

export default function Register() {
    const token = useToken();
    const setToken = useTokenSetter();

    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    console.log(user);

    function handleChange(event) {
        setUser((currentUser) => ({
            ...currentUser,
            [event.target.name]: event.target.value,
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('https://m1.dysnomia.studio/api/Users/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            console.error('Erreur lors de la connexion : ', response);
            return;
        }
        const data = await response.text();
        console.log("gagné : " + data) ;
        setToken(data);
    }

    return (           

        <form id="subscriptionForm">
            <p className='text-center'>Bienvenu nouvel ami !</p>

            <div className="mb-3">
                <label htmlFor="username" className='form-label'>Username: </label>
                <input type='text' value={user.name} id='username' name='username' className='form-control' onChange={handleChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className='form-label'>Password: </label>
                <input type='password' id='password' name='password' value={user.password} className='form-control' onChange={handleChange}/>
            </div>


            <input type='submit' value="Se connecter" className="btn btn-primary w-100" onClick={handleSubmit}/>
        </form>

    );
}
