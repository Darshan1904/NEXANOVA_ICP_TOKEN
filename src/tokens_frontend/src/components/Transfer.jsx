import React, { useState } from "react";
import {Principal} from "@dfinity/principal";
import { tokens_backend } from "../../../declarations/tokens_backend/index";

function Transfer() {

  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [hidden, setHidden] = useState(true);
  
  async function handleClick() {

    setHidden(true);
    setIsDisabled(true);
    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount);

    const result = await tokens_backend.transfer(recipient, amountToTransfer);
    setFeedback(result);
    setHidden(false);
    setIsDisabled(false);

  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" disabled={isDisabled} onClick={handleClick} >
            Transfer
          </button>
        </p>
        <p hidden={hidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
