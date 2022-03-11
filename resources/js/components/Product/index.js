import React, { Component } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

class ProductList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            product_id: '',
            products: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        axios.get('/products').then(response => {
            this.setState({
                products: response.data
            })
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.delete('/product/delete/' + event.target.product_id.value);
        window.location.reload(false);
    }

    render () {
        const { products } = this.state
        if(this.props.loggedIn){
            return (
                <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='row'>
                                <div className='col-md-6'><strong>All Products</strong></div>
                                <div className='col-md-6'>
                                    <Link className='btn btn-primary btn-sm' style={{ float: 'right' }} to='/product/create'>
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
                                        <th>Min. Quantity</th>
                                        <th>Stock</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                    <tr>
                                        <td>
                                            <Link to={`/product/edit/${product.id}`} key={product.id}> {product.name}</Link>
                                        </td>
                                        <td>{product.min_quantity}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <form onSubmit={this.handleSubmit}>
                                                <input type='hidden' value={product.id} name='product_id' />
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
    <ProductList
        {...props}
        params={useParams()}
/>)