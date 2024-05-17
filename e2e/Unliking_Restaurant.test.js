Feature("Unliking Restaurant");

Before(({ I }) => {
	I.amOnPage("/");
});

Scenario("Unliking one restaurant", async ({ I }) => {
     I.seeElement("restaurant-item .name");
     I.click(locate("restaurant-item").first());

     I.seeElement("#like");
     I.click("#like");

	I.amOnPage("/#/favorite-page");
	I.dontSeeElement(".empty");

	I.seeElement("restaurant-item .name");
	I.click(locate("restaurant-item").first());

	I.seeElement("#unlike");
	I.click("#unlike");

	I.amOnPage("/#/favorite-page");
	I.see("Daftar Restoran Masih Kosong (●`⌓`●)", ".empty");
});
