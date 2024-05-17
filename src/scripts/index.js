import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";

import "./component/navigation-bar";
import "./component/restaurant-list";
import "./component/restaurant-item";
import "./component/restaurant-detail";
import "./component/footer-bar";

import App from "./views/app";
import swRegister from "./utils/sw-register";

const app = new App();

window.addEventListener("DOMContentLoaded", async () => {
     app.renderPage();
     swRegister();
});

window.addEventListener("hashchange", () => {
     app.renderPage();
});