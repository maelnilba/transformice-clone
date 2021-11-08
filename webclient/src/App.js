import React, { useState } from "react";
import { Stage } from "@inlet/react-pixi";
import { useCore } from "./core/useCore";

function App() {
  const [core] = useCore();
  const [username, setUsername] = useState("");

  return (
    <>
      {/* <Stage width={800} height={400} options={{ backgroundColor: 0x6a7495 }}>
        <Sprite
          image="./assets/souris.png"
          scale={0.125}
          anchor={0.5}
          x={0}
          y={0}
        />
      </Stage> */}

      <input onChange={(e) => setUsername(e.target.value)} />
      <button onClick={() => core.GameController.logIn(username)}>
        connect
      </button>

      {core && (
        <>
          <Stage
            width={800}
            height={400}
            raf
            options={{ backgroundColor: 0x6a7495 }}
          >
            {core.GameInstance.renderMap()}
          </Stage>
          {core.GameInstance.renderList()}
        </>
      )}
    </>
  );
}

export default App;
