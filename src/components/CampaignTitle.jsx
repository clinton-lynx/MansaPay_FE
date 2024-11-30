import React from "react";

const CampaignTitle = ({ title }) => {
  return (
    <div style={{ 
      whiteSpace: "nowrap", 
      overflow: "hidden", 
      textOverflow: "ellipsis", 
      maxWidth: "300px" // Adjust the width as needed
    }}>
     {title}
    </div>
  );
};

export default CampaignTitle;
