import { changelogList } from "@/util/changelog";
import React from "react";
import { Button, Modal } from "react-daisyui";
import { FaTimes } from "react-icons/fa";
import { MdHistoryToggleOff } from "react-icons/md";
import ChangelogTile from "./ChangelogTile";

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
        <div className="space-y-8">
          {changelogList.versions.map((versionInfo, index) => (
            <ChangelogTile
              key={index}
              version={versionInfo.version}
              date={versionInfo.date}
              changes={versionInfo.changes}
            />
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChangelogModal;
