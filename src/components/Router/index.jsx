import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom" ;

import Home from '../Home';
import Layout from '../Layout';
import Auth from "../Auth";
import Subscription from "../Subscription";


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
			}
		]
	}
]) ;

export default function Router(){
    return (
        <RouterProvider router={router} />
    ); 
}