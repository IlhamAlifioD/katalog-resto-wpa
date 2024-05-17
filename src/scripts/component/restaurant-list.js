class RestaurantList extends HTMLElement {
     _restaurantList = [];

     constructor() {
          super();
     }

     connectedCallback() {
          this.isLoadingItem();
     }

     isEmpty() {
          this.innerHTML = `
               <div class="empty head-text">
                    <h4>Daftar Restoran Masih Kosong (●&#x60;⌓&#x60;●)</h4>
               </div>
          `;
     }

     isError() {
          this.innerHTML = `
          <div class="error head-text">
               <h4>Terjadi Kesalahan (ᗒᗣᗕ)</h4>
          </div>
     `;
     }

     isLoadingItem() {
          this.innerHTML = "";
               for (let item = 0; item < 8; item += 1) {
                    const itemSkeletonUI = document.createElement("div");
                         itemSkeletonUI.classList.add("item-skeleton-ui");
                         itemSkeletonUI.innerHTML = `
                              <div class="item-img"></div>
                              <div class="item-title"></div>
                              <div class="item-paragraph"></div>
                              <div class="item-paragraph"></div>
                              <div class="item-paragraph"></div>
                              <div class="item-paragraph"></div>
                         `;
                    this.append(itemSkeletonUI);
               }
     }

     setRestaurantList(restaurants) {
          this._restaurantList = restaurants;
          this.render();
     }

     render() {
          this.innerHTML = "";
               if (this._restaurantList.length === 0) {
                    this.isEmpty();

                    return;
               }
          this.append(...this.createRestaurantItem());
     }

     createRestaurantItem() {
          return this._restaurantList.map((restaurants) => {
               const newRestaurantItem = document.createElement("restaurant-item");
                    newRestaurantItem.setRestaurantItem(restaurants);
                    newRestaurantItem.setAttribute("tabindex", "0");

               return newRestaurantItem;
          });
     }
}

customElements.define("restaurant-list", RestaurantList);