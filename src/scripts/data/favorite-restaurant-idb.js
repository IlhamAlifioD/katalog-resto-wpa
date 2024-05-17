import { openDB } from "idb";
import CONFIG from "../globals/config";

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dBasePromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
	upgrade(database) {
		database.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
	},
});

const FavoriteRestaurantIdb = {
	async getRestaurant(id) {
		if (!id) {
			return;
		}

		return (await dBasePromise).get(OBJECT_STORE_NAME, id);
	},
	async getAllRestaurants() {
		return (await dBasePromise).getAll(OBJECT_STORE_NAME);
	},
	async putRestaurant(Restaurant) {
		if (!Restaurant.hasOwnProperty("id")) {
			return;
		}

		return (await dBasePromise).put(OBJECT_STORE_NAME, Restaurant);
	},
	async deleteRestaurant(id) {
		return (await dBasePromise).delete(OBJECT_STORE_NAME, id);
	},
};

export default FavoriteRestaurantIdb;