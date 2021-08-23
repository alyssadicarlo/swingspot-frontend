import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from '../Button';
import { Alert } from 'react-bootstrap';

const SignupForm = () => {

    const history = useHistory();

    const [inputData, setInputData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState('');

    const _handleUpdate = (event) => {
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value,
        });
    }

    const _handleSubmit = async (event) => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                first_name: inputData.first_name,
                last_name: inputData.last_name,
                username: inputData.username,
                email: inputData.email,
                password: inputData.password
            })
        }

        const response = await fetch(
            'http://localhost:3333/users/add',
            options
        ).then(response => response.json());
        
        if (response.success) {
            history.push(`/`);
            setError('');
        } else {
            setError(response.message);
            setInputData({
                first_name: "",
                last_name: "",
                username: "",
                email: "",
                password: ""
            })
        }
    }

    return (
        <>
            <header className="page-header">
                <h1>Sign Up</h1>
            </header>
            {!!error ? 
                <Alert variant="danger">
                    {error}
                </Alert>
            :
                ''
            }
            <form onSubmit={_handleSubmit}>
                <div className="search-box mb-3">
                    <input name="first_name" className="search-input" type="text" placeholder="First Name" value={inputData.first_name} onChange={_handleUpdate}/>
                </div>
                <div className="search-box mb-3">
                    <input name="last_name" className="search-input" type="text" placeholder="Last Name" value={inputData.last_name} onChange={_handleUpdate}/>
                </div>
                <div className="search-box mb-3">
                    <input name="username" className="search-input" type="text" placeholder="Username" value={inputData.username} onChange={_handleUpdate}/>
                </div>
                <div className="search-box mb-3">
                    <input name="email" className="search-input" type="email" placeholder="Email" value={inputData.email} onChange={_handleUpdate}/>
                </div>
                <div className="search-box mb-3">
                    <input name="password" className="search-input" type="password" placeholder="Password" value={inputData.password} onChange={_handleUpdate}/>
                </div>
                <Button className="hover-button" type="submit">Sign Up</Button>
            </form>
        </>
    )
}

export default SignupForm;