import React, { useState } from "react";

export default function RoomInput(props) {
//   const [inputval, setinputval] = useState("");

  return (
    <div>
      {" "}
      <input
        type="number"
        placeholder="0"
        value={props.inputval}
        style={{
          width: "60px",
          height: "25px",
          marginLeft: "50px",
          textAlign: "center",
        }}
        onChange={(e) => {
          props.setinputval(e.target.value);
        }}
        required
      />
    </div>
  );
}
