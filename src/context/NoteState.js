import React from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const state = {
    name: "Mahbub",
    company: "Insta Web",
    position: "Developer",
  };
  return (
    <NoteContext.Provider value={state}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
