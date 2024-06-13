import { useState } from 'react';
import { useToken, useTokenSetter } from '../../hooks/useToken.jsx';
import { useNavigate } from "react-router-dom";


import Form from './view';
import postSubscription from '../../business/postSubscription.js';

export default function Subscription() {

	const [error, setError] = useState(null) ;
	const setToken = useTokenSetter();
	const navigate = useNavigate();
	
	const [user, setUser] = useState({
		username : '',
		password : '',
		confirmationPassword : ''
	}) ;

	
	// console.log(user) ;
	// console.log(token) ;
	function handleChange(e) {
		setUser((currentUser) => ({
			...currentUser,
			[e.target.name] : e.target.value
		})) ;
	}

	async function submitForm(e) {
		e.preventDefault() ;

		let data = await postSubscription(user, setError) ;
		setToken(() => data) ;
		navigate("/");
		
	};

    
	return (
		<Form handleChange={handleChange} onClick={submitForm} mess={error}/>
	);
}