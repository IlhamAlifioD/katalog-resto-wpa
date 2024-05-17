import API_ENDPOINT from "../globals/api-endpoint";

class RestaurantSource {
	static async getRestaurantList() {
		const response     = await fetch(API_ENDPOINT.RESTAURANT_LIST);
		const responseJson = await response.json();

		return responseJson.restaurants;
	}

	static async getRestaurantDetails(id) {
		const response     = await fetch(`${API_ENDPOINT.RESTAURANT_DETAIL}/${id}`);
          const responseJson = await response.json();

		return responseJson.restaurant;
	}

	static async sendReview(reviewData) {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(reviewData),
		};

		const response     = await fetch(API_ENDPOINT.POST_REVIEW, options);
		const responseJson = await response.json();

		return responseJson;
	}
}

export default RestaurantSource;
