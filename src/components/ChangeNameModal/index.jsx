import { useState, useEffect } from "react";
import { Modal } from 'react-bootstrap';
import { Button } from '../Button';

const ChangeNameModal = (props) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState({
        first_name: "",
        last_name: ""
    });
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
      props.handleSuccess('');
    });

    const _handleUpdate = (event) => {
        setName({
            ...name,
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
                first_name: name.first_name,
                last_name: name.last_name,
                username: localStorage.getItem("USERNAME")
            })
        }
        const response = await fetch(
            'http://localhost:3333/users/update/name',
            options
        ).then(response => response.json());

        if (response.success) {
            handleClose();
            props.handleSuccess('Name successfully changed!');
            props.updateUserState('name', name);
        }
    }
  
    return (
      <>
        <Button className="hover-button" onClick={handleShow}>Change name</Button>
  
        <Modal show={show} onHide={handleClose} className="bg-dark">
          <Modal.Header closeButton>
            <Modal.Title>Change Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form onSubmit={_handleSubmit}>
                <div className="search-box mb-3">
                  <input name="first_name" type="text" className="search-input" placeholder="New first name" value={name.first_name} onChange={_handleUpdate} />
                </div>
                <div className="search-box mb-3">
                  <input name="last_name" type="text" className="search-input" placeholder="New last name" value={name.last_name} onChange={_handleUpdate} />
                </div>
                <Button type="submit">Submit</Button>
              </form>
          </Modal.Body>
        </Modal>
      </>
    );
}
  
export default ChangeNameModal;