import ExplorePage from "../views/pages/explore-page";
import FavoritePage from "../views/pages/favorite-page";
import DetailPage from "../views/pages/detail-page";

const routes = {
     "/": ExplorePage,
     "/explore-page": ExplorePage,
     "/favorite-page": FavoritePage,
     "/detail-page/:id": DetailPage,
};

export default routes;