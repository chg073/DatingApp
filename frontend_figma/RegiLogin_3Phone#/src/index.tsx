import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PhoneNum } from "./screens/PhoneNum";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <PhoneNum />
  </StrictMode>,
);
