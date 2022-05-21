import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './screens/Login.jsx';
import NotFound from './screens/NotFound.jsx';
import Registration from './screens/Registration.jsx'

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Registration" element={<Registration />} />
            <Route element={<NotFound />} />
        </Routes>
    );
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root"));
