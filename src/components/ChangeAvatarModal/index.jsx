import { useState, useEffect } from "react";
import { Modal } from 'react-bootstrap';
import { Button } from '../Button';

const ChangeAvatarModal = (props) => {
    const [show, setShow] = useState(false);
    const [url, setUrl] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
      props.handleSuccess('');
    });

    const _handleUpdate = (event) => {
        setUrl(event.target.value);
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
                picture: url,
                username: localStorage.getItem("USERNAME")
            })
        }
        const response = await fetch(
            'http://localhost:3333/users/update/picture',
            options
        ).then(response => response.json());

        if (response.success) {
          handleClose();
          props.handleSuccess('Avatar successfully changed!');
          props.updateUserState('picture', url);
        }
    }
  
    return (
      <>
        <Button className="hover-button" onClick={handleShow}>Change picture</Button>
  
        <Modal show={show} onHide={handleClose} className="bg-dark">
          <Modal.Header closeButton>
            <Modal.Title>Change Avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form onSubmit={_handleSubmit}>
                <div className="search-box mb-3">
                  <input type="text" className="search-input" placeholder="New image url" value={url} onChange={_handleUpdate} />
                </div>
                <Button type="submit">Submit</Button>
              </form>
          </Modal.Body>
        </Modal>
      </>
    );
}
  
export default ChangeAvatarModal;