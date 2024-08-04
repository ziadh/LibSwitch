import React from 'react';
import { Button, Modal } from "react-daisyui";
import { FaTimes } from "react-icons/fa";

interface FeedbackModalProps {
  showFeedback: boolean;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ showFeedback, setShowFeedback }) => {
  return (
    <Modal open={showFeedback}>
      <Modal.Header className="font-bold flex justify-between items-center">
        <span>Feedback</span>
        <Button
          color="ghost"
          size="sm"
          onClick={() => setShowFeedback(false)}
        >
          <FaTimes />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <p>
          We value your feedback! Please share your thoughts, suggestions, or report any issues youve encountered:
        </p>
        <textarea 
          className="w-full h-32 p-2 mt-4 border rounded"
          placeholder="Enter your feedback here..."
        ></textarea>
        <Button color="primary" className="mt-4">Submit Feedback</Button>
      </Modal.Body>
    </Modal>
  );
};

export default FeedbackModal;