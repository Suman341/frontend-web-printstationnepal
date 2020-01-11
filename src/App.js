import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import RootComponent from "./components/root/main";

function App() {
    return (
        <BrowserRouter>
            <RootComponent/>
        </BrowserRouter>
    );
}

export default App;
