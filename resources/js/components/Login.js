import React from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
 
const Login = (props) => {
    //console.log(props)
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [toHome, setToHome] = React.useState(false);
    const [authError, setAuthError] = React.useState(false);
    const [unknownError, setUnknownError] = React.useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setAuthError(false);
        setUnknownError(false);
        axios.post('/login', {
            email: email,
            password: password
        }).then(response => {
            console.log(response)
            if (response.status === 200) {
                props.login();
                setToHome(true);
            }
        }).catch(error => {
            if (error.response && error.response.status === 422) {
                setAuthError(true);
            } else {
                setUnknownError(true);
                console.error(error);
            }
        });
    }

    
    if (toHome === true) {
        return <Navigate to='/' />
    }
    return (
        <div className='container py-4'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                <div className='card'>
                    <div className='card-header'>
                        <div className='row'>
                            <div className='col-md-6'><h1>Login</h1></div>
                        </div>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                           
                            {authError ? <div className="alert alert-danger">Credentials not recognised. Please try again.</div> : null}
                            {unknownError ? <div className="alert alert-danger">There was an error submitting your details.</div> : null}
                            <button className='btn btn-primary' type="submit">Login</button>
                        </form>
                    
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default (props) => (
    <Login
        {...props}
        params={useParams()}
/>)