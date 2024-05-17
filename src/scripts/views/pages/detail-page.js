import UrlParser from "../../routes/url-parser";
import DetailPageHandler from "../../utils/detail-page-handler";

const DetailPage = {
	async render() {
		return `
               <section class="detail-section">
                    <h2 class="head-text">Detail Restoran</h2>
                    <restaurant-detail></restaurant-detail>
               </section>
          `;
	},

	async afterRender() {
		const url = UrlParser.parseActiveUrlWithoutCombiner();
			await DetailPageHandler.setNewRestaurantDetails(url.id);
	},
};

export default DetailPage;
