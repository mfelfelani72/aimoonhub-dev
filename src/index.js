/*

       Root file to create the Component tree

*/

import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./app/containers/app/app";
import '../styles/style.css'

createRoot(document.getElementById('root')).render(

       <BrowserRouter basename="/">
              <App />
       </BrowserRouter>
);
