import { useState } from "react"
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

const LoginForm = (props) => {

    const history = useHistory();

    const [inputData, setInputData] = useState({
        email: "",
        password: ""
    });

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
            history.push(`/`);
            return response.json()
        }).catch(error => {
            return error;
        });

        if (response.success) {
            localStorage.setItem('TOKEN', response.token);
            localStorage.setItem('USERNAME', response.username);
            props.onLoggedIn();
        }
        
    }

    return (
        <>
            <header className="page-header">
                <h1>Log In</h1>
            </header>
            <form onSubmit={_handleSubmit}>
                <div className="search-box mb-3">
                    <input name="email" className="search-input" type="email" placeholder="Email" value={inputData.email} onChange={_handleUpdate}/>
                </div>
                <div className="search-box mb-3">
                    <input name="password" className="search-input" type="password" placeholder="Password" value={inputData.last_name} onChange={_handleUpdate}/>
                </div>
                <button type="submit">Log In</button>
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