import React, { useRef, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  editInstruction,
  resetInstructions,
} from "../redux/slices/instructions/slice";
import { resetSprites } from "../redux/slices/sprite/slice";
import Matter, { Bodies } from "matter-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PreviewArea() {
  const dispatch = useDispatch();
  const sprites = useSelector((state) => state.sprite);
  const isPlayingRef = useRef(false);
  const divCanvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const spriteRefs = useRef([]);
  const spriteInstructions = useSelector((state) => state.instructions);
  const [spriteObjects, setSpriteObjects] = useState([]);
  const [position, setPosition] = useState([]);
  const [rotation, setRotation] = useState([]);
  const [scale, setScale] = useState([]);
  let instructionsIndex = 0;

  let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

  const [world, setWorld] = useState();
  const [engine, setEngine] = useState();
  const [runner, setRunner] = useState();
  const [render, setRender] = useState();

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

          let animation = null;
          switch (instruction.action) {
            case "moveX":
              animation = new Promise((resolve, reject) => {
                Body.setVelocity(spriteObjects[i], {
                  x: 1 * (parseInt(instruction.steps) > 0 ? 1 : -1),
                  y: 0,
                });
                setTimeout(() => {
                  Body.setVelocity(spriteObjects[i], { x: 0, y: 0 });
                  const updatedPosition = [...position];
                  updatedPosition[i].x += instruction.steps;

                  setPosition(updatedPosition);
                  resolve();
                }, 1000 * Math.abs(parseInt(instruction.steps)));
              });
              break;

            case "moveY":
              console.log(instruction.steps);
              animation = new Promise((resolve, reject) => {
                Body.setVelocity(spriteObjects[i], {
                  x: 0,
                  y: 1 * (parseInt(instruction.steps) > 0 ? 1 : -1),
                });
                setTimeout(() => {
                  Body.setVelocity(spriteObjects[i], { x: 0, y: 0 });
                  const updatedPosition = [...position];

                  updatedPosition[i].y += instruction.steps;
                  setPosition(updatedPosition);
                  resolve();
                }, 1000 * Math.abs(parseInt(instruction.steps)));
              });
              break;
            case "moveXY":
              animation = new Promise((resolve, reject) => {
                Body.setVelocity(spriteObjects[i], {
                  x:
                    parseInt(instruction.stepsX) /
                    Math.sqrt(
                      Math.pow(parseInt(instruction.stepsX), 2) +
                        Math.pow(parseInt(instruction.stepsY), 2)
                    ),
                  y:
                    parseInt(instruction.stepsY) /
                    Math.sqrt(
                      Math.pow(parseInt(instruction.stepsX), 2) +
                        Math.pow(parseInt(instruction.stepsY), 2)
                    ),
                });
                setTimeout(() => {
                  Body.setVelocity(spriteObjects[i], { x: 0, y: 0 });
                  const updatedPosition = [...position];
                  updatedPosition[i].x += instruction.stepsX;
                  updatedPosition[i].y += instruction.stepsY;
                  setPosition(updatedPosition);
                  resolve();
                }, 1000 * Math.sqrt(Math.pow(parseInt(instruction.stepsX), 2) + Math.pow(parseInt(instruction.stepsY), 2)));
              });
              break;
            case "turnClockwise":
              animation = new Promise((resolve, reject) => {
                Body.setAngularVelocity(spriteObjects[i], Math.PI / 180);
                setTimeout(() => {
                  Body.setAngularVelocity(spriteObjects[i], 0);
                  const updatedRotation = [...rotation];
                  updatedRotation[i] = spriteObjects[i].angle;
                  console.log(spriteObjects[i].angle);
                  setRotation(updatedRotation);
                  resolve();
                }, 1000 * ((Math.abs(parseInt(instruction.degrees)) * Math.PI) / 180));
              });
              break;
            case "turnAntiClockwise":
              animation = new Promise((resolve, reject) => {
                Body.setAngularVelocity(spriteObjects[i], -Math.PI / 180);
                setTimeout(() => {
                  Body.setAngularVelocity(spriteObjects[i], 0);
                  const updatedRotation = [...rotation];
                  updatedRotation[i] = spriteObjects[i].angle;
                  console.log(spriteObjects[i].angle);
                  setRotation(updatedRotation);
                  resolve();
                }, 1000 * ((Math.abs(parseInt(instruction.degrees)) * Math.PI) / 180));
              });
              break;
            case "goTo":
              console.log(
                spriteObjects[i].position.x,
                spriteObjects[i].position.y
              );
              animation = new Promise((resolve, reject) => {
                Body.setVelocity(spriteObjects[i], {
                  x:
                    (instruction.x - position[i].x) /
                    Math.sqrt(
                      Math.pow(instruction.x - position[i].x, 2) +
                        Math.pow(instruction.y - position[i].y, 2)
                    ),
                  y:
                    (instruction.y - position[i].y) /
                    Math.sqrt(
                      Math.pow(instruction.x - position[i].x, 2) +
                        Math.pow(instruction.y - position[i].y, 2)
                    ),
                });
                setTimeout(() => {
                  Body.setVelocity(spriteObjects[i], { x: 0, y: 0 });
                  const updatedPosition = [...position];
                  updatedPosition[i].x = instruction.x;
                  updatedPosition[i].y = instruction.y;
                  setPosition(updatedPosition);
                  resolve();
                }, 1000 * Math.sqrt(Math.pow(parseInt(instruction.x) - position[i].x, 2) + Math.pow(parseInt(instruction.y) - position[i].y, 2)));
              });
              break;
            case "goToRandom":
              animation = new Promise((resolve, reject) => {
                Body.setVelocity(spriteObjects[i], {
                  x:
                    (instruction.x - position[i].x) /
                    Math.sqrt(
                      Math.pow(instruction.x - position[i].x, 2) +
                        Math.pow(instruction.y - position[i].y, 2)
                    ),
                  y:
                    (instruction.y - position[i].y) /
                    Math.sqrt(
                      Math.pow(instruction.x - position[i].x, 2) +
                        Math.pow(instruction.y - position[i].y, 2)
                    ),
                });
                setTimeout(() => {
                  Body.setVelocity(spriteObjects[i], { x: 0, y: 0 });
                  const updatedPosition = [...position];
                  updatedPosition[i].x = instruction.x;
                  updatedPosition[i].y = instruction.y;
                  setPosition(updatedPosition);
                  resolve();
                }, 1000 * Math.sqrt(Math.pow(parseInt(instruction.x) - position[i].x, 2) + Math.pow(parseInt(instruction.y) - position[i].y, 2)));
              });
              break;
            case "repeat":
              break;

            case "increase":
              animation = new Promise((resolve, reject) => {
                spriteObjects[i].render.sprite.xScale *= instruction.size;
                spriteObjects[i].render.sprite.yScale *= instruction.size;

                const updatedScale = [...scale];
                updatedScale[i] = spriteObjects[i].scale;
                console.log(spriteObjects[i].scale);
                setScale(updatedScale);
                resolve();
              });
              break;

            case "decrease":
              animation = new Promise((resolve, reject) => {
                spriteObjects[i].render.sprite.xScale /= instruction.size;
                spriteObjects[i].render.sprite.yScale /= instruction.size;

                const updatedScale = [...scale];
                updatedScale[i] = spriteObjects[i].scale;
                console.log(spriteObjects[i].scale);
                setScale(updatedScale);
                resolve();
              });
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
            animationPromises.push(animation);
          }
        }
      }

      await Promise.all(animationPromises);
      await animateSprites(instructionsIndex + 1);
    },
    [spriteInstructions]
  );

  useEffect(() => {
    const newEngine = Engine.create({ gravity: { x: 0, y: 0 } });
    setEngine(newEngine);
    const newWorld = newEngine.world;
    setWorld(newWorld);

    World.clear(newWorld);
    setSpriteObjects([]);

    sprites.forEach((sprite, index) => {
      let obj = Bodies.rectangle(50, 50 + 100 * index, 5, 5, {
        friction: 0,
        restitution: 1,
        frictionStatic: 0,
        frictionAir: 0,

        width: 100,
        height: 100,
        angle: 0,

        render: {
          sprite: {
            texture: sprite.img,
            width: 100,
            height: 100,
            xScale: 1,
            yScale: 1,
          },
          engine: newEngine,
        },
      });

      World.add(newWorld, obj);
      setSpriteObjects((prev) => [...prev, obj]);
    });

    setPosition(Array(sprites.length).fill({ x: 0, y: 0 }));
    setRotation(Array(sprites.length).fill(0));
    setScale(Array(sprites.length).fill(1));

    const newRender = Render.create({
      canvas: divCanvasRef.current,
      engine: newEngine,
      options: {
        background: "transparent",
        wireframes: false,
      },
    });
    setRender(newRender);
    Render.run(newRender);
    const newRunner = Matter.Runner.create();
    setRunner(newRunner);
  }, [sprites]);

  return (
    <div className="relative flex-none h-screen w-full overflow-y-auto p-2">
      <canvas ref={divCanvasRef}></canvas>

      {!isPlaying && (
        <img
          src="/icons/play.svg"
          alt="Play"
          className="absolute bottom-10 right-2 w-8 h-8 cursor-pointer z-50"
          onClick={async () => {
            setIsPlaying((prev) => !prev);
            isPlayingRef.current = true;

            Matter.Runner.run(runner, engine);
            await animateSprites(instructionsIndex);
            instructionsIndex = 0;
            Matter.Runner.stop(runner);
          }}
        />
      )}
      <img
        src="/icons/reset.svg"
        alt="Reset"
        className="absolute bottom-10 right-2 w-8 h-8 mr-10 cursor-pointer z-50"
        onClick={() => {
          dispatch(resetInstructions());
          dispatch(resetSprites());

          setIsPlaying(false);
          isPlayingRef.current = false;
        }}
      />
      <ToastContainer />
    </div>
  );
}
