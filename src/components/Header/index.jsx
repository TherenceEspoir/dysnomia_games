import { useEffect, useState } from "react";
import { useUser } from '../../hooks/useUser.jsx' ;

import "./index.css";
import { Link } from "react-router-dom";

export default function Header() {
	let [sentence, setSentence] = useState('');
	const user = useUser() ;

	useEffect(() => {
		if(user == null) {
			setSentence('Hello Super Juju !');
		} else {
			setSentence(`Salut ${user.name} !`);
		}
	}, [user])
	

	return (
		<div className="header">
			<ul>
				<li><Link to={'/'} className="text-white text-decoration-none">Home</Link></li>
				<li><Link to={'/subscription'} className="text-white text-decoration-none">Subscription</Link></li>
				<li><Link to={'/authentication'} className="text-white text-decoration-none">Authentication</Link></li>
			</ul>
			{sentence}
		</div>
	);
}