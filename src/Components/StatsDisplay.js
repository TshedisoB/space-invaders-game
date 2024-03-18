import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableRow, TableCell, styled } from "@mui/material";
import "../styles/main.css";

const ColoredTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));

function StatsDisplay() {
  const aliensShot = useSelector((state) => state.stats.aliensShot);
  const aliensAlive = useSelector((state) => state.stats.aliensAlive);
  const laserCount = useSelector((state) => state.stats.laserCount);
  const gameOver = useSelector((state) => state.stats.gameOver);
  let playerName = useSelector((state) => state.player.playerName);
  playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1);

  useEffect(() => {
    function endGame() {
      if (gameOver) {
        return null;
      }
    }
    endGame();
  }, [gameOver]);

  return (
    <div className="stats-container">
      <Table className="stats-table">
        <TableBody>
          <TableRow>
            <ColoredTableCell>Player name:</ColoredTableCell>
            <TableCell id="name-cell">{playerName}</TableCell>
          </TableRow>
          <TableRow>
            <ColoredTableCell>Aliens Shot:</ColoredTableCell>
            <TableCell id="shot-cell">{aliensShot}</TableCell>
          </TableRow>
          <TableRow>
            <ColoredTableCell>Aliens Alive:</ColoredTableCell>
            <TableCell id="alive-cell">{aliensAlive}</TableCell>
          </TableRow>
          <TableRow>
            <ColoredTableCell>Laser Count:</ColoredTableCell>
            <TableCell id="laser-cell">{laserCount}</TableCell>
          </TableRow>
          <TableRow>
            <ColoredTableCell>Game Over:</ColoredTableCell>
            <TableCell id="game-over-cell">{gameOver ? "Yes" : "No"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default StatsDisplay;
