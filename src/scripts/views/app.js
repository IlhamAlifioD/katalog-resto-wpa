import UrlParser from "../routes/url-parser";
import routes from "../routes/routes";

class App {
     async renderPage() {
          const mainContent  = document.getElementById("main-content");
          const skipShortcut = document.getElementById("skip-to-content");

          const url  = UrlParser.parseActiveUrlWithCombiner();
          const page = routes[url];
               mainContent.innerHTML = await page.render();
               await page.afterRender();

          skipShortcut.addEventListener("click", (event) => {
               event.preventDefault();
               mainContent.scrollIntoView();
               skipShortcut.blur();
          });
     }
}

export default App;