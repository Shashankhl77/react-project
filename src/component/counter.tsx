import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import { useSpring, animated } from "react-spring";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  const backgroundColor = useSpring({
    backgroundColor: `rgb(${count * 5}, ${255 - count * 5}, 150)`,
    config: {
      tension: 200,
      friction: 30,
      precision: 0.1, 
    },
  });

  const increment = () => setCount(prev => Math.min(prev + 1, 128)); 
  const decrement = () => setCount(prev => Math.max(prev - 1, 0)); 
  const reset = () => setCount(0);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "550px",
      }}
    >
      <animated.div
        style={{
          ...backgroundColor,
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          transition: "background-color 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
        }}
      />

      <div style={{ zIndex: 1, textAlign: "center", padding: "20px" }}>
        <h1>Counter: {count}</h1>

        <Button variant="contained" onClick={increment} sx={{ margin: "10px", backgroundColor: "#00e676" }}>
          Increment
        </Button>
        <Button variant="contained" onClick={reset} sx={{ margin: "10px" }}>
          Reset
        </Button>
        <Button variant="contained" onClick={decrement} sx={{ margin: "10px", backgroundColor: "#ff3d00" }}>
          Decrement
        </Button>
      </div>
    </Container>
  );
};

export default Counter;
