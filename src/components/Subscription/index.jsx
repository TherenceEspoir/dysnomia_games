import { useState } from 'react';
import { useToken, useTokenSetter } from '../../hooks/useToken.jsx';
import { useNavigate } from "react-router-dom";


import Form from './view';

export default function Subscription() {

	const token = useToken();
	const setToken = useTokenSetter();
	const navigate = useNavigate();
	
	const [user, setUser] = useState({
		username : '',
		password : '',
		confirmationPassword : ''
	}) ;

	const [error, setError] = useState(null) ;
	
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

		const result = await fetch(
			"https://m1.dysnomia.studio/api/Users/register", {
				body: JSON.stringify(user),
				headers: {
					"Content-Type": "application/json"
				},
				method: "POST",
				mode: "cors"
			}
		) ;

		if(!result.ok){
			const errorData = await result.text();
			
			setError(() => ({
				title : "Mais qu'est ce qu'il se passe ?!",
				message : errorData
			})) ;
      		throw new Error(errorData || "Une erreur s'est produite");
			
		}

		const data = await result.text() ;

		setToken(() => data) ;
		navigate("/");
		
	};

    
	return (
		<Form handleChange={handleChange} onClick={submitForm} mess={error}/>
	);
}