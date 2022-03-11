import React, { Component } from 'react'
import { Navigate, useParams } from 'react-router-dom';
const Dashboard = (props) => {
    console.log(props)
    if (props.loggedIn) {
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header'>Dashboard</div>
                            <div className='card-body'>
                                <p>Welcome to 7Eye</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return(
        <Navigate to='/login' />
    );
};

export default (props) => (
    <Dashboard
        {...props}
        params={useParams()}
/>)