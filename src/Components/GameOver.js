import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Celebrate } from "./Celebrate";
import useSound from "use-sound";
import Button from "@mui/material/Button";
import { restartGame, gamePaused } from "../Redux/GameStats/actions";
import lostSound from "../utils/sounds/lostSound.wav";
import winSound from "../utils/sounds/winSound.wav";

const GameOver = () => {
  const aliensAlive = useSelector((state) => state.stats.aliensAlive);
  const [playLostSound] = useSound(lostSound);
  const [playWinSound] = useSound(winSound);

  const dispatch = useDispatch();

  const handlePlayAgain = () => {
    dispatch(restartGame());
    dispatch(gamePaused());
  };

  useEffect(() => {
    if (aliensAlive === 0) {
      playWinSound();
    } else {
      playLostSound();
    }
  }, [aliensAlive, playLostSound, playWinSound]);

  return (
    <div className="game-over-overlay">
      <div className="game-over-content">
        <h2 id="game-over">Game Over</h2>
        <h1 className="results">You {aliensAlive === 0 ? "Won" : "Lost"}</h1>
      </div>
      {aliensAlive === 0 && <Celebrate />}
      <Button variant="contained" color="primary" onClick={handlePlayAgain}>
        Play Again
      </Button>
    </div>
  );
};

export default GameOver;
