class FooterBar extends HTMLElement {
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
                    <h3>Katalog-Resto</h3>
                    <p>Copyright &#169; 2024, Katalog-Resto. All right reversed.</p>
                    <p>#Stay Healty</p>
          `;
	}
}

customElements.define("footer-bar", FooterBar);