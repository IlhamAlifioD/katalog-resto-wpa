import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";
import "../src/scripts/component/restaurant-detail";
import DetailPageHandler from "../src/scripts/utils/detail-page-handler";
import dataDummy from "./DummyData/restaurant-dummy";

describe("Unliking A Restaurant", () => {
	const restaurantData = dataDummy.getRestaurantDummy().find((item) => item.id === 1);

	beforeEach(async () => {
		document.body.innerHTML = "<restaurant-detail></restaurant-detail>";
		const restaurantDetailElement = document.querySelector("restaurant-detail");
			restaurantDetailElement.setRestaurantData(restaurantData);
	});

	it("should DISPLAY the unlike button when the restaurant already added to favorite", () => {
		document
			.querySelector("restaurant-detail")
			.setAttribute("favorite", "true");

		expect(document.querySelector("#unlike")).toBeTruthy;
	});

	it("should NOT display the like button when the restaurant already added to favorite", () => {
		document
			.querySelector("restaurant-detail")
			.setAttribute("favorite", "true");

		expect(document.querySelector("#like")).toBeFalsy;
	});

	it("should DISPLAY like button after the unlike button get clicked", () => {
		document
			.querySelector("restaurant-detail")
			.setAttribute("favorite", "true");

		DetailPageHandler.likeBtnHandler(restaurantData.id);
		document.querySelector("#unlike").dispatchEvent(new Event("click"));

		expect(document.querySelector("#like")).toBeTruthy;
	});

	it("should NOT display unlike button after the unlike button get clicked", () => {
		document
			.querySelector("restaurant-detail")
			.setAttribute("favorite", "true");

		DetailPageHandler.likeBtnHandler(restaurantData.id);
		document.querySelector("#unlike").dispatchEvent(new Event("click"));

		expect(document.querySelector("#unlike")).toBeFalsy;
	});

	it("should be able to REMOVE restaurant from favorite list after the unlike button get clicked", async () => {
		document
			.querySelector("restaurant-detail")
			.setAttribute("favorite", "true");

		DetailPageHandler.likeBtnHandler(restaurantData.id);
		document.querySelector("#unlike").dispatchEvent(new Event("click"));

		const favoriteRestaurants = await FavoriteRestaurantIdb.getRestaurant(restaurantData.id);
		expect(favoriteRestaurants || []).toHaveLength(0);
	});

	it("should NOT throw error message when the unlike button get clicked and restaurant already removed from favorite list", async () => {
		document
			.querySelector("restaurant-detail")
			.setAttribute("favorite", "true");

		DetailPageHandler.likeBtnHandler(restaurantData.id);

		await FavoriteRestaurantIdb.deleteRestaurant(restaurantData.id);

		document.querySelector("#unlike").dispatchEvent(new Event("click"));

		const favoriteRestaurants = await FavoriteRestaurantIdb.getRestaurant(restaurantData.id);
		expect(favoriteRestaurants || []).toHaveLength(0);
	});
});
