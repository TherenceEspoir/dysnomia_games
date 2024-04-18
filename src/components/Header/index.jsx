import "./index.css";
import { Link } from "react-router-dom";

export default function Header({ name }) {
	let sentence = '';
	if(name === 'Julian') {
		sentence = 'Hello Super Juju';
	} else {
		sentence = `Salut ${name}`;
	}

	return (
		<div className="header">
			<ul>
				<li><Link to={'/'} className="text-white text-decoration-none">Home</Link></li>
				<li><Link to={'/subscription'} className="text-white text-decoration-none">Subscription</Link></li>
			</ul>
			{sentence} !
		</div>
	);
}