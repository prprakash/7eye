import React, { Component, useReducer } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

class EditCustomer extends React.Component {
    state = { message: "Loading..." };
    
    constructor (props) {
        super(props)
        console.log(this.props)
        this.state = {
            customer_id: this.props.params.id,
            name: '',
            email: '',
            phone: '',
            address: '',
            message: '',
            errors: []
        }
        
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleUpdateCustomer = this.handleUpdateCustomer.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }
  
    
    componentDidMount () {
        var id = this.state.customer_id
        axios.get('/customer/edit/' + id).then(response => {
            console.log(response.data)
            this.setState({
                id: response.data.id,
                name: response.data.name,
                phone: response.data.phone,
                email: response.data.email,
                address: response.data.address,
            })
        })
    }

    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUpdateCustomer (event) {
        event.preventDefault()

        const { history } = this.props

        const customer = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address
        }

        axios.post('/customer/update', customer)
        .then(response => {
            document.getElementById("form").reset();
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
                                    <Link className='btn btn-primary btn-sm' style={{ float: 'right' }} to='/customers'>
                                        Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                        {this.renderErrorFor('message')}
                            <form id='form' onSubmit={this.handleUpdateCustomer}>
                                <input type='hidden' name='id' value={this.state.id} />
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
                                    <label htmlFor='name'>Phone</label>
                                    <input
                                    id='phone'
                                    type='text'
                                    className={`form-control ${this.hasErrorFor('phone') ? 'is-invalid' : ''}`}
                                    name='phone'
                                    value={this.state.phone}
                                    onChange={this.handleFieldChange}
                                    />
                                    {this.renderErrorFor('phone')}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='name'>Email</label>
                                    <input
                                    id='email'
                                    type='email'
                                    className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.handleFieldChange}
                                    />
                                    {this.renderErrorFor('email')}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='name'>Address</label>
                                    <input
                                    id='address'
                                    type='text'
                                    className={`form-control ${this.hasErrorFor('address') ? 'is-invalid' : ''}`}
                                    name='address'
                                    value={this.state.address }
                                    onChange={this.handleFieldChange}
                                    />
                                    {this.renderErrorFor('address')}
                                </div>
                                <button className='btn btn-primary'>Update</button>
                                
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
    <EditCustomer
        {...props}
        params={useParams()}
/>)