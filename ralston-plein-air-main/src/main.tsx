import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;
const jsx = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Use hydrateRoot when the server has pre-rendered content; fall back to
// createRoot in dev (where no prerendering has run).
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, jsx);
} else {
  createRoot(rootEl).render(jsx);
}
