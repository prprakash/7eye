import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
    <Link className='navbar-brand' to='/'>7 Eye</Link>
    <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
            <li className="nav-item active">
                <Link className="nav-link" to="/">Dashboard</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/customers">Customers</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/orders">Orders</Link>
            </li>
        </ul>
    </div>
  </nav>
)

export default Header