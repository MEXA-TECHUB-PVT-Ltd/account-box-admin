import Dashboard from "layouts/dashboard";
import ResetPass from "layouts/authentication/reset-password/cover";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Tycoon from "layouts/tycoons"
import TycoonProfile from "layouts/tycoons/components/tycoonProfile"
import Icon from "@mui/material/Icon";
import Users from "layouts/users";
import UsersProfile from "layouts/users/components/adminProfile"
import SettingsData from "layouts/settings"
import SubscriptionData from "layouts/subscriptions"
import SubscriptionDataProfile from "layouts/subscriptions/components/subscriptionProfile"
import SubscriptionPlan from "layouts/subscriptionsPlan"
import Shops from "layouts/shops"
import ShopsProfile from "layouts/shops/components/shopsProfile"
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Admins",
    key: "admins",
    icon: <Icon fontSize="small">admin_panel_settings_icon</Icon>,
    route: "/admins",
    component: <Users />,
  },
  {
    key: "adminProfile",
    icon: <Icon fontSize="small">people_icon</Icon>,
    route: "/adminProfile",
    component: <UsersProfile />,
  },
  {
    type: "collapse",
    name: "Tycoons",
    key: "tycoons",
    icon: <Icon fontSize="small">supervised_user_circle_icon</Icon>,
    route: "/tycoons",
    component: <Tycoon />,
  },
  {
    type: "collapse",
    name: "Shops",
    key: "shops",
    icon: <Icon fontSize="small">store_front_icon</Icon>,
    route: "/shops",
    component: <Shops />,
  },
  {
  
    key: "shopsProfile",
    icon: <Icon fontSize="small">store_front_icon</Icon>,
    route: "/shopsProfile",
    component: <ShopsProfile />,
  },
  {
    key: "tycoonProfile",
    icon: <Icon fontSize="small">hotel_icon</Icon>,
    route: "/tycoonProfile",
    component: <TycoonProfile />,
  },
  {
    type: "collapse",
    name: "Subscription Plan",
    key: "subscriptionPlan",
    icon: <Icon fontSize="small">all_inbox_icon</Icon>,
    route: "/subscriptionPlan",
    component: <SubscriptionPlan />,
  },
  {
    type: "collapse",
    name: "Subscriptions",
    key: "subscriptions",
    icon: <Icon fontSize="small">card_membership_icon</Icon>,
    route: "/subscriptions",
    component: <SubscriptionData />,
  },
  {
    // type: "collapse",
    // name: "SubscriptionsProfile",
    key: "subscriptionsProfile",
    icon: <Icon fontSize="small">card_membership_icon</Icon>,
    route: "/subscriptionsProfile",
    component: <SubscriptionDataProfile />,
  },
  // {
  //   type: "collapse",
  //   name: "Earnings",
  //   key: "earnings",
  //   icon: <Icon fontSize="small">monetization_on_icon</Icon>,
  //   route: "/earnings",
  //   component: <Dashboard />,
  // },
  {
    type: "collapse",
    name: "Settings",
    key: "settings",
    icon: <Icon fontSize="small">settings_icon</Icon>,
    route: "/settings",
    component: <SettingsData />,
  },
  {
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    key: "reset-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/reset-password",
    component: <ResetPass />,
  },
];

export default routes;
