import { useEffect, useState } from "react";
import { useUser, useUserSetter } from '../../hooks/useUser.jsx' ;
import { useToken, useTokenSetter } from '../../hooks/useToken.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faLock } from '@fortawesome/free-solid-svg-icons'


import "./index.css";
import { Link } from "react-router-dom";

export default function Header() {
	let [sentence, setSentence] = useState('');
	const user = useUser() ;
	const setUser = useUserSetter() ;
	const token = useToken() ;
	const setToken = useTokenSetter();

	useEffect(() => {
		if(user === "null") {
			setSentence('Hello Super Juju !');
		} else {
			setSentence(`Salut ${user.name} !`);
		}
	}, [user])

	function LogoutButton(){

		function handleLogout(){
			setToken("null") ;
			setUser("null") ;
		}

		return (
			<FontAwesomeIcon icon={faLock} onClick={handleLogout} title="Logout" id="myLock"/>
		) ;
	}


	function Log(){
		if(token != "null"){
			return (
				<>
					<li><Link to={'/profile'} className="text-white text-decoration-none">MyProfile</Link></li>
					<li><LogoutButton /></li>
				</>	
			) ;
		} else {
			return <li><Link to={'/authentication'} className="text-white text-decoration-none">Authentication</Link></li> ;
		}
	}
	

	return (
		<div className="header">
			<ul>
				<li><Link to={'/'} className="text-white text-decoration-none">Home</Link></li>
				<li><Link to={'/subscription'} className="text-white text-decoration-none">Subscription</Link></li>
				<Log />				
			</ul>
			{sentence}
		</div>
	);
}