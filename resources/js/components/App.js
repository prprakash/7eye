import React, { render } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import Dashboard from './Dashboard'

import Customer from './Customer/index'
import CreateCustomer from './Customer/create'
import EditCustomer from './Customer/edit'

import Product from './Product/index'
import CreateProduct from './Product/create'
import EditProduct from './Product/edit'

import Order from './Order/index'
import CreateOrder from './Order/create'
import ShowOrder from './Order/show'
import Login from './Login'

axios.defaults.baseURL = 'http://7eye.test/api';
const App = () => {
    const [loggedIn, setLoggedIn] = React.useState(
        sessionStorage.getItem('loggedIn') == 'true' || false
    );
    const login = () => {
        setLoggedIn(true);
        sessionStorage.setItem('loggedIn', true);
    };
    const logout = () => {
        axios.post('/logout').then(response => {
          if (response.status === 200) {
            setLoggedIn(false);
            sessionStorage.setItem('loggedIn', false);
          }
        })
    };
    const authLink = loggedIn 
        ? <button onClick={logout} className="nav-link btn btn-link">Logout</button> 
        : <NavLink to='/login' className="nav-link">Login</NavLink>;

    return (
        <Router>
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-10'>
                    <Header />
                </div>
                <div className='col-md-2'>
                    {authLink}
                </div>
            </div>
        </div>
        <Routes>
            <Route exact path="/" element={ <Dashboard loggedIn={loggedIn} /> } />
            <Route exact path="/customers" element={<Customer loggedIn={loggedIn} />} />
            <Route exact path="/customer/create" element={<CreateCustomer loggedIn={loggedIn} />} />
            <Route exact path="/customer/edit/:id" element={<EditCustomer loggedIn={loggedIn} />} />
            <Route exact path="/products" element={<Product loggedIn={loggedIn} />} />
            <Route exact path="/product/create" element={<CreateProduct loggedIn={loggedIn} />} />
            <Route exact path="/product/edit/:id" element={<EditProduct loggedIn={loggedIn}  />} />
            <Route exact path="/orders" element={<Order loggedIn={loggedIn} />} />
            <Route exact path="/order/create" element={<CreateOrder loggedIn={loggedIn} />} />
            <Route exact path="/order/show/:id" element={<ShowOrder loggedIn={loggedIn} />} />
            <Route exact path="/login" element={<Login login={login} />} />

        </Routes>
        </Router>
    )
};


ReactDOM.render(<App />, document.getElementById('app'))