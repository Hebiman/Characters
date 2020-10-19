import React from "react";

const SisterSlider = ({ title, textParagraphs = [], image }) => {
  return (
    <div>
      <p className="title">{title}</p>
      <div className="card paragraph">
        <div className="left-side">
          {textParagraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <div className="right-side">
          <img src={image} alt={`O'ndanya Hebi ${title}`} />
        </div>
      </div>
    </div>
  );
};

export default SisterSlider;
