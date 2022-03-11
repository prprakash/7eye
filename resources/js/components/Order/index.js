import React, { Component } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

class OrderList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            order_id: '',
            orders: []
        }
    }

    componentDidMount () {
        axios.get('/orders').then(response => {
            this.setState({
                orders: response.data
            })
        })
    }


    render () {
        const { orders } = this.state
        if(this.props.loggedIn){
            return (
                <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='row'>
                                <div className='col-md-6'><strong>All Orders</strong></div>
                                <div className='col-md-6'>
                                    <Link className='btn btn-primary btn-sm' style={{ float: 'right' }} to='/order/create'>
                                        Create Order
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                    <tr>
                                        <td>
                                            <Link to={`/order/show/${order.id}`} > {order.id}</Link>
                                        </td>
                                        <td>{order.customer.name}</td>
                                        <td>{order.created_at}</td>
                                        <td>
                                            <Link className='btn btn-info' to={`/order/show/${order.id}`}> View</Link>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            )
        }
        return(
            <Navigate to='/login' />
        );
    
    }
}
export default (props) => (
    <OrderList
        {...props}
        params={useParams()}
/>)