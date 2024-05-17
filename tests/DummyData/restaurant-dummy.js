const restaurantData = [
	{
		id: 1,
		pictureId: "1",
		name: "restaurant 1",
		city: "City 1",
		address: "Street 1",
		rating: 5.5,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, porro!",
		categories: [{ name: "Category 1" }],
		menus: {
			foods: [{ name: "food 1" }],
			drinks: [{ name: "drink 1" }],
		},
		customerReviews: [
			{
				name: "Person 1",
				date: "10 January 1999",
				review: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
			},
		],
	},
	{
		id: 2,
		pictureId: "2",
		name: "restaurant 2",
		city: "City 2",
		address: "Street 2",
		rating: 5.5,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, porro!",
		categories: [{ name: "Category 2" }],
		menus: {
			foods: [{ name: "food 2" }],
			drinks: [{ name: "drink 2" }],
		},
		customerReviews: [
			{
				name: "Person 2",
				date: "20 February 2000",
				review: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
			},
		],
	},
     {
		id: 3,
		pictureId: "3",
		name: "restaurant 3",
		city: "City 3",
		address: "Street 3",
		rating: 5.5,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, porro!",
		categories: [{ name: "Category 3" }],
		menus: {
			foods: [{ name: "food 3" }],
			drinks: [{ name: "drink 3" }],
		},
		customerReviews: [
			{
				name: "Person 3",
				date: "30 March 2003",
				review: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
			},
		],
	},
];

class dataDummy {
	static getRestaurantDummy(id) {
		if (id !== undefined) {
			return restaurantData.find((item) => item.id === id);
		}
		return restaurantData;
	}
}

export default dataDummy;
