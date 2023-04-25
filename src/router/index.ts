import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/components/HomeView.vue";
import HotspotPageView from "@/components/HotspotPageView.vue";
import SmallLinkListView from "@/components/SmallLinkListView.vue";
import InformationPage from "@/components/InformationPage.vue";
import OverviewPage from "@/components/OverviewPage.vue";
import ErrorPageView from "@/components/ErrorPageView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/page/information",
    name: "InformationPage",
    props: true,
    component:InformationPage
  },
  // dynamic segments start with a colon
  {
    path: "/page/:pageName",
    name: "hotspotPage",
    props: true,
    component: HotspotPageView
  },
  {
    path: "/page/:pageName/link/:linkText",
    name: "SmallLinkListView",
    props: true,
    component: SmallLinkListView
  },

  {
    path: "/page/:pageName/overview",
    name: "OverviewPage",
    props: true,
    component: OverviewPage
  },
  {
    path: "/error",
    name: "errorPage",
    component: ErrorPageView
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    redirect: "/"
    // component: NotFound
    // component: () => import("../views/PageNotFound.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
