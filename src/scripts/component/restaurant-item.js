import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

class RestaurantItem extends HTMLElement {
     _restaurantItem = {};

     constructor() {
          super();
     }

     getRestaurantItem() {
          return this._restaurantItem;
     }

     setRestaurantItem(restaurant) {
          this._restaurantItem = restaurant;
          this.render();
     }

     render() {
          this.innerHTML = `
               <div class="top-details">
                    <span class="resto-city">Kota ${this._restaurantItem.city}</span>
                    <picture class="resto-img">
                         <source media="(min-width: 1080px)" data-srcset="https://restaurant-api.dicoding.dev/images/medium/${this._restaurantItem.pictureId}">
                         <img
                              class="lazyload"
                              data-src="https://restaurant-api.dicoding.dev/images/small/${this._restaurantItem.pictureId}"
                              alt="Restoran ${this._restaurantItem.name}"
                         />
                    </picture>
                    <span class="resto-rating">Rating: ${this._restaurantItem.rating}</span>
               </div>
               <div class="bottom-details">
                    <h3 class="name">${this._restaurantItem.name}</h3>
                    <p class="desc">${this._restaurantItem.description}</p>
               </div>
          `;

          this.addEventListener("click", this.navigateToDetail);
          this.addEventListener("keydown", (event) => {
               if (event.key === "Enter") {
                    this.navigateToDetail();
               }
          });
     }

     navigateToDetail() {
          window.location.href = `#/detail-page/${this._restaurantItem.id}`;
     }
}

customElements.define("restaurant-item", RestaurantItem);