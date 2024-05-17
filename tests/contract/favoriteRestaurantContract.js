const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
	it("should RETURN the restaurant that has been added", async () => {
		favoriteRestaurant.putRestaurant({ id: 1 });
		favoriteRestaurant.putRestaurant({ id: 2 });

		expect(await favoriteRestaurant.getRestaurant(1)).toEqual({ id: 1 });
		expect(await favoriteRestaurant.getRestaurant(2)).toEqual({ id: 2 });
		expect(await favoriteRestaurant.getRestaurant(3)).toEqual(undefined);
	});

	it("should REFUSE a restaurant from being added if it does not have the correct property", async () => {
		favoriteRestaurant.putRestaurant({  aProperty: "property" });

		expect(await favoriteRestaurant.getAllRestaurants()).toEqual([]);
	});

	it("can RETURN all of the restaurants that have been added", async () => {
		favoriteRestaurant.putRestaurant({ id: 1 });
		favoriteRestaurant.putRestaurant({ id: 2 });

		expect(await favoriteRestaurant.getAllRestaurants()).toEqual([
			{ id: 1 },
			{ id: 2 },
		]);
	});

	it("should REMOVE favorite restaurant", async () => {
		favoriteRestaurant.putRestaurant({ id: 1 });
		favoriteRestaurant.putRestaurant({ id: 2 });
		favoriteRestaurant.putRestaurant({ id: 3 });

		await favoriteRestaurant.deleteRestaurant(1);

		expect(await favoriteRestaurant.getAllRestaurants()).toEqual([
			{ id: 2 },
			{ id: 3 },
		]);
	});

	it("should handle request to REMOVE a restaurant even though the restaurant has not been added", async () => {
		favoriteRestaurant.putRestaurant({ id: 1 });
		favoriteRestaurant.putRestaurant({ id: 2 });
		favoriteRestaurant.putRestaurant({ id: 3 });

		await favoriteRestaurant.deleteRestaurant(4);

		// expect(await favoriteRestaurant.getRestaurant(4)).toBeUndefined();
		expect(await favoriteRestaurant.getAllRestaurants()).toEqual([
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
		]);
	});
};

export default itActsAsFavoriteRestaurantModel;
