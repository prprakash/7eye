import React, { Component } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

class CustomerList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            customer_id: '',
            customers: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        axios.get('/customers').then(response => {
            this.setState({
                customers: response.data
            })
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.delete('/customer/delete/' + event.target.customer_id.value);
        window.location.reload(false);
    }

    render () {
    const { customers } = this.state
        if (this.props.loggedIn) {
            return (
                <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='row'>
                                <div className='col-md-6'><strong>All Customers</strong></div>
                                <div className='col-md-6'>
                                    <Link className='btn btn-primary btn-sm' style={{ float: 'right' }} to='/customer/create'>
                                        Add New
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map(customer => (
                                    <tr>
                                        <td>
                                            <Link to={`/customer/edit/${customer.id}`}> {customer.name}</Link>
                                        </td>
                                        <td>{customer.email}</td>
                                        <td>{customer.phone}</td>
                                        <td>{customer.address}</td>
                                        <td>
                                            <form onSubmit={this.handleSubmit}>
                                                <input type='hidden' value={customer.id} name='customer_id' />
                                                <input type="submit" value="Delete" className="btn btn-danger"/>
                                            </form>
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
    <CustomerList
        {...props}
        params={useParams()}
/>)