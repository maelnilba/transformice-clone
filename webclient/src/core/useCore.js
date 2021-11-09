import React, { useState, useEffect, useRef } from "react";
import { CoreGameClient } from "./CoreGameClient";
import socketIOClient from "socket.io-client";
import App from "../App";
import ReactDOM from "react-dom";
import { useKeyPress } from "../hooks/useKeyPress";

const ENDPOINT = "http://localhost:4001";
const rendering = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

export function useCore(props) {
  const socketRef = useRef();
  const [core, setCore] = useState(null);

  const ArrowRight = useKeyPress(["ArrowRight", "D", "d"]);
  const ArrowLeft = useKeyPress(["ArrowLeft", "Q", "q"]);
  const ArrowUp = useKeyPress(["ArrowUp", "Z", "z"]);
  const [AFK, setAFK] = useState(true);

  useEffect(() => {
    if (ArrowRight) {
      core.GameController.moveMice("right");
      setAFK(false);
    }
    if (ArrowLeft) {
      core.GameController.moveMice("left");
      setAFK(false);
    }
    if (ArrowUp) {
      core.GameController.moveMice("up");
      setAFK(false);
    }

    if (!ArrowUp && !ArrowRight && !ArrowLeft && !AFK) {
      core.GameController.moveMice("stop");
      setAFK(true);
    }
  });

  // useHotkeys("ArrowRight", () => {
  //   core.GameController.moveMice("right");
  // });
  // useHotkeys("ArrowLeft", () => {
  //   core.GameController.moveMice("left");
  // });
  // useHotkeys("ArrowUp", () => {
  //   core.GameController.moveMice("up");
  // });
  // useHotkeys("ArrowDown", () => {
  //   core.GameController.moveMice("down");
  // });

  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT);
    let socket = socketRef.current;
    setCore(new CoreGameClient(socket, rendering));
  }, []);

  return [core];
}
