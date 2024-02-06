import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

async function handleAuth(authClient){
    const identity = await authClient.getIdentity();
    const userPrincipal = await identity._principal.toString();

    ReactDOM.render(<App userPrincipal={userPrincipal} />, document.getElementById("root"));
}

const init = async () => {
    const authClient = await AuthClient.create();

    if(await authClient.isAuthenticated()) {
        handleAuth(authClient);
        return;
    }

    await authClient.login({
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: () => {
            location.reload();
            handleAuth(authClient);
        },
    });
}

init();