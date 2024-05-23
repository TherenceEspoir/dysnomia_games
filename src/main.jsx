import React from 'react' ;
import ReactDOM from 'react-dom/client' ;
import Router from "./components/Router" ;

import 'bootstrap/dist/css/bootstrap.css' ;

import { TokenContextProvider } from './hooks/useToken.jsx';
import { UserContextProvider } from './hooks/useUser.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <TokenContextProvider>
            <UserContextProvider>
                <Router />
            </UserContextProvider>
        </TokenContextProvider>
    // </React.StrictMode>
) ;