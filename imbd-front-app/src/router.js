import { createRouter, createWebHistory } from "vue-router";
import LoginUser from "./pages/Auth/LoginUser.vue";
import RegUser from "./pages/Auth/RegUser.vue";
import NotFound from "./pages/NotFound.vue";
import HomePage from "./pages/HomePage/HomePage.vue";
import FavoriteList from "./pages/Favorite/FavoriteList.vue";
import AdminSettingsMain from "./pages/AdminSettings/AdminSettingsMain.vue";
import ShowDetails from "./pages/ShowDetails/ShowDetails.vue";
import DirectorDetails from "./pages/Director/DirectorDetails.vue"
import ActorDetails from "./pages/Director/ActorDetails.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/login", component: LoginUser },
    { path: "/registration", component: RegUser },
    { path: "/favorite", component: FavoriteList },
    { path: "/settings", component: AdminSettingsMain },
    { path: "/home", component: HomePage, name: 'home-page' },
    {path: "/director/:directorId", component: DirectorDetails, props: true},
    {path: "/actor/:actorId", component: ActorDetails, props: true},
    { path: "/:notFound(.*)", component: NotFound },
    { path: "/show/details/:type/:id", name: "ShowDetails", component: ShowDetails, props: true },
  ],
});

export default router;
