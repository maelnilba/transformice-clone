import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { Stage, Sprite, Container } from "@inlet/react-pixi";

const ENDPOINT = "http://localhost:4001";

function App() {
  const [updates, setUpdates] = useState(0);
  const socketRef = useRef();
  // Create the socket
  // and add the API listener:
  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT);
    socketRef.current.emit("event", {
      id: 80,
      roomId: "salon2",
    });
    return () => socketRef.current.disconnect();
  }, []);

  useEffect(() => {
    const handleLobbyUpdate = (datas) => {
      console.log(updates); // this will now display the current data
      setUpdates(updates + 1);
    };
    socketRef.current.on("event", handleLobbyUpdate);
    return () => {
      socketRef.current.off("event", handleLobbyUpdate);
    };
  }, [updates]);

  return (
    <>
      <p widht="100vw">{updates}</p>
      <Stage width={1400} height={1000} options={{ backgroundColor: 0x6a7495 }}>
        <Container width={800} height={400} position={[150, 150]}></Container>
      </Stage>
    </>
  );
}

export default App;
