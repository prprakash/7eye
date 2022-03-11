import React, { Component } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
class CreateProduct extends Component {
    state = { message: "Loading..." };
    constructor (props) {
        super(props)
        this.state = {
            name: '',
            min_quantity: '',
            stock: '',
            price: '',
            message: '',
            errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewProduct = this.handleCreateNewProduct.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateNewProduct (event) {
        event.preventDefault()

        const { history } = this.props

        const product = {
            name: this.state.name,
            min_quantity: this.state.min_quantity,
            stock: this.state.stock,
            price: this.state.price
        }

        axios.post('/product/create', product)
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


    render () {
        if(this.props.loggedIn){
            return (
                <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='row'>
                                <div className='col-md-6'><strong>Create Product</strong></div>
                                <div className='col-md-6'>
                                    <Link className='btn btn-primary btn-sm' style={{ float: 'right' }} to='/products'>
                                        Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                        {this.renderErrorFor('message')}
                            <form id='form' onSubmit={this.handleCreateNewProduct}>
                                <div className='form-group'>
                                    <label htmlFor='name'>Name</label>
                                    <input
                                    id='name'
                                    type='text'
                                    className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                    name='name'
                                    value={this.state.name}
                                    onChange={this.handleFieldChange}
                                    />
                                    {this.renderErrorFor('name')}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='name'>Minimum Quanity</label>
                                    <input
                                    id='min_quantity'
                                    type='text'
                                    className={`form-control ${this.hasErrorFor('min_quantity') ? 'is-invalid' : ''}`}
                                    name='min_quantity'
                                    value={this.state.min_quantity}
                                    onChange={this.handleFieldChange}
                                    />
                                    {this.renderErrorFor('min_quantity')}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='name'>Stock</label>
                                    <input
                                    id='stock'
                                    type='text'
                                    className={`form-control ${this.hasErrorFor('stock') ? 'is-invalid' : ''}`}
                                    name='stock'
                                    value={this.state.stock}
                                    onChange={this.handleFieldChange}
                                    />
                                    {this.renderErrorFor('stock')}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='name'>Price</label>
                                    <input
                                    id='price'
                                    type='text'
                                    className={`form-control ${this.hasErrorFor('price') ? 'is-invalid' : ''}`}
                                    name='price'
                                    value={this.state.price}
                                    onChange={this.handleFieldChange}
                                    />
                                    {this.renderErrorFor('price')}
                                </div>
                                
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
    <CreateProduct
        {...props}
        params={useParams()}
/>)