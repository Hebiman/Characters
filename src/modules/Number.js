import React, { useState } from "react";
import { randomNumber } from "../utils";

const Number = () => {
  const [number, setNumber] = useState(30);
  const onClick = () => {
    setNumber(randomNumber(0, 100));
  };
  return (
    <span onClick={onClick} style={{ userSelect: "none" }}>
      {number}
    </span>
  );
};

export default Number;
