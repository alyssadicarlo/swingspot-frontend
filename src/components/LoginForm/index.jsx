import { useState } from "react"
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { Button } from '../Button';
import { Alert } from 'react-bootstrap';

const LoginForm = (props) => {

    const history = useHistory();

    const [inputData, setInputData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const _handleUpdate = (event) => {
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value
        });
    }

    const _handleSubmit = async (event) => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(inputData)
        }

        const response = await fetch(
            'https://api.swingspot.xyz/users/login',
            options
        ).then(response => {
            return response.json()
        });

        if (response.success) {
            localStorage.setItem('TOKEN', response.token);
            localStorage.setItem('USERNAME', response.username);
            props.onLoggedIn();
            history.push('/');
            setError('');
        } else {
            setError(response.message);
            setInputData({
                email: '',
                password: ''
            })
        }
        
    }

    return (
        <>
            {!!error ? 
                <Alert variant="danger">
                    {error}
                </Alert>
            :
                ''
            }
            <form onSubmit={_handleSubmit}>
                <div className="search-box mb-3">
                    <input name="email" className="search-input" type="email" placeholder="Email" value={inputData.email} onChange={_handleUpdate}/>
                </div>
                <div className="search-box mb-3">
                    <input name="password" className="search-input" type="password" placeholder="Password" value={inputData.password} onChange={_handleUpdate}/>
                </div>
                <Button className="hover-button" type="submit">Log In</Button>
            </form>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoggedIn: () => dispatch({type: 'ON_LOGGED_IN'})
    }
}

export default connect(null, mapDispatchToProps)(LoginForm);