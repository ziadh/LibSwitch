import React from "react";
interface ChangelogTileProps {
  version: string;
  date: string;
  changes: {
    description: string;
    details: string[];
  }[];
}
const ChangelogTile: React.FC<ChangelogTileProps> = ({
  version,
  date,
  changes,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Version v{version}</h3>
        <h3>{date}</h3>
      </div>
      <ul className="list-disc list-inside">
        {changes.map((change, index) => (
          <li key={index}>
            <strong>{change.description}</strong>
            <ul className="list-disc list-inside ml-4">
              {change.details.map((detail, detailIndex) => (
                <li key={detailIndex}>{detail}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChangelogTile;
