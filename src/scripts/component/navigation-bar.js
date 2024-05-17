class NavigationBar extends HTMLElement {
     constructor() {
          super();
     }

     connectedCallback() {
          this.render();
     }

     _emptyContent() {
          this.innerHTML = "";
     }

     render() {
		this._emptyContent();
		this.innerHTML = `
                    <div class="nav-title">
                         <h1>Katalog Resto</h1>
                    </div>
                    <button id="drawer-btn" aria-label="tombol navigasi drawner">
                         <i class="fa-solid fa-bars"></i>
                    </button>
                    <ul class="drawer-list">
                         <li><a href="#/">Home</a></li>
                         <li><a href="#/favorite-page">Favorite</a></li>
                         <li><a href="https://github.com/IlhamAlifioD/IlhamAlifioD" target="_blank" rel="noopener">About Us</a></li>
                    </ul>
          `;

		// * Navigation Drawner Toggle
		const drawerBtn = document.querySelector("#drawer-btn");
		const drawerMenu = document.querySelector(".drawer-list");
		drawerBtn.addEventListener("click", () => {
			drawerMenu.classList.toggle("show");
		});
          const mainContent = document.querySelector("#main-content");
          mainContent.addEventListener("click", (event) => {
               event.stopPropagation();
               drawerMenu.classList.remove("show");
          });

		// * Smooth Padding Scrolling
          const navigationHeight = this.offsetHeight;
          if (navigationHeight) {
               document.documentElement.style.setProperty(
                    "--scroll-padding",
                    navigationHeight + "px",
               );
          }
	}
}

customElements.define("navigation-bar", NavigationBar);