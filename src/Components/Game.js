import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import useSound from "use-sound";
import Header from "./Header";
import SideBar from "./SideBar";
import GameRules from "./GameRules";
import GameOver from "./GameOver";
import Button from "@mui/material/Button";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "../styles/main.css";
import { remove, drawInvaders } from "../utils/helper";
import boomSound from "../utils/sounds/boomSound.wav";
import laserSound from "../utils/sounds/laserSound.wav";
import {
  aliensShot,
  shootLaser,
  restartGame,
  aliensAlive,
  gamePaused,
} from "../Redux/GameStats/actions";

function Game({ aliensShot, aliensAlive, gameOver, gamePaused }) {
  const [isMuted, setIsMuted] = useState(false);
  const [playBoomSound] = useSound(boomSound, { volume: isMuted ? 0 : 1 });
  const [playLaserSound] = useSound(laserSound, { volume: isMuted ? 0 : 1 });
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(true);
  const alienInvaders = useSelector((state) => state.stats.aliensInvaders);
  const width = useSelector((state) => state.stats.width);
  const aliensRemoved = useSelector((state) => state.stats.aliensRemoved);
  const isGameOver = useSelector((state) => state.stats.gameOver);
  const isGamePaused = useSelector((state) => state.stats.gamePaused);
  const grid = [...Array(225)].map((_, i) => (
    <div
      key={i}
      className={`${i < 15 ? "top-blocks" : ""}${
        i > 209 ? "bottom-blocks" : ""
      }`}></div>
  ));

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    let currentShooterIndex = 202;
    let direction = 1;
    let goingRight = true;
    let invadersId;

    const squares = Array.from(document.querySelectorAll(".grid div"));

    drawInvaders(alienInvaders, aliensRemoved);

    if (isGamePaused) return;
    squares[currentShooterIndex].classList.add("shooter");
    function moveShooter(e) {
      squares[currentShooterIndex].classList.remove("shooter");
      switch (e.key) {
        case "ArrowLeft":
          if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
          break;
        case "ArrowRight":
          if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
          break;
        default:
          break;
      }
      squares[currentShooterIndex].classList.add("shooter");
    }
    document.addEventListener("keydown", moveShooter);

    function moveInvaders() {
      if (isGamePaused) return;

      const leftEdge = alienInvaders[0] % width === 0;
      const rightEdge =
        alienInvaders[alienInvaders.length - 1] % width === width - 1;
      remove(alienInvaders);

      if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
          alienInvaders[i] += width + 1;
          direction = -1;
          goingRight = false;
        }
      }

      if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
          alienInvaders[i] += width - 1;
          direction = 1;
          goingRight = true;
        }
      }

      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
      }
      drawInvaders(alienInvaders, aliensRemoved);

      if (
        squares[currentShooterIndex].classList.contains("laser", "top-blocks")
      ) {
        squares[currentShooterIndex].classList.remove("laser");
      }

      if (
        squares[currentShooterIndex]?.classList.contains("invader", "shooter")
      ) {
        squares[currentShooterIndex]?.classList.add("boom");
        playBoomSound();
        gamePaused();
        gameOver();
        clearInterval(invadersId);
      }

      const bottomBlocks = squares.slice(-width);

      if (bottomBlocks.some((block) => block.classList.contains("invader"))) {
        gamePaused();
        gameOver();
        clearInterval(invadersId);
      }

      if (aliensRemoved.length === alienInvaders.length) {
        gamePaused();
        gameOver();
        clearInterval(invadersId);
      }
    }

    invadersId = setInterval(moveInvaders, 450);

    function shoot(e) {
      let laserId;
      let currentLaserIndex = currentShooterIndex;
      if (isGamePaused) return;

      function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add("laser");

        if (squares[currentLaserIndex].classList.contains("top-blocks")) {
          squares[currentLaserIndex].classList.remove("laser");
          clearInterval(laserId);
        }

        if (squares[currentLaserIndex].classList.contains("invader")) {
          squares[currentLaserIndex].classList.remove("laser");
          squares[currentLaserIndex].classList.remove("invader");
          squares[currentLaserIndex].classList.add("boom");
          aliensRemoved.push(alienInvaders.indexOf(currentLaserIndex));
          playBoomSound();
          aliensShot();
          aliensAlive();

          setTimeout(
            () => squares[currentLaserIndex].classList.remove("boom"),
            90
          );
          clearInterval(laserId);
        }
      }

      switch (e.key) {
        case "ArrowUp":
          playLaserSound();
          dispatch(shootLaser());
          laserId = setInterval(moveLaser, 150);
          break;
        default:
          break;
      }
    }
    document.addEventListener("keydown", shoot);

    return () => {
      clearInterval(invadersId);
      document.removeEventListener("keydown", moveShooter);
      document.removeEventListener("keydown", shoot);
    };
  }, [
    alienInvaders,
    aliensRemoved,
    width,
    isGamePaused,
    gamePaused,
    aliensShot,
    aliensAlive,
    gameOver,
    playBoomSound,
    playLaserSound,
    dispatch,
  ]);

  const handlePlayPause = () => {
    gamePaused();
    restartGame();
    setShowButton(false);
  };

  return (
    <div className="canvas-container">
      <GameRules />
      <div className="game-container" data-testid="game-container">
        <Header />
        {isGameOver ? (
          <GameOver />
        ) : (
          <div className="grid">
            {grid}
            {showButton && (
              <Button onClick={handlePlayPause} variant="contained">
                {isGamePaused ? "Click to Play" : ""}
              </Button>
            )}
            <Button
              id="muteButton"
              onClick={handleMute}
              color="secondary"
              variant="contained">
              {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </Button>
          </div>
        )}
      </div>
      <SideBar />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    aliensInvaders: state.stats.aliensInvaders,
    aliensRemoved: state.stats.aliensRemoved,
    shootLaser: state.stats.shootLaser,
    gamePaused: state.stats.gamePaused,
    aliensAlive: state.stats.aliensAlive,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    aliensShot: () => dispatch(aliensShot()),
    shootLaser: () => dispatch(shootLaser()),
    aliensAlive: () => dispatch(aliensAlive()),
    gamePaused: () => dispatch(gamePaused()),
    gameOver: () => dispatch({ type: "GAME_OVER" }),
  };
};

export { Game };

export default connect(mapStateToProps, mapDispatchToProps)(Game);
