import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Openai from "./Openai";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Openai />
  </StrictMode>
);

