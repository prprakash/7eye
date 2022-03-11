import React, { Component } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
class ShowOrder extends Component {
    state = { message: "Loading..." };
    
    constructor (props) {
        super(props)
        
        this.state = {
            id: this.props.params.id,
            customer: [],
            products: [],
            order_total: '',
            message: '',
            errors: []
        }
    }
    
    componentDidMount () {
        //const { id } = useParams();
        axios.get(`/order/show/${this.state.id}`).then(response => {
            this.setState({
                id: response.data.id,
                customer: response.data.customer,
                products: response.data.product,
                order_total: response.data.order_total
            })
        })
    }



    render () {
        if(this.props.loggedIn){
            return (
                <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='row'>
                                <div className='col-md-6'><strong>Show Order</strong></div>
                                <div className='col-md-6'>
                                    <Link className='btn btn-primary btn-sm' style={{ float: 'right' }} to='/orders'>
                                        Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <h2>Customer Details</h2>
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>{this.state.customer.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td>{this.state.customer.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{this.state.customer.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>{this.state.customer.address}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h2>Products</h2>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <td>Product Name</td>
                                        <td>Unit Price</td>
                                        <td>Quantity</td>
                                        <td>Total</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.products.map(product => (
                                        <tr>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.total_price}</td>
                                        </tr>
                                    ))}
                                    <tr style={{background: "#cecece"}}>
                                        <td colSpan={3} style={{textAlign: "right"}}>Net Total</td>
                                        <td>{this.state.order_total}</td>
                                    </tr>
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
    <ShowOrder
        {...props}
        params={useParams()}
/>)