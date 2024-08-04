import React from "react";
import { Button, Modal } from "react-daisyui";
import { FaTimes } from "react-icons/fa";
import { MdHistoryToggleOff } from "react-icons/md";

interface ChangelogModalProps {
  showChangelog: boolean;
  setShowChangelog: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangelogModal: React.FC<ChangelogModalProps> = ({
  showChangelog,
  setShowChangelog,
}) => {
  return (
    <Modal open={showChangelog}>
      <Modal.Header className="font-bold flex justify-between items-center">
        <div className="flex gap-2 items-center justify-start">
          <MdHistoryToggleOff />
          <span>Changelog</span>
        </div>
        <Button color="ghost" size="sm" onClick={() => setShowChangelog(false)}>
          <FaTimes />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Version 1.0</h3>
          <h3>8/10/2024</h3>
        </div>
        <ul className="list-disc list-inside">
          <li>Initial release of CompSwitch</li>
          <li>
            Support for converting between Flutter, React Native, React, Vue,
            Angular, and Svelte
          </li>
          <li>Conversion history feature</li>
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default ChangelogModal;
