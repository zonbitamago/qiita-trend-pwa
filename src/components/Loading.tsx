import React from "react";

// loading用cssはindex.htmlに直接記載
const Loading = () => {
  return (
    <div className="loading-container">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
