import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../redux/slices/sprite/slice";
import {
  add as addInstructionSet,
  remove as removeInstructionSet,
  addInstruction,
} from "../redux/slices/instructions/slice";
import MoveX from "./instructions/MoveX";
import MoveY from "./instructions/MoveY";
import MoveXY from "./instructions/MoveXY";
import TurnClockwise from "./instructions/TurnClockwise";
import TurnAntiClockwise from "./instructions/TurnAntiClockwise";
import GoTo from "./instructions/GoTo";
import GoToRandom from "./instructions/GoToRandom";
import Say from "./instructions/Say";
import Repeat from "./instructions/Repeat";
import Increase from "./instructions/Increase";
import Decrease from "./instructions/Decrease";

export default function MidArea() {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const sprites = useSelector((state) => state.sprite);
  const dispatch = useDispatch();
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState("0");
  const options = [
    { value: "", label: "--Choose--", imgSrc: "" },
    { value: "/icons/fig0.svg", label: "Cat", imgSrc: "/icons/fig0.svg" },
    {
      value: "/icons/fig1.svg",
      label: "Stick Figure",
      imgSrc: "/icons/fig1.svg",
    },
  ];
  const allInstructions = useSelector((state) => state.instructions);
  const currentInstructionSet = allInstructions.filter(
    (instructionSet) => instructionSet.id === currentCharacter
  )[0].instructions;

  const handleSelect = (characterValue) => {
    setSelectedCharacter(characterValue);
  };

  function generateUniqueId() {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 10000); // Random number from 0 to 9999
    return `${timestamp}-${randomNum}`;
  }

  function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleDrop(e) {
    e.preventDefault();
    const action = e.dataTransfer.getData("action");
    const uniqueId = generateUniqueId();

    if (action === "moveX") {
      const steps = e.dataTransfer.getData("steps");
      dispatch(
        addInstruction({
          id: currentCharacter,
          instruction: { uniqueId: uniqueId, action: "moveX", steps: steps },
        })
      );
    } else if (action === "moveY") {
      const steps = e.dataTransfer.getData("steps");
      dispatch(
        addInstruction({
          id: currentCharacter,
          instruction: { uniqueId: uniqueId, action: "moveY", steps: steps },
        })
      );
    } else if (action === "moveXY") {
      const stepsX = e.dataTransfer.getData("stepsX");
      const stepsY = e.dataTransfer.getData("stepsY");
      dispatch(
        addInstruction({
          id: currentCharacter,
          instruction: {
            uniqueId: uniqueId,
            action: "moveXY",
            stepsX: stepsX,
            stepsY: stepsY,
          },
        })
      );
    } else if (action === "turnClockwise") {
      const degrees = e.dataTransfer.getData("degrees");
      dispatch(
        addInstruction({
          id: currentCharacter,
          instruction: {
            uniqueId: uniqueId,
            action: "turnClockwise",
            degrees: degrees,
          },
        })
      );
    } else if (action === "turnAntiClockwise") {
      const degrees = e.dataTransfer.getData("degrees");
      dispatch(
        addInstruction({
          id: currentCharacter,
          instruction: {
            uniqueId: uniqueId,
            action: "turnAntiClockwise",
            degrees: degrees,
          },
        })
      );
    } else if (action === "goTo") {
      const x = e.dataTransfer.getData("x");
      const y = e.dataTransfer.getData("y");
      dispatch(
        addInstruction({
          id: currentCharacter,
          instruction: { uniqueId: uniqueId, action: "goTo", x: x, y: y },
        })
      );
    } else if (action === "goToRandom") {
      const randomX = generateRandomInt(-100, 100);
      const randomY = generateRandomInt(-100, 100);
      dispatch(
        addInstruction({
          id: currentCharacter,
          instruction: {
            uniqueId: uniqueId,
            action: "goToRandom",
            x: randomX,
            y: randomY,
          },
        })
      );
    } else if (action === "say") {
      const text = e.dataTransfer.getData("text");
      dispatch(
        addInstruction({
          id: currentCharacter,
          instruction: { uniqueId: uniqueId, action: "say", text: text },
        })
      );
    } else if (action === "repeat") {
      const times = e.dataTransfer.getData("times");
      dispatch(
        addInstruction({
          id: currentCharacter,
          instruction: { uniqueId: uniqueId, action: "repeat", times: times },
        })
      );
    } else if (action === "increase") {
      const size = e.dataTransfer.getData("size");
      dispatch(
        addInstruction({
          id: currentCharacter,
          instruction: { uniqueId: uniqueId, action: "increase", size: size },
        })
      );
    } else if (action === "decrease") {
      const size = e.dataTransfer.getData("size");
      dispatch(
        addInstruction({
          id: currentCharacter,
          instruction: { uniqueId: uniqueId, action: "decrease", size: size },
        })
      );
    }
  }

  return (
    <div className="flex-1 h-full overflow-auto">
      <div className="h-12 w-full bg-blue-200 flex justify-start items-center gap-2 pl-2 overflow-x-scroll">
        {sprites.map((sprite, index) => (
          <div
            className={`flex justify-around items-center ${
              sprite.id === currentCharacter ? "bg-blue-400" : "bg-blue-300"
            } hover:bg-blue-400 rounded-lg gap-6 pl-1 whitespace-nowrap py-1 ${
              sprite.id === "0" ? "w-20" : ""
            }`}
            key={`sprite_name_${index}`}
          >
            <p
              className=" cursor-pointer hover:underline hover:italic "
              onClick={() => {
                setCurrentCharacter(sprite.id);
              }}
            >
              {sprite.name}
            </p>
            {sprite.id !== "0" && (
              <img
                src="/icons/cross.svg"
                className="w-6 h-6 cursor-pointer"
                onClick={() => {
                  dispatch(remove(sprite.id));
                  setCurrentCharacter("0");
                  dispatch(removeInstructionSet(sprite.id));
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="border-b-2">
        <input
          type="text"
          value={name}
          placeholder="enter name"
          onChange={(e) => setName(e.target.value)}
          className="border border-black rounded-lg m-2 pl-1"
        ></input>
        <div className="relative inline-block mx-2">
          <div
            className="border border-black rounded-lg px-2 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <p>
              {selectedCharacter
                ? `Selected: ${selectedCharacter}`
                : "--Choose--"}
            </p>
          </div>

          <ul
            className={`absolute border border-black bg-white mt-2 w-40 rounded-lg z-10 ${
              !isOpen ? "hidden" : ""
            } `}
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  handleSelect(option.label);
                  setImg(option.value);
                  setIsOpen(false);
                }}
                className="flex items-center cursor-pointer p-2 hover:bg-gray-100"
              >
                {option.imgSrc && (
                  <img
                    src={option.imgSrc}
                    alt={option.label}
                    className="w-8 h-8 mr-2"
                  />
                )}
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="flex justify-start items-center border-2 border-black bg-gray-200 rounded-lg p-1 hover:bg-gray-300 m-2 pl-1"
          onClick={() => {
            if (name === "" || img === "") return;
            const uniqueId = generateUniqueId();
            dispatch(add({ id: uniqueId, name: name, img: img }));
            dispatch(addInstructionSet({ id: uniqueId }));
            setName("");
            setImg("");
            setSelectedCharacter("");
          }}
        >
          <div className="text-sm">Add</div>
          <img src="/icons/add.svg" className="w-5 h-5 inline"></img>
        </button>
      </div>
      <div
        className="w-full h-full bg-gray-100"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e)}
      >
        {currentInstructionSet.map((instruction, index) => (
          <div key={`instruction-${instruction.uniqueId}`}>
            {instruction.action === "moveX" && (
              <MoveX
                prevSteps={instruction.steps}
                id={currentCharacter}
                index={index}
                uniqueId={instruction.uniqueId}
              />
            )}
            {instruction.action === "moveY" && (
              <MoveY
                prevSteps={instruction.steps}
                id={currentCharacter}
                index={index}
                uniqueId={instruction.uniqueId}
              />
            )}
            {instruction.action === "moveXY" && (
              <MoveXY
                prevStepsX={instruction.stepsX}
                prevStepsY={instruction.stepsY}
                id={currentCharacter}
                index={index}
                uniqueId={instruction.uniqueId}
              />
            )}
            {instruction.action === "turnClockwise" && (
              <TurnClockwise
                prevDegrees={instruction.degrees}
                id={currentCharacter}
                index={index}
                uniqueId={instruction.uniqueId}
              />
            )}
            {instruction.action === "turnAntiClockwise" && (
              <TurnAntiClockwise
                prevDegrees={instruction.degrees}
                id={currentCharacter}
                index={index}
                uniqueId={instruction.uniqueId}
              />
            )}
            {instruction.action === "goTo" && (
              <GoTo
                prevX={instruction.x}
                prevY={instruction.y}
                id={currentCharacter}
                index={index}
                uniqueId={instruction.uniqueId}
              />
            )}
            {instruction.action === "goToRandom" && (
              <GoToRandom id={currentCharacter} index={index} />
            )}
            {instruction.action === "say" && (
              <Say
                prevText={instruction.text}
                id={currentCharacter}
                index={index}
                uniqueId={instruction.uniqueId}
              />
            )}
            {instruction.action === "repeat" && (
              <Repeat
                prevTimes={instruction.times}
                id={currentCharacter}
                index={index}
                uniqueId={instruction.uniqueId}
              />
            )}
            {instruction.action === "increase" && (
              <Increase
                prevSize={instruction.size}
                id={currentCharacter}
                index={index}
                uniqueId={instruction.uniqueId}
              />
            )}
            {instruction.action === "decrease" && (
              <Decrease
                prevSize={instruction.size}
                id={currentCharacter}
                index={index}
                uniqueId={instruction.uniqueId}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
