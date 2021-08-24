import { useEffect, useState } from "react";
import { Alert } from 'react-bootstrap';
import ChangeAvatarModal from "../../components/ChangeAvatarModal";
import ChangeNameModal from "../../components/ChangeNameModal";
import ChangePasswordModal from "../../components/ChangePasswordModal";

import './index.css';

const CurrentUserProfile = () => {

    const [user, setUser] = useState({});
    const [success, setSuccess] = useState('');
    const [registeredYear, setRegisteredYear] = useState('');

    useEffect(() => {
        (async () => {
            const username = localStorage.getItem('USERNAME');
            const response = await fetch(
                `https://api.swingspot.xyz/users/${username}`
            ).then(response => response.json());
            setUser(response);
            const date = new Date(user.registered_date);
            setRegisteredYear(date.getFullYear());
        })();
    }, [setUser]);

    const handleSuccess = (message) => {
        setSuccess(message);
    }

    const updateUserState = (target, value) => {
        if (target === 'name') {
            setUser({
                ...user, 
                first_name: value.first_name,
                last_name: value.last_name
            });
        } else {
            setUser({
                ...user,
                [target]: value
            });
        }
    }

    return (
        <>
            {!!user ? 
                <>
                    <div>
                        <div className="row align-items-center profile-header">
                            <div className="col-md-2 mb-3">
                                {!!user.picture ? <img
                                src={user.picture}
                                alt="Profile"
                                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                                /> : ''}
                            </div>
                            <div className="col-md text-center text-md-left">
                                <h2>{user.first_name} {user.last_name}</h2>
                                <p className="lead text-muted">{user.username}</p>
                                <p className="text-muted">Joined in {registeredYear}</p>
                            </div>
                        </div>
                    </div>
                    {!!success ? 
                        <Alert>
                            {success}
                        </Alert>
                    :
                        ''
                    }
                    <div className="row profile-cards">
                        <div className="card p-3 mb-2 d-flex align-items-center justify-content-between flex-row">
                            <div className="d-flex flex-column">
                                <span><strong>Avatar</strong></span>
                                <img className="rounded-circle mt-2 img-fluid" src={user.picture} width={60}/>
                            </div>
                            <ChangeAvatarModal handleSuccess={handleSuccess} updateUserState={updateUserState} />
                        </div>
                        <div className="card p-3 mb-2 d-flex align-items-center justify-content-between flex-row">
                            <div className="d-flex flex-column">
                                <span><strong>Name</strong></span>
                                <span>{user.first_name} {user.last_name}</span>
                            </div>
                            <ChangeNameModal handleSuccess={handleSuccess} updateUserState={updateUserState} />
                        </div>
                        <div className="card p-3 mb-2 d-flex align-items-center justify-content-between flex-row">
                            <div className="d-flex flex-column">
                                <span><strong>Email</strong></span>
                                <span>{user.email}</span>
                            </div>
                        </div>
                        <div className="card p-3 mb-2 d-flex align-items-center justify-content-between flex-row">
                            <div className="d-flex flex-column">
                                <span><strong>Username</strong></span>
                                <span>{user.username}</span>
                            </div>
                            {/* <ChangeUsernameModal handleSuccess={handleSuccess} updateUserState={updateUserState} /> */}
                        </div>
                        <div className="card p-3 mb-2 d-flex align-items-center justify-content-between flex-row">
                            <div className="d-flex flex-column">
                                <span><strong>Password</strong></span>
                                <span>•••••••••••••</span>
                            </div>
                            <ChangePasswordModal handleSuccess={handleSuccess} updateUserState={updateUserState} />
                        </div>
                    </div>
                </>
            :
                <div>
                    <p>Loading...</p>
                </div>
            }
        </>
    );
}

export default CurrentUserProfile;