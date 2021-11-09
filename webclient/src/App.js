import React, { useState } from "react";
import { Stage } from "@inlet/react-pixi";
import { useCore } from "./core/useCore";

function App() {
  const [core] = useCore();
  const [username, setUsername] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "#6a7495",
      }}
    >
      <div>
        {core && !core.GameInstance.isLog && (
          <div>
            <input onChange={(e) => setUsername(e.target.value)} />
            <button
              onClick={() => core.GameInstance.GameController.logIn(username)}
            >
              connect
            </button>
          </div>
        )}
        {core && core.GameInstance.isLog && (
          <>
            <Stage
              width={800}
              height={400}
              raf
              options={{ backgroundColor: 0x6a7495 }}
            >
              {core.GameInstance.renderMap()}
            </Stage>
            {core.GameInstance.renderUI()}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
