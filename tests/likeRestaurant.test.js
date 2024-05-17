import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";
import "../src/scripts/component/restaurant-detail";
import DetailPageHandler from "../src/scripts/utils/detail-page-handler";
import dataDummy from "./DummyData/restaurant-dummy";

describe("Liking A Restaurant", () => {
	const restaurantData = dataDummy.getRestaurantDummy().find((item) => item.id === 1);

	beforeEach(async () => {
		document.body.innerHTML = "<restaurant-detail></restaurant-detail>";
		const restaurantDetailElement = document.querySelector("restaurant-detail");
			restaurantDetailElement.setRestaurantData(restaurantData);
	});

	it("should DISPLAY the like button when the restaurant is not added to favorite", () => {
		document
			.querySelector("restaurant-detail")
			.setAttribute("favorite", "false");

		expect(document.querySelector("#like")).toBeTruthy;
	});

	it("should NOT display the unlike button when the restaurant is not added to favorite", () => {
		document
			.querySelector("restaurant-detail")
			.setAttribute("favorite", "false");

		expect(document.querySelector("#unlike")).toBeFalsy;
	});

	it("should DISPLAY unlike button after the like button get clicked", () => {
		document
			.querySelector("restaurant-detail")
			.setAttribute("favorite", "false");

		DetailPageHandler.likeBtnHandler(restaurantData);
		document.querySelector("#like").dispatchEvent(new Event("click"));

		expect(document.querySelector("#unlike")).toBeTruthy;
	});

	it("should NOT display like button after the like button get clicked", () => {
		document
			.querySelector("restaurant-detail")
			.setAttribute("favorite", "false");

		DetailPageHandler.likeBtnHandler(restaurantData.id);
		document.querySelector("#like").dispatchEvent(new Event("click"));

		expect(document.querySelector("#like")).toBeFalsy;
	});

	it("should be able to like and ADD restaurant to favorite list after the like button get clicked", async () => {
		document
			.querySelector("restaurant-detail")
			.setAttribute("favorite", "false");

		DetailPageHandler.likeBtnHandler(restaurantData.id);
		document.querySelector("#like").dispatchEvent(new Event("click"));

		expect(
			await FavoriteRestaurantIdb.getRestaurant(restaurantData.id),
		).toEqual(restaurantData);
	});

	it("should NOT throw error message when the like button get clicked and restaurant already added to favorite list", async () => {
		await FavoriteRestaurantIdb.putRestaurant(restaurantData);

		document
			.querySelector("restaurant-detail")
			.setAttribute("favorite", "false");

		DetailPageHandler.likeBtnHandler(restaurantData.id);
		document.querySelector("#like").dispatchEvent(new Event("click"));

		expect(
			await FavoriteRestaurantIdb.getRestaurant(restaurantData.id),
		).toEqual(restaurantData);
	});
});
