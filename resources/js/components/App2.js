import React from 'react';
import axios from 'axios';
import { BrowserRouter, Routes,  Route, NavLink } from 'react-router-dom';
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
import Dashboard from './Dashboard';

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
    apiClient.post('/logout').then(response => {
      if (response.status === 204) {
        setLoggedIn(false);
        sessionStorage.setItem('loggedIn', false);
      }
    })
  };
  const authLink = loggedIn 
    ? <button onClick={logout} className="btn btn-primary">Logout</button> 
    : <NavLink to='/login' className="btn btn-primary">Login</NavLink>;

    const Dashboard = new Dashboard();
  return (
    <BrowserRouter>
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-10'>
                    <Header />
                </div>
                <div className='col-md-1'>
                    {authLink}
                </div>
            </div>
        </div>
        <Routes>
            <Route exact path="/" render={props => (
                <Dashboard {...props} loggedIn={loggedIn} />
            )}  />
            <Route exact path="/customers" element={<Customer />} />
            <Route exact path="/customer/create" element={<CreateCustomer />} />
            <Route exact path="/customer/edit/:id" element={<EditCustomer />} />
            <Route exact path="/products" element={<Product />} />
            <Route exact path="/product/create" element={<CreateProduct />} />
            <Route exact path="/product/edit/:id" element={<EditProduct />} />
            <Route exact path="/orders" element={<Order />} />
            <Route exact path="/order/create" element={<CreateOrder />} />
            <Route exact path="/order/show/:id" element={<ShowOrder />} />
            <Route exact path="/login" element={<Login />} />
            <Route path='/login' render={props => (
                <Login {...props} login={login} />
            )} />

        </Routes>
    </BrowserRouter>
    
  );
};

export default App;