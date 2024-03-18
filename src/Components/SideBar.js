import React, { useState } from "react";
import { Button } from "@mui/material";
import StatsDisplay from "./StatsDisplay";
import ButtonsHighlight from "./ButtonsHighlight";

export default function SideBar() {
  const [rulesVisible, setRulesVisible] = useState(false);

  const toggleRules = () => {
    const rulesContainer = document.querySelector(
      ".rules-instructions-container"
    );
    const currentDisplay = window.getComputedStyle(rulesContainer).display;

    if (currentDisplay === "none") {
      rulesContainer.style.display = "flex";
      setTimeout(() => {
        rulesContainer.style.opacity = 1;
      }, 0);
      setRulesVisible(true);
    } else {
      rulesContainer.style.opacity = 0;
      setTimeout(() => {
        rulesContainer.style.display = "none";
      }, 300);
      setRulesVisible(false);
    }
  };

  return (
    <div className="sidebar">
      <h3>Side Bar Stats</h3>
      <StatsDisplay />
      <ButtonsHighlight />
      <Button variant="contained" onClick={toggleRules}>
        {rulesVisible ? "Hide Rules" : "Display Rules"}
      </Button>
    </div>
  );
}
