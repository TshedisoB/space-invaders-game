import React from "react";
import "../styles/main.css";

function GameRules() {
  return (
    <div className="rules-instructions-container">
      <div className="instructions-container">
        <h2 id="instructions">Instructions</h2>
        <ul id="instruction-list">
          <li>Move the shooter using the left and right arrow keys.</li>
          <li>Press the up arrow key to shoot lasers.</li>
          <li>Defeat all the alien invaders to win the game.</li>
          <li>
            Avoid being hit by the invaders or letting them reach the bottom.
          </li>
        </ul>
        <div className="rules-container">
          <h2 id="rules">Rules</h2>
          <ul id="rules-list">
            <li>The shooter can move horizontally within the grid.</li>
            <li>The aliens move horizontally and descend as a group.</li>
            <li>
              The aliens change direction when reaching the edges of the grid.
            </li>
            <li>When a laser hits an invader, it is removed from the grid.</li>
            <li>
              The game ends if an invader reaches the bottom or collides with
              the shooter.
            </li>
            <li>You win if you remove all the invaders from the grid.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GameRules;
