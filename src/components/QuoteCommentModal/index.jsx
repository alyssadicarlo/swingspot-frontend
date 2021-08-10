import { useState } from "react";
import QuoteCommentForm from '../QuoteCommentForm';
import { Button, Modal } from 'react-bootstrap';

const QuoteCommentModal = ({ comment, topic_slug }) => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Quote comment
        </Button>
  
        <Modal show={show} onHide={handleClose} className="bg-dark">
          <Modal.Header closeButton>
            <Modal.Title>Quote Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <QuoteCommentForm comment={comment} topic_slug={topic_slug} handleClose={handleClose} />
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
        </Modal>
      </>
    );
}
  
export default QuoteCommentModal;