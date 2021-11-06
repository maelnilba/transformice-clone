import React, { useState, useEffect, useRef } from "react";
import { CoreGameClient } from "./CoreGameClient";
import useHotkeys from "@reecelucas/react-use-hotkeys";
import socketIOClient from "socket.io-client";
import App from "../App";
import ReactDOM from "react-dom";

const ENDPOINT = "http://localhost:4001";
const rendering = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

export function useCore(props) {
  const socketRef = useRef();
  const [core, setCore] = useState(null);
  useHotkeys("ArrowRight", () => {});
  useHotkeys("ArrowLeft", () => {});
  useHotkeys("ArrowUp", () => {});

  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT);
    let socket = socketRef.current;
    setCore(new CoreGameClient(socket, rendering));
  }, []);

  return [core];
}
