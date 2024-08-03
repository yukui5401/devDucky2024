import React from "react";

const CenteredParagraph = ({ children }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-lg font-semibold text-gray-800 text-center max-w-2xl">
        {children}
      </p>
    </div>
  );
};

export default CenteredParagraph;
