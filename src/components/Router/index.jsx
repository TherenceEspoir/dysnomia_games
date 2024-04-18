import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom" ;

import Home from '../Home';
import Layout from '../Layout';
import Register from "../Register";
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
				path: '/register',
				element: <Register />,
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