import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

const init = async () => {
    ReactDOM.render(<App />, document.getElementById("root"));
}

init();

//-----------------------------------------Login code : Works only when deployed on internet computer------------------------------------------------

// import App from "./components/App";
// import { AuthClient } from "@dfinity/auth-client";

// const init = async () => {
//     const authClient = await AuthClient.create();

//     if(await authClient.isAuthenticated()) {
//         ReactDOM.render(<App />, document.getElementById("root"));
//         return;
//     }

//     await authClient.login({
//         identityProvider: "https://identity.ic0.app/#authorize",
//         onSuccess: () => {
//             ReactDOM.render(<App />, document.getElementById("root"));
//         },
//     });
// }

// init();