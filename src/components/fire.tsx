import React from "react";

export const Fire: React.FC = () => {
  return (
    <div className="fire">
      <div className="flames">
        <div className="flame" />
        <div className="flame" />
        <div className="flame" />
        <div className="flame" />
      </div>
      <div className="logs" />
    </div>
  );
};
