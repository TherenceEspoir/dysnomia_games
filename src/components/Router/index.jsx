import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom" ;

import Home from '../Home';
import Layout from '../Layout';

const router = createBrowserRouter([
    {
	    element: <Layout />,
	    children: [
			{
				path: '/',
				element: <Home />,
			}
		]
	}
]) ;

export default function Router(){
    return (
        <RouterProvider router={router} />
    ); 
}