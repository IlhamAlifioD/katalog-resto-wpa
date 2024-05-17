import "../src/scripts/component/restaurant-list";
import "../src/scripts/component/restaurant-item";
import dataDummy from "./DummyData/restaurant-dummy";

describe("Displaying restaurant list", () => {
	const restaurantListItem = dataDummy.getRestaurantDummy();

	beforeEach(async () => {
		document.body.innerHTML = "<restaurant-list></restaurant-list>";
	});

	describe("When restaurant list are NOT empty", () => {
		it("should DISPLAY restaurant list", () => {
			document
				.querySelector("restaurant-list")
				.setRestaurantList(restaurantListItem);

			const restaurantItem = document.querySelectorAll("restaurant-item");
			const restaurantItemsData = Array.from(restaurantItem).map(
				(item) => item.getRestaurantItem(),
			);

			expect(restaurantItemsData).toEqual(restaurantListItem);
		});
	});

	describe("When restaurant list are EMPTY", () => {
		it("should RENDER empty message", () => {
               document
                    .querySelector("restaurant-list")
                    .setRestaurantList([]);

			expect(document.querySelector(".isEmty")).toBeTruthy;
		});
	});
});
