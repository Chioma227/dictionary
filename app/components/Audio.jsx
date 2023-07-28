import React from "react";

const Audio = ({ audioUrl }) => {
  return (
    <div>
      <audio controls>
        <source src={audioUrl} type="audio/mpeg" />
        your browser supports.
      </audio>
    </div>
  );
};

export default Audio;
