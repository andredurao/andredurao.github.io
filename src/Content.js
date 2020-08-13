import React from "react";
import "./Content.css";

function Content({
  command, content, contentKind, status,
}) {
  let contentResult;
  if (contentKind === "link") {
    contentResult = <a href={content} target="_blank" rel="noopener noreferrer">{content}</a>;
  } else {
    contentResult = <pre className={status}>{content}</pre>;
  }
  return (
    <div className="Content">
      <div id="prev">
        <pre>{command}</pre>
        { contentResult }
      </div>
    </div>
  );
}
export default Content;
