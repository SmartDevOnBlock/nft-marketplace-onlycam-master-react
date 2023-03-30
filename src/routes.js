import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "src/layouts/HomeLayout";
import DashboardLayout from "src/layouts/DashboardLayout";
import SearchItem from "./views/pages/Search/Index";
export const routes = [
  {
    exact: true,
    path: "/",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home")),
  },
  {
    exact: true,
    path: "/creators",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Creator/index")),
  },

  {
    exact: true,
    path: "/creators-list",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Creator/index")),
  },
  {
    guard: true,
    exact: true,
    path: "/profile",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Profile/Profile")),
  },
  {
    exact: true,
    path: "/nft",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/NftDetails/Nft")),
  },
  {
    exact: true,
    path: "/nft-collection",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/NftDetails/NftCollection")),
  },
  {
    exact: true,
    path: "/nft-report",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/NFTDetails")),
  },
  {
    exact: true,
    path: "/faq",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Faq/Faq")),
  },
  {
    exact: true,
    path: "/term",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/T&C/Term")),
  },
  {
    exact: true,
    path: "/arbitration-policy",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/Arbitrationploicy/ArbitrationPolicy")
    ),
  },
  {
    exact: true,
    path: "/user-policy",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/userpolicy/UserPolicy")),
  },
  {
    exact: true,
    path: "/privacy",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Privacy/Privacy")),
  },
  {
    exact: true,
    path: "/creator-privacy",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Privacy/CreatorPolicy")),
  },
  {
    exact: true,
    path: "/seller-buyer-privacy",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Privacy/SellerBuyerPolicy")),
  },
  {
    exact: true,
    path: "/notification",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/notification/Notification")),
  },
  {
    exact: true,
    path: "/activity",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Activity/index")),
  },
  {
    exact: true,
    path: "/author",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Author/Author")),
  },
  // {
  //   exact: true,
  //   path: "/create",
  //   layout: DashboardLayout,
  //   component: lazy(() => import("src/views/pages/Create-NFT/Create")),
  // },
  {
    guard: true,
    exact: true,
    path: "/create-nft",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Create-NFT/CreateNFT")),
  },
  {
    guard: true,
    exact: true,
    path: "/import-nft",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Create-NFT/ImportNft")),
  },
  {
    // guard: true,
    exact: true,
    path: "/resell-nft",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Create-NFT/ResellNFT")),
  },
  {
    exact: true,
    path: "/seller",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/TopSeller/TopSeller")),
  },
  {
    exact: true,
    path: "/erotic",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/EroticNFT/EroticNFT")),
  },
  {
    exact: true,
    path: "/erotic-list",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/EroticNFT/EroticNFT")),
  },
  {
    exact: true,
    path: "/auction",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/FeatureAuction/Auction")),
  },
  {
    exact: true,
    path: "/auction-list",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/FeatureAuction/Auction")),
  },
  {
    exact: true,
    path: "/search",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Search/Search")),
  },
  {
    exact: true,
    path: "/item",
    layout: HomeLayout,
    component: SearchItem,
  },
  {
    guard: true,
    exact: true,
    path: "/edit-profile",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/EditProfile/Editprofile")),
  },
  {
    exact: true,
    path: "/become-creator",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/BecomeCreator/BecomeCreator")
    ),
  },
  {
    guard: true,
    exact: true,
    path: "/creator-kyc",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/BecomeCreatorForm/CreatorForm")
    ),
  },
  {
    guard: true,
    exact: true,
    path: "/wallet-setting",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Wallet/Wallet")),
  },
  {
    exact: true,
    path: "/warning",
    component: lazy(() => import("src/views/pages/Modal18+/Warning")),
  },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/admin",
    component: lazy(() => import("src/views/pages/Admin/Admin")),
  },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/control",
    component: lazy(() => import("src/views/pages/AdminControls/Controls")),
  },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/fee-management",
    component: lazy(() => import("src/views/pages/AdminControls/FeeMangement")),
  },
  {
    exact: true,
    layout: DashboardLayout,
    path: "/add-subadmin",
    component: lazy(() => import("src/views/pages/AdminControls/SubAdmin")),
  },
  {
    exact: true,
    layout: HomeLayout,
    path: "/support",
    component: lazy(() => import("src/views/pages/Support/SupportForm")),
  },
  {
    exact: true,
    layout: HomeLayout,
    path: "/partner",
    component: lazy(() => import("src/views/pages/Support/PartnerForm")),
  },
  {
    exact: true,
    layout: HomeLayout,
    path: "/request-message",
    component: lazy(() =>
      import("src/views/pages/RequestBlockMessage/RequestMessage")
    ),
  },
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    component: () => <Redirect to="/404" />,
  },
];
