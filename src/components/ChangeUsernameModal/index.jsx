import { useState, useEffect } from "react";
import { Modal } from 'react-bootstrap';
import { Button } from '../Button';

const ChangeUsernameModal = (props) => {
    const [show, setShow] = useState(false);
    const [newUsername, setNewUsername] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        props.handleSuccess('');
    });

    const _handleUpdate = (event) => {
        setNewUsername(event.target.value);
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
                newUsername: newUsername,
                username: localStorage.getItem("USERNAME")
            })
        }
        const response = await fetch(
            'http://localhost:3333/users/update/username',
            options
        ).then(response => response.json());

        if (response.success) {
            handleClose();
            props.handleSuccess('Username successfully changed!');
            props.updateUserState('username', newUsername);
        }
    }

    return (
        <>
            <Button className="hover-button" onClick={handleShow}>Change username</Button>
    
            <Modal show={show} onHide={handleClose} className="bg-dark">
            <Modal.Header closeButton>
                <Modal.Title>Change Username</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={_handleSubmit}>
                    <div className="search-box mb-3">
                        <input name="newUsername" type="text" className="search-input" placeholder="New username" value={newUsername} onChange={_handleUpdate} />
                    </div>
                    <Button className="hover-button" type="submit">Submit</Button>
                </form>
            </Modal.Body>
            </Modal>
        </>
    )
}

export default ChangeUsernameModal;