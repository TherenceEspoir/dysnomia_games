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
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token, // on ajoute le token dans le header
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            console.error('Erreur lors de l\'inscription : ', response);
            return;
        }
        const data = await response.text();
        setToken(data);
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}> 
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={user.name} onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={user.password} onChange={handleChange}/>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
