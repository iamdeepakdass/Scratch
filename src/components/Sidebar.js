import React from "react";
import MoveX from "./actions/MoveX";
import MoveY from "./actions/MoveY";
import MoveXY from "./actions/MoveXY";
import TurnClockwise from "./actions/TurnClockwise";
import TurnAntiClockwise from "./actions/TurnAntiClockwise";
import GoTo from "./actions/GoTo";
import GoToRandom from "./actions/GoToRandom";
import Say from "./actions/Say";
import Repeat from "./actions/Repeat";
import Increase from "./actions/Increase";
import Decrease from "./actions/Decrease";

export default function Sidebar() {
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> Actions </div>
      <MoveX />
      <MoveY />
      <MoveXY />
      <TurnClockwise />
      <TurnAntiClockwise />
      <GoTo />
      <GoToRandom />
      <Say />
      <Repeat />
      <Increase />
      <Decrease />
    </div>
  );
}
