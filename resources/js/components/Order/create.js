import React, { Component, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
class CreateOrder extends Component {
    state = { message: "Loading..." };
    constructor (props) {
        super(props)
        this.state = {
            customers: [],
            products: [],
            customer_id: '',
            item: '',
            items: [],
            product_id: '',
            quantity: '',
            errors: []
        }
        this.updateProductID = this.updateProductID.bind(this)
        this.updateQuantity = this.updateQuantity.bind(this)
        this.handleCreateNewOrder = this.handleCreateNewOrder.bind(this)
        this.addItem = this.addItem.bind(this)
    }

    componentDidMount () {
        axios.get('/customers').then(response => {
            this.setState({
                customers: response.data
            })
        })

        axios.get('/products').then(response => {
            this.setState({
                products: response.data
            })
        })
    }

    handleCustomerID (event) {
        event.preventDefault()
        this.setState({
            customer_id: event.target.value
        })
    }

    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateNewOrder (event) {
        event.preventDefault()
        console.log(new FormData(event.target))
        const order = {
            customer_id: this.state.customer_id,
            quantity: event.target.elements.quantity.value,
            // items: 
        }

        axios.post('/order/create', new FormData(event.target))
        .then(response => {
            if(response.status == 201){
                this.setState({ message: response.data.message });
            }
        })
        .catch(error => {
            this.setState({ message: response.data.message });
        })
    }

    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    renderErrorFor (field) {

        if (field == 'message') {
            return (
            <span className='text-danger'>
                <strong>{this.state.message}</strong>
            </span>
            )
        }
        
        if (this.hasErrorFor(field)) {
            return (
            <span className='invalid-feedback'>
                <strong>{this.state.errors[field][0]}</strong>
            </span>
            )
        }
    }

    updateProductID(event) {
        event.preventDefault()
        this.setState({
            product_id: event.target.value
        });
    }

    updateQuantity(event) {
        event.preventDefault()
        this.setState({
            quantity: event.target.value
        });
    }

    addItem(event){
        event.preventDefault()

        var items = this.state.items;
        
        items.push([
            this.state.product_id,
            this.state.quantity
        ]);
    
        this.setState({
          items: items
        });
    }
    
    renderRows(){
        var products = this.state.products
        var postItems = this.state.postItems;
        return this.state.items.map((item, index) => (
                     

            <tr key={"item-" + index}>
                <td>
                    <select
                        name={'item[' + index + '][id]'}
                        className='form-control'
                        >
                        <option value={products[item[0]]['id']}>{products[item[0]]['name']}</option>
                    </select>
                </td>
                <td>
                    <input
                        type="text"
                        className='form-control'
                        value={products[item[0]]['price']}
                        name={'item[' + index + '][unit_price]'} />
                </td>
                <td>
                    <input
                        type="text"
                        className='form-control'
                        value={item[1]}
                        name={'item[' + index + '][quantity]'} />
                </td>
                <td>
                    <button className='btn btn-danger'
                        onClick={this.handleItemDeleted.bind(this, index)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ))
    }

    handleItemDeleted(event, index){
        console.log(event)
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
                                <div className='col-md-6'><strong>Create Order</strong></div>
                                <div className='col-md-6'>
                                    <Link className='btn btn-primary btn-sm' style={{ float: 'right' }} to='/orders'>
                                        Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                        {this.renderErrorFor('message')}
                            <form id='form' onSubmit={this.handleCreateNewOrder}>

                                <div className='form-group'>
                                    <label htmlFor='name'>Select Customer</label>
                                    <select name='customer_id' id='customer_id' value={this.state.customer_id} className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`} onChange={this.handleCustomerID.bind(this)}>
                                        {this.state.customers.map( customer => (
                                            <option value={customer.id}>{customer.name}</option>
                                        ))}
                                    </select>
                                    {this.renderErrorFor('name')}
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className='col-md-5'>
                                        <div className='form-group'>
                                            <label htmlFor='name'>Select Product</label>
                                            <select 
                                                name="product_id"
                                                className='form-control'
                                                onChange={this.updateProductID.bind(this)}>
                                                    <option>Select Product</option>
                                                {this.state.products.map( (product, index) => (
                                                    <option value={index}>{product.name} ({product.price})</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-5'>
                                        <div className='form-group'>
                                            <label htmlFor='name'>Quantity</label>
                                            <input
                                                name='quantity'
                                                type="text"
                                                className='form-control'
                                                onChange={this.updateQuantity.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-2'>
                                        <button className="btn btn-info" onClick={this.addItem}> Add Item </button>
                                    </div>
                                </div>
                                <hr />
                                <h2>Products Added</h2>
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Unit Price</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.renderRows()}
                                    </tbody> 
                                </table>
                                <button className='btn btn-primary'>Create</button>
                            </form>
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
    <CreateOrder
        {...props}
        params={useParams()}
/>)