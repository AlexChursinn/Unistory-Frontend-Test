import React from "react";
import { DAppProvider } from "@usedapp/core";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <DAppProvider config> - оборачивает компонент App в DAppProvider, который предоставляет доступ к блокчейну и веб-интерфейсу Ethereum. config является опциональным параметром, который передается в провайдер для настройки его поведения */}
    <DAppProvider config={{}}>
      {/* HashRouter basename="/" для того, чтобы работало при deploy в vercel  */}
      <HashRouter basename="/">
        <App />
      </HashRouter>
    </DAppProvider>
  </React.StrictMode>
);
