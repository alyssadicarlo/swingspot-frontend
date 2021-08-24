import { useEffect, useState } from "react";
import { Modal, Alert } from 'react-bootstrap';
import { Button } from '../Button';

const ChangePasswordModal = (props) => {
    const [credentials, setCredentials] = useState({
        currentPassword: "",
        newPassword: ""
    });
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        props.handleSuccess('');
    }, [props]);

    const _handleUpdate = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    }

    const _handleSubmit = async (event) => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: { 
                'Content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem("TOKEN")}`
            },
            body: JSON.stringify({
                currentPassword: credentials.currentPassword,
                newPassword: credentials.newPassword,
                username: localStorage.getItem("USERNAME")
            })
        }
        const response = await fetch(
            'https://api.swingspot.xyz/users/update/password',
            options
        ).then(response => response.json());

        if (response.success) {
            handleClose();
            setError('');
            props.handleSuccess("Password successfully changed!");
        } else {
            setError(response.message);
            setCredentials({
                currentPassword: "",
                newPassword: ""
            });
        }
    }

    return (
        <>
            <Button className="hover-button" onClick={handleShow}>Change password</Button>
    
            <Modal show={show} onHide={handleClose} className="bg-dark">
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!!error ? 
                    <>
                        <Alert variant='danger'>
                            {error}
                        </Alert>
                    </>
                :
                    ''
                }
                <form onSubmit={_handleSubmit}>
                    <div className="search-box mb-3">
                        <input name="currentPassword" type="password" className="search-input" placeholder="Current password" value={credentials.currentPassword} onChange={_handleUpdate} />
                    </div>
                    <div className="search-box mb-3">
                        <input name="newPassword" type="password" className="search-input" placeholder="New password" value={credentials.newPassword} onChange={_handleUpdate} />
                    </div>
                    <Button className="hover-button" type="submit">Submit</Button>
                </form>
            </Modal.Body>
            </Modal>
        </>
    )
}

export default ChangePasswordModal;