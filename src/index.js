import React from "react";
import ReactDOM from "react-dom";
import "./assets/animated.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/elegant-icons/style.css";
import "../node_modules/et-line/style.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./assets/style.scss";
import LoadingScreen from "react-loading-screen";

// import App from "./components/app";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { I18nLoader } from "./i18n";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <I18nLoader>
    <Provider store={store}>
      <LoadingScreen
        loading={false}
        bgColor="rgba(100, 100, 100, 0.5)"
        spinnerColor="#9ee5f8"
        textColor="#676767"
      >
        <App />
      </LoadingScreen>
    </Provider>
  </I18nLoader>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
