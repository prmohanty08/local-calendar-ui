import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/core.css";
import "./styles/small-scr.css";
import "./styles/medium-scr.css";
import "./styles/large-scr.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);