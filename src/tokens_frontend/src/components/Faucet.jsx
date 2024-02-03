import React, { useState } from "react";
import { tokens_backend } from "../../../declarations/tokens_backend/index";

function Faucet() {

  const [isDisabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Gimme gimme");

  async function handleClick(event) {
    setDisabled(true);
    event.preventDefault();
    const payout = await tokens_backend.payOut();
    setButtonText(payout);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          💰
        </span>
        Faucet
      </h2>
      <label>Get your free NexaNova tokens here! Claim 1000 NXNO tokens to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" disabled={isDisabled} onClick={handleClick}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
