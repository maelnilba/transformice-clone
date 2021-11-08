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

  const ArrowRight = useKeyPress("ArrowRight");
  const ArrowLeft = useKeyPress("ArrowLeft");
  const ArrowUp = useKeyPress("ArrowUp");

  useEffect(() => {
    if (ArrowRight) {
      core.GameController.moveMice("right");
    }
    if (ArrowLeft) {
      core.GameController.moveMice("left");
    }
    if (ArrowUp) {
      core.GameController.moveMice("up");
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
