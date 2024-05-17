import RestaurantSource from "../data/restaurant-source";
import FavoriteRestaurantIdb from "../data/favorite-restaurant-idb";

const DetailsPageHandler = {
	async setNewRestaurantDetails(id) {
		const restaurantDetail = document.querySelector("restaurant-detail");
		try {
			const restaurant = await RestaurantSource.getRestaurantDetails(id);
				await restaurantDetail.setRestaurantData(restaurant);
				await this.setFavoriteAttribute(id);
				await this.likeBtnHandler(id);
				await this.reviewFormHandle(id);
		} catch (error) {
			restaurantDetail.isError();
			console.error(`Failed to fetch details! (${error})`);
		}
	},

	async setFavoriteAttribute(id) {
		const restaurantDetail = document.querySelector("restaurant-detail");
		const isFavorite = await FavoriteRestaurantIdb.getRestaurant(id);
		if (isFavorite) {
			restaurantDetail.setAttribute("favorite", "true");
		} else {
			restaurantDetail.setAttribute("favorite", "false");
		}
	},

	async likeBtnHandler(id) {
		const restaurantDetail = document.querySelector("restaurant-detail");
		const favorite = restaurantDetail.getAttribute("favorite");

		const likeHandler = async () => {
			await FavoriteRestaurantIdb.putRestaurant(
				restaurantDetail.getRestaurantData(),
			);
			restaurantDetail.setAttribute("favorite", "true");
			this.likeBtnHandler(id);
		};

		const unlikeHandler = async () => {
			await FavoriteRestaurantIdb.deleteRestaurant(id);
			restaurantDetail.setAttribute("favorite", "false");
			this.likeBtnHandler(id);
		};

			if (favorite === "false") {
				const likeBtn = document.getElementById("like");
					likeBtn.addEventListener("click", likeHandler);
			}

			if (favorite === "true") {
				const unlikeBtn = document.getElementById("unlike");
					unlikeBtn.addEventListener("click", unlikeHandler);
			}
	},

	async reviewFormHandle(id) {
		const restaurantDetail = document.querySelector("restaurant-detail");
		const reviewForm = document.getElementById("review-form");
		const reviewUsernameInput = document.getElementById("review-username-input");
		const reviewDescInput = document.getElementById("review-desc-input");

		function newReview(id, name, review) {
			// * Return Format Data Review
			return {
				id,
				name,
				review,
			};
		}

		reviewForm.addEventListener("submit", async (event) => {
			try {
				event.preventDefault();
				const reviewData = newReview(
					id,
					reviewUsernameInput.value,
					reviewDescInput.value,
				);

				await RestaurantSource.sendReview(reviewData);
				reviewUsernameInput.value = "";
				reviewDescInput.value = "";

				this.setNewRestaurantDetails(id);
			} catch (error) {
				restaurantDetail.isError();
				console.error(`Failed to Submit Review: ${error}`);
			}
		});
	},
};

export default DetailsPageHandler;
