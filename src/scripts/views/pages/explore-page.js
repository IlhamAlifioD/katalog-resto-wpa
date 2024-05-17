import RestaurantSource from "../../data/restaurant-source";

const ExplorePage = {
	async render() {
		return `
               <section class="explore-section">
                    <h2 class="head-text">Explore Restoran</h2>
				<restaurant-list></restaurant-list>
               </section>
          `;
	},

	async afterRender() {
		const restaurants 	 = await RestaurantSource.getRestaurantList();
		const restaurantList = document.querySelector("restaurant-list");
			try {
				await restaurantList.setRestaurantList(restaurants);
			} catch (error) {
				restaurantList.isError();
				console.error("Failed to Fetch Restaurant List: ", error);
			}
	},
};

export default ExplorePage;
