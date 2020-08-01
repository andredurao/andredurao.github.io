import React from "react";

function Content({ content }) {
  return (
    <div className="Content">
      <div id="prev">
        <pre>{content}</pre>
      </div>
    </div>
  );
}

export default Content;
