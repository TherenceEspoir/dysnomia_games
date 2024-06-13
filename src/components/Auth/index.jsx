import { useNavigate } from "react-router-dom";
import { useToken,useTokenSetter } from '../../hooks/useToken';
import React, { useState, useContext } from 'react';
import postAuth from "../../business/postAuth";

import View from './view';

export default function Auth() {

	const token = useToken();
    const setToken = useTokenSetter();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    // console.log(user);

    function handleChange(event) {
        setUser((currentUser) => ({
            ...currentUser,
            [event.target.name]: event.target.value,
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {data, error} = await postAuth(user) ;

        // console.log("gagné : " + data) ;
        setToken(data);
        navigate("/");
    }
    
	return (
		<View user={user} handleChange={handleChange} handleSubmit={handleSubmit}/>
	);
}