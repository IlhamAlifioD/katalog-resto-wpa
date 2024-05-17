import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

class RestaurantDetail extends HTMLElement {
     static observedAttributes = ["favorite"];

     _restaurantData = {};

     constructor() {
          super();

          this._favorite = this.getAttribute("favorite");
     }

     attributeChangedCallback(name, oldValue, newValue) {
          this[`_${name}`] = newValue;
          this.render();
     }

     connectedCallback() {
          this.isLoadingDetail();
     }

     isError() {
          this.innerHTML = `
               <div class="error head-text">
                    <h4>Terjadi Kesalahan (ᗒᗣᗕ)</h4>
               </div>
          `;
     }

     isLoadingDetail() {
          this.innerHTML = "";
          const detailSkeletonUI = document.createElement("div");
               detailSkeletonUI.classList.add("detail-skeleton-ui");
               detailSkeletonUI.innerHTML = `
                    <div class="detail-img"></div>
                    <div class="detail-title"></div>

                    <div class="detail-outer-container">
                         <div class="detail-inner-container">
                              <div class="detail-location"></div>
                              <div class="detail-rating"></div>
                         </div>
                         <div class="detail-like"></div>
                    </div>

                    <div class="detail-paragraph"></div>
                    <div class="detail-paragraph"></div>
                    <div class="detail-paragraph"></div>
                    <div class="detail-paragraph"></div>
                    <div class="detail-paragraph"></div>
               `;
          this.append(detailSkeletonUI);
     }

     getRestaurantData() {
          return this._restaurantData;
     }

     setRestaurantData(restaurant) {
          this._restaurantData = restaurant;
          this.render();
          this.showFoodsMenu();
     }

     showFoodsMenu() {
          const menuList = this.querySelector(".menu-list");
               if (menuList) {
                    menuList.innerHTML = "";
                    const foods = this._restaurantData.menus.foods.map((foodData) => {
                         const foodItem = document.createElement("li");
                              foodItem.innerHTML = foodData.name;
                         return foodItem;
                    });
                    menuList.style.display = "flex";
                    menuList.append(...foods);
               }
     }

     render() {
          this.innerHTML = `
               <div class="img-container">
                    <picture>
                    <source media="(min-width: 1024px)" data-srcset="https://restaurant-api.dicoding.dev/images/large/${this._restaurantData.pictureId}" />
                         <source media="(min-width: 768px)" data-srcset="https://restaurant-api.dicoding.dev/images/medium/${this._restaurantData.pictureId}" />
                         <img 
                              class="lazyload" 
                              src="https://restaurant-api.dicoding.dev/images/small/${this._restaurantData.pictureId}" 
                              alt="Restoran"
                         />
                    </picture>
               </div>
               <h3 class="head-text">${this._restaurantData.name}</h3>
               <div class="information-container">
                    <div class="location">
                         <i class="fa-solid fa-location-dot"></i>
                         <div class="location-details">
                              <span>${this._restaurantData.city} </span>
                              <span>(${this._restaurantData.address})</span>
                         </div>
                    </div>
                    <div class="rating">
                         <i class="fa-solid fa-star"></i>
                         <span>Rating: ${this._restaurantData.rating}</span>
                    </div>
               </div>

               <p class="description">
                    ${this._restaurantData.description}
               </p>

               <div class="menu-detail">
                    <div class="categories">
                         <h4>Kategori: </h4>
                         <div class="category-list"></div>
                    </div>
                    <div class="menu-list-container">
                         <div class="menu-btn">
                              <button class="foods-menu-btn" aria-label= "Tombol">Menu Makanan</button>
                              <button class="drinks-menu-btn" aria-label= "Tombol">Menu Minuman</button>
                         </div>
                         <ul class="menu-list"></ul>
                    </div>
               </div>

               <form id="review-form">
                    <h4 class="head-text">Bagikan pengalaman mu!</h4>
                    <input type="text" id="review-username-input" placeholder="Masukkan nama..." required>
                    <textarea type="text" id="review-desc-input" name="note_body" required maxlength="400"
                         placeholder="Masukkan ulasan..." ;></textarea>
                    <button type="submit" id="submit-form">Kirim!</button>
               </form>

               <div class="review-section">
                    <div class="head-container">
                         <h4 class="head-text">Ulasan Pelanggan</h4>
                    </div>
                    <div class="review-list"></div>
               </div>
          `;

          // * Rendering foods list
          this.showFoodsMenu();

          const informationContainer = this.querySelector(".information-container");
          const likeButton = document.createElement("button");
               likeButton.setAttribute("aria-label", "Tombol Like");
                    if (this._favorite === "false") {
                         likeButton.id = "like";
                         likeButton.innerHTML = "<i class='fa-regular fa-heart'></i>";
                         likeButton.setAttribute("aria-label", "Simpan ke Favorit");
                    } else {
                         likeButton.id = "unlike";
                         likeButton.innerHTML = "<i class='fa-solid fa-heart'></i>";
                         likeButton.setAttribute("aria-label", "Hapus dari Favorit");
                    }
          informationContainer.appendChild(likeButton);

          const categoryList = this.querySelector(".category-list");
          const categories = this._restaurantData.categories.map((categoryData) => {
               const categoryItem = document.createElement("div");
                    categoryItem.classList.add("category-item");
                    categoryItem.innerHTML = `
                         <p>${categoryData.name}</p>
                    `;

               return categoryItem;
          });
          categoryList.append(...categories);

		const menuList = this.querySelector(".menu-list");
          const foodsMenuBtn = this.querySelector(".foods-menu-btn");
               foodsMenuBtn.addEventListener("click", () => {
                    menuList.innerHTML = "";
                    const foods = this._restaurantData.menus.foods.map((foodData) => {
                         const foodItem = document.createElement("li");
                              foodItem.innerHTML = foodData.name;

                         return foodItem;
                    });
                    menuList.style.display = "flex";
                    menuList.append(...foods);
               });

          const drinksMenuBtn = this.querySelector(".drinks-menu-btn");
               drinksMenuBtn.addEventListener("click", () => {
                    menuList.innerHTML = "";
                    const drinks = this._restaurantData.menus.drinks.map((drinkData) => {
                         const drinkItem = document.createElement("li");
                              drinkItem.innerHTML = drinkData.name;

                         return drinkItem;
                    });
                    menuList.style.display = "flex";
                    menuList.append(...drinks);
               });

          const reviews = this._restaurantData.customerReviews
			.slice()
			.reverse()
			.map((reviewData) => {
				const reviewContent = document.createElement("div");
				reviewContent.classList.add("review-content");
				const reviewTop = document.createElement("div");
				reviewTop.classList.add("review-top");
				reviewTop.innerHTML = `
                                   <h5 class="review-name">${reviewData.name}</h5>
                                   <h5 class="review-date">(${reviewData.date})</h5>
                              `;
				const reviewBottom = document.createElement("div");
				reviewBottom.classList.add("review-bottom");
				reviewBottom.innerHTML = `
                                   <p class="review-desc">${reviewData.review}</p>
                              `;
				reviewContent.append(reviewTop, reviewBottom);
				return reviewContent;
			});
		const reviewList = this.querySelector(".review-list");
		reviewList.append(...reviews);
     }
}

customElements.define("restaurant-detail", RestaurantDetail);