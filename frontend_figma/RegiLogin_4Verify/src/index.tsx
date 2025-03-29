import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { VerifCode } from "./screens/VerifCode";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <VerifCode />
  </StrictMode>,
);
