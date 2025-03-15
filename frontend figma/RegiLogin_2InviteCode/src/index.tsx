import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { InviteCode } from "./screens/InviteCode";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <InviteCode />
  </StrictMode>,
);
