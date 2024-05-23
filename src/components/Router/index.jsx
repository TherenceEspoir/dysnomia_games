import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom" ;

import Home from '../Home';
import Layout from '../Layout';
import Auth from "../Auth";
import Subscription from "../Subscription";
import GameDetails from "../Game" ;
import Profile from "../Profile";
import Gamelist from "../Gamelist";
import CompanyDetailsView from "../CompanyDetail";


const router = createBrowserRouter([
    {
	    element: <Layout />,
	    children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/authentication',
				element: <Auth />,
			},
			{
				path: '/subscription',
				element: <Subscription />
			},
			{
				path: '/game/:gameId',
				element: <GameDetails />
			},
			{
				path: '/profile',
				element: <Profile />
			},
			{
				path: '/games',
				element: <Gamelist />
			},
			{
				path: '/company/:companyId',
				element: <CompanyDetailsView />
			}
		]
	}
]) ;

export default function Router(){
    return (
        <RouterProvider router={router} />
    ); 
}