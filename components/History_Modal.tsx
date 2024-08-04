import React from "react";
import { Button, Modal } from "react-daisyui";
import { FaTimes, FaTrash } from "react-icons/fa";
import { MdOutlineHistory } from "react-icons/md";
import styles from "./dashboard.module.css";
import { Library } from "@/util/constants";
interface ConversionHistoryItem {
  from: Library;
  to: Library;
  input: string;
  output: string;
  timestamp: string;
}

interface HistoryModalProps {
  showHistory: boolean;
  setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;
  conversionHistory: ConversionHistoryItem[];
  handleHistoryItemClick: (item: ConversionHistoryItem) => void;
  handleDeleteHistoryItem: (index: number) => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  showHistory,
  setShowHistory,
  conversionHistory,
  handleHistoryItemClick,
  handleDeleteHistoryItem,
}) => {
  return (
    <Modal open={showHistory}>
      <Modal.Header className="font-bold flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <MdOutlineHistory />
          <span>Conversion History</span>
        </div>
        <Button color="ghost" size="sm" onClick={() => setShowHistory(false)}>
          <FaTimes />
        </Button>
      </Modal.Header>
      <Modal.Body
        className={`max-h-[70vh] overflow-y-auto ${styles.customScrollbar}`}
      >
        {conversionHistory.length > 0 ? (
          conversionHistory.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center hover:bg-gray-700 p-2 rounded mb-2"
            >
              <div
                className="cursor-pointer flex-grow"
                onClick={() => handleHistoryItemClick(item)}
              >
                <p className="font-semibold">
                  {item.from} to {item.to} - {item.input.substring(0, 30)}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
              <Button
                color="error"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteHistoryItem(index);
                }}
              >
                <FaTrash />
              </Button>
            </div>
          ))
        ) : (
          <p>No conversion history available.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default HistoryModal;
