import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { DirectionProvider } from "./context/direction-context";
import { router } from "./router";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.querySelector("#root")!);

root.render(
  <StrictMode>
    <DirectionProvider>
      <RouterProvider router={router} />
    </DirectionProvider>
  </StrictMode>,
);
