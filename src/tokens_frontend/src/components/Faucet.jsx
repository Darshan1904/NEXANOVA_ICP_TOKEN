import React, { useState } from "react";
import { canisterId, createActor } from "../../../declarations/tokens_backend/index";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {

  const [isDisabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Claim!!");

  async function handleClick(event) {
    setDisabled(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      }
    });

    event.preventDefault();
    const payout = await authenticatedCanister.payOut();
    setButtonText(payout);
  }

  return (
    <div className="blue window">
      <h2>
        Faucet
      </h2>
      <label>Get your free NexaNova tokens here! Claim 1000 NXNO tokens to {props.userPrincipal}</label>
      <p className="trade-buttons">
        <button id="btn-payout" disabled={isDisabled} onClick={handleClick}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
