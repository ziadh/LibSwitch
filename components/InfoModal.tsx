import React, { useState } from "react";
import { Button, Modal } from "react-daisyui";
import { FaTimes } from "react-icons/fa";
import ChangelogModal from "./ChangelogModal";
import Image from "next/image";
import Link from "next/link";

interface InfoModalProps {
  showInfo: boolean;
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
  version: string;
}

const InfoModal: React.FC<InfoModalProps> = ({
  showInfo,
  setShowInfo,
  version,
}) => {
  const [showChangelog, setShowChangelog] = useState(false);

  return (
    <>
      <Modal open={showInfo}>
        <Modal.Header className="font-bold flex justify-between items-center">
          <div className="flex gap-2 items-center justify-start">
            <Image src="/logo-trans.png" alt="Logo" width={50} height={50} />

            <span>About CompSwitch</span>
          </div>
          <div>
            <Button color="ghost" size="sm" onClick={() => setShowInfo(false)}>
              <FaTimes />
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p>
            CompSwitch is a tool for converting code between different libraries
            and frameworks. It uses AI to perform the conversions.
          </p>
          <p className="mt-2">
            Please note that while the AI strives for accuracy, the converted
            code may require manual adjustments for optimal functionality.
          </p>
          <p className="mt-2">Version: v{version}</p>
          <div className="mt-4 flex justify-between">
            <button
              className="text-blue-400 hover:text-blue-500"
              onClick={() => setShowChangelog(true)}
            >
              Changelog
            </button>
            <Link
              href="https://github.com/ziadh/Comp_switch"
              className="text-blue-400 hover:text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </Link>
            <Link
              href="https://insigh.to/b/compswitch"
              className="text-blue-400 hover:text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              Feedback
            </Link>
          </div>
        </Modal.Body>
      </Modal>
      <ChangelogModal
        showChangelog={showChangelog}
        setShowChangelog={setShowChangelog}
      />
    </>
  );
};

export default InfoModal;
