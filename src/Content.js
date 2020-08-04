import React from "react";
import "./Content.css";

function Content({ command, content, status }) {
  return (
    <div className="Content">
      <div id="prev">
        <pre>{command}</pre>
        <pre className={status}>{content}</pre>
      </div>
    </div>
  );
}
export default Content;
