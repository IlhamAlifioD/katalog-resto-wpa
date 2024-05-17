const assert = require("assert");

Feature("Liking Restaurant");

Before(({ I }) => {
	I.amOnPage("/#/favorite-page");
});

Scenario("Showing empty favorite list", ({ I }) => {
	I.see("Daftar Restoran Masih Kosong (●`⌓`●)", ".empty");
});

Scenario("Liking one restaurant", async ({ I }) => {
	I.see("Daftar Restoran Masih Kosong (●`⌓`●)", ".empty");

	I.amOnPage("/");

	I.seeElement("restaurant-item .name");
          const firstRestaurantName = await I.grabTextFrom(
               locate("restaurant-item .name").first(),
          );
	I.click(locate("restaurant-item").first());

	I.seeElement("#like");
	I.click("#like");

	I.amOnPage("/#/favorite-page");
	I.dontSeeElement(".empty");

	I.seeElement("restaurant-item .name");
          const firstFavoriteRestaurantName = await I.grabTextFrom(
               locate("restaurant-item .name").first(),
          );
	I.seeElement("restaurant-item");

	assert.strictEqual(firstRestaurantName, firstFavoriteRestaurantName);
});