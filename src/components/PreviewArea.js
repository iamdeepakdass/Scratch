import React, { useRef, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  editInstruction,
  resetInstructions,
} from "../redux/slices/instructions/slice";
import { resetSprites } from "../redux/slices/sprite/slice";
import anime from "animejs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PreviewArea() {
  const dispatch = useDispatch();
  const sprites = useSelector((state) => state.sprite);
  const isPlayingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const spriteRefs = useRef([]);
  const spriteInstructions = useSelector((state) => state.instructions);
  const [position, setPosition] = useState([]);
  const [rotation, setRotation] = useState([]);
  const [scale, setScale] = useState([]);
  let instructionsIndex = 0;

  function checkIfInstructionLeft(instructionsIndex) {
    for (let i = 0; i < spriteInstructions.length; i++) {
      if (
        spriteInstructions[i].instructions &&
        spriteInstructions[i].instructions.length > instructionsIndex
      ) {
        return true;
      }
    }

    return false;
  }

  const animateSprites = useCallback(
    async (instructionsIndex = 0) => {
      if (!checkIfInstructionLeft(instructionsIndex) || !isPlayingRef.current) {
        isPlayingRef.current = false;
        setIsPlaying((prev) => !prev);
        return;
      }

      const animationPromises = [];

      for (let i = 0; i < spriteInstructions.length; i++) {
        if (
          spriteInstructions[i].instructions &&
          spriteInstructions[i].instructions[instructionsIndex]
        ) {
          let instruction =
            spriteInstructions[i].instructions[instructionsIndex];

          let animation;
          switch (instruction.action) {
            case "moveX":
              animation = anime({
                targets: spriteRefs.current[i],
                translateX: `+=${instruction.steps}`,
                easing: "linear",
                duration: 500,
              });
              position[i].x += instruction.steps;
              break;

            case "moveY":
              animation = anime({
                targets: spriteRefs.current[i],
                translateY: `+=${instruction.steps}`,
                easing: "linear",
                duration: 500,
              });
              position[i].y += instruction.steps;
              break;
            case "moveXY":
              animation = anime({
                targets: spriteRefs.current[i],
                translateX: `+=${instruction.stepsX}`,
                translateY: `+=${instruction.stepsY}`,
                easing: "linear",
                duration: 500,
              });
              position[i].x += instruction.stepsX;
              position[i].y += instruction.stepsY;
              break;
            case "turnClockwise":
              animation = anime({
                targets: spriteRefs.current[i],
                rotateZ: `+=${instruction.degrees / 360}turn`,
                easing: "linear",
                duration: 500,
              });
              rotation[i] += instruction.degrees;
              break;
            case "turnAntiClockwise":
              animation = anime({
                targets: spriteRefs.current[i],
                rotateZ: `-=${instruction.degrees / 360}turn`,
                easing: "linear",
                duration: 500,
              });
              rotation[i] -= instruction.degrees;
              break;
            case "goTo":
              animation = anime({
                targets: spriteRefs.current[i],
                translateX: `+=${instruction.x - position[i].x}`,
                translateY: `+=${instruction.y - position[i].y}`,
                easing: "linear",
                duration: 500,
              });
              position[i].x = instruction.x;
              position[i].y = instruction.y;
              break;
            case "goToRandom":
              animation = anime({
                targets: spriteRefs.current[i],
                translateX: `+=${instruction.x - position[i].x}`,
                translateY: `+=${instruction.y - position[i].y}`,
                easing: "linear",
                duration: 500,
              });
              position[i].x = instruction.x;
              position[i].y = instruction.y;
              break;
            case "repeat":
              if (instruction.times > 0) {
                dispatch(
                  editInstruction({
                    id: spriteInstructions[i].id,
                    instruction: {
                      ...instruction,
                      times: instruction.times - 1,
                    },
                  })
                );
                instructionsIndex = -1;
              }
              break;
            case "increase":
              animation = anime({
                targets: spriteRefs.current[i],
                scale: `${instruction.size}`,
                easing: "linear",
                duration: 500,
              });
              scale[i] *= instruction.size;
              break;
            case "decrease":
              animation = anime({
                targets: spriteRefs.current[i],
                scale: `${scale[i] / instruction.size}`,
                easing: "linear",
                duration: 500,
              });
              scale[i] /= instruction.size;
              break;
            case "say":
              const text = instruction.text;
              const notify = () => toast(text);
              notify();
              break;

            // ... other cases ...
            default:
              console.log(`Unknown action: ${instruction.action}`);
          }

          if (animation) {
            animationPromises.push(animation.finished);
          }
        }
      }

      await Promise.all(animationPromises);

      await animateSprites(instructionsIndex + 1);
    },
    [spriteInstructions]
  );

  useEffect(() => {
    // Initialize the refs array with the correct length
    spriteRefs.current = spriteRefs.current.slice(0, sprites.length);
    setPosition(Array(sprites.length).fill({ x: 0, y: 0 }));
    setRotation(Array(sprites.length).fill(0));
    setScale(Array(sprites.length).fill(1));
  }, [sprites]);

  return (
    <div className="relative flex-none h-screen w-full overflow-y-auto p-2">
      {sprites.map((sprite, index) => (
        <img
          key={`sprite_${index}`}
          ref={(el) => (spriteRefs.current[index] = el)}
          src={sprite.img}
          className="w-28 h-28"
          alt={`Sprite ${index + 1}`}
          style={{
            transformOrigin: `center center`,
          }}
        />
      ))}

      {isPlaying && (
        <img
          src="/icons/pause.svg"
          alt="Pause"
          className="absolute bottom-10 right-2 w-8 h-8 cursor-pointer"
          onClick={() => {
            isPlayingRef.current = false;
            setIsPlaying((prev) => !prev);
          }}
        />
      )}
      {!isPlaying && (
        <img
          src="/icons/play.svg"
          alt="Play"
          className="absolute bottom-10 right-2 w-8 h-8 cursor-pointer"
          onClick={async () => {
            setIsPlaying((prev) => !prev);
            isPlayingRef.current = true;
            await animateSprites(instructionsIndex);
            instructionsIndex = 0;
          }}
        />
      )}
      <img
        src="/icons/reset.svg"
        alt="Reset"
        className="absolute bottom-10 right-2 w-8 h-8 mr-10 cursor-pointer"
        onClick={() => {
          dispatch(resetInstructions());
          dispatch(resetSprites());
          anime({
            targets: spriteRefs.current[0],
            translateX: 0,
            translateY: 0,
            rotateZ: 0,
            scale: 1,
            easing: "steps(1)", // make it quick
            duration: 500,
          });
        }}
      />
      <ToastContainer />
    </div>
  );
}
