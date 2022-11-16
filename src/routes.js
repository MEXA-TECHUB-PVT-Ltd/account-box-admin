import Dashboard from "layouts/dashboard";
import ResetPass from "layouts/authentication/reset-password/cover";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Dispachers from "layouts/dispachers"
import DispachersProfile from "layouts/dispachers/components/dispacherProfile"
import VehicleProfile from "layouts/vehicles/components/vehicleProfile"
import Tycoon from "layouts/tycoons"
import TycoonProfile from "layouts/tycoons/components/tycoonProfile"
import HotelsProfile from "layouts/hotels/components/hotelProfile"
import Guests from "layouts/guests"
import Drivers from "layouts/drivers"
import DriversProfile from "layouts/drivers/components/driverProfile"
import Orders from "layouts/orders"
import OrdersProfile from "layouts/orders/components/orderProfile"
import Icon from "@mui/material/Icon";
import Users from "layouts/users";
import Vehicles from "layouts/vehicles";
import GuestsProfile from "layouts/guests/components/guestProfile"
import Transactions from "layouts/transactions"
import UsersProfile from "layouts/users/components/adminProfile"
import TransactionsProfile from "layouts/transactions/components/transactionProfile"
import SettingsData from "layouts/settings"
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
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">admin_panel_settings_icon</Icon>,
    route: "/users",
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
    name: "TycoonsProfile",
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
    component: <Drivers />,
  },
  {
    key: "driversProfile",
    icon: <Icon fontSize="small">directions_car_icon</Icon>,
    route: "/driversProfile",
    component: <DriversProfile />,
  },
  {
    type: "collapse",
    name: "Subscriptions",
    key: "subscriptions",
    icon: <Icon fontSize="small">card_membership_icon</Icon>,
    route: "/subscriptions",
    component: <Dispachers />,
  },
  {

    key: "dispachersProfile",
    icon: <Icon fontSize="small">business_icon</Icon>,
    route: "/dispachersProfile",
    component: <DispachersProfile />,
  },
  {
    type: "collapse",
    name: "Earnings",
    key: "earnings",
    icon: <Icon fontSize="small">monetization_on_icon</Icon>,
    route: "/earnings",
    component: <Guests />,
  },
  {
   
    key: "guestsProfile",
    icon: <Icon fontSize="small">groups_icon</Icon>,
    route: "/guestsProfile",
    component: <GuestsProfile />,
  },
  // {
  //   type: "collapse",
  //   name: "Vehicles",
  //   key: "vehicles",
  //   icon: <Icon fontSize="small">local_taxi_icon</Icon>,
  //   route: "/vehicles",
  //   component: <Vehicles />,
  // },
  // {
  //   key: "vehiclesProfile",
  //   icon: <Icon fontSize="small">business_icon</Icon>,
  //   route: "/vehiclesProfile",
  //   component: <VehicleProfile />,
  // },
  // {
  //   type: "collapse",
  //   name: "Orders",
  //   key: "orders",
  //   icon: <Icon fontSize="small">people_icon</Icon>,
  //   route: "/orders",
  //   component: <Orders />,
  // },
  // {
  //   key: "ordersProfile",
  //   icon: <Icon fontSize="small">people_icon</Icon>,
  //   route: "/ordersProfile",
  //   component: <OrdersProfile />,
  // },
  // {
  //   type: "collapse",
  //   name: "Transactions",
  //   key: "transactions",
  //   icon: <Icon fontSize="small">receipt_icon</Icon>,
  //   route: "/transactions",
  //   component: <Transactions />,
  // },
  // {
  //   key: "transactionsProfile",
  //   icon: <Icon fontSize="small">people_icon</Icon>,
  //   route: "/transactionsProfile",
  //   component: <TransactionsProfile />,
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
