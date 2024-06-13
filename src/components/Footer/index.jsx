import "./index.css" ;

import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <ul>
				<li><Link to={'/games'} className="text-white text-decoration-none">See more games</Link></li>
			</ul>
        </footer>
    );
}