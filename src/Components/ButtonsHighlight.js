import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ButtonsHighlight = () => {
  const [isLeftHighlighted, setIsLeftHighlighted] = useState(false);
  const [isRightHighlighted, setIsRightHighlighted] = useState(false);
  const [isUpHighlighted, setIsUpHighlighted] = useState(false);
  const gameOver = useSelector((state) => state.stats.gameOver);
  const gamePaused = useSelector((state) => state.stats.gamePaused);

  useEffect(() => {
    if (gameOver || gamePaused) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        setIsLeftHighlighted(true);
      } else if (event.key === "ArrowRight") {
        setIsRightHighlighted(true);
      } else if (event.key === "ArrowUp") {
        setIsUpHighlighted(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "ArrowLeft") {
        setIsLeftHighlighted(false);
      } else if (event.key === "ArrowRight") {
        setIsRightHighlighted(false);
      } else if (event.key === "ArrowUp") {
        setIsUpHighlighted(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameOver, gamePaused]);

  return (
    <div className="button-highlighter">
      <span className={`upButton ${isUpHighlighted ? "highlighted" : ""}`}>
        ▲
      </span>
      <div className="sideButtonContainer">
        <span
          className={`leftButton ${isLeftHighlighted ? "highlighted" : ""}`}>
          ◀
        </span>
        <span
          className={`rightButton ${isRightHighlighted ? "highlighted" : ""}`}>
          ▶
        </span>
      </div>
    </div>
  );
};

export default ButtonsHighlight;
