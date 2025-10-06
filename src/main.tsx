import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import "./lib/day.ts";
import i18n from "./lib/i18n/index.ts";
import { persistor, store } from "./store.ts";
import { PersistGate } from "redux-persist/integration/react";
import Splash from "./components/shared/Splash.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Splash />} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
