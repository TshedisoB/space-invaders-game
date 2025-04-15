import React, { useState } from "react";
import { connect } from "react-redux";
import { playerName } from "../Redux/PlayerName/actions";
import { TextField, Button } from "@mui/material";
import { hidePlayerForm } from "../utils/helper";
import Game from "./Game";
import "../styles/main.css";

const PlayerNameForm = ({ setPlayerName }) => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayerName(name);
    setName("");
    hidePlayerForm();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const isSubmitDisabled = name === "";

  if (submitted) {
    return <Game />;
  }

  return (
    <div className="player-name-container">
      <h2 id="player-title">Enter Player Name...</h2>
      <form id="player-form" onSubmit={handleSubmit}>
        <TextField
          value={name}
          onChange={handleChange}
          variant="outlined"
          inputProps={{ maxLength: 20 }}
          placeholder="e.g: AlienSlayer"
        />
      </form>
      <Button
        id="submit-button"
        type="submit"
        variant="contained"
        color="secondary"
        disabled={isSubmitDisabled}
        onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    playerName: state.playerName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPlayerName: (name) => dispatch(playerName(name)),
  };
};

export { PlayerNameForm };

export default connect(mapStateToProps, mapDispatchToProps)(PlayerNameForm);
