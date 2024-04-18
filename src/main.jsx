import React from 'react' ;
import ReactDOM from 'react-dom/client' ;
import Router from "./components/Router" ;

import 'bootstrap/dist/css/bootstrap.css' ;

import { TokenContextProvider } from './hooks/useToken';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <TokenContextProvider>
            <Router />
        </TokenContextProvider>
    </React.StrictMode>
) ;