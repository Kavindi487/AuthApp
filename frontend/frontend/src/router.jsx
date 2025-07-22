import {Routes, Route} from 'react-router-dom';
import Home from './home';
import Login from './login';
import Register from './register';
import Dashboard from './dashboard';

const RouterComponent = () =>{
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
};

export default RouterComponent;