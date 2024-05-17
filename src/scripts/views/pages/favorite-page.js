import FavoriteRestaurantIdb from "../../data/favorite-restaurant-idb";

const FavoritePage = {
	async render() {
		return `
               <section class="favorite explore-section">
                    <h2 class="head-text">Daftar Restoran Favorit</h2>
				<restaurant-list></restaurant-list>
               </section>
          `;
	},

	async afterRender() {
		const favoriteList = document.querySelector("restaurant-list");
		const favoriteData = await FavoriteRestaurantIdb.getAllRestaurants();
			try {
				favoriteList.setRestaurantList(favoriteData);
			} catch (error) {
				favoriteList.isError();
				console.error("Failed to Fetch Favorite Restaurant List: ", error);
			}
	},
};

export default FavoritePage;
