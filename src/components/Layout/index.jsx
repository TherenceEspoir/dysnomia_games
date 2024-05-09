import { Outlet } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

import "./index.css" ;

export default function Layout() {

	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}