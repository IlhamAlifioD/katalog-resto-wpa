Feature("Liking Restaurant");

Scenario("Submiting new review", ({ I }) => {
     I.amOnPage("/");

     I.seeElement("restaurant-item");
     I.click(locate("restaurant-item").first());

     const reviewNameInput = "Liam";
     const reviewDescInput = "Suasananya Asri";

     I.fillField("#review-username-input", reviewNameInput);
     I.fillField("#review-desc-input", reviewDescInput);

     I.click(locate("#submit-form"));

     I.waitForText(reviewNameInput, 10, ".review-name");
     I.waitForText(reviewDescInput, 10, ".review-desc");
});