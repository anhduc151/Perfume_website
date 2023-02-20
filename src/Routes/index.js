import Home from "../pages/Home";
import Style from "../pages/Style";
import Contact from "../pages/Contact";
import Men from "../pages/Men";
import Women from "../pages/Women";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProductPage from "../pages/ProductPage";
import ViewCart from "../pages/ViewCart";
import Checkout from "../pages/Checkout";
import Dashboard from "../admin/pages/Dashboard";
import Product from "../admin/pages/Product";
import Account from "../admin/pages/Account";
import Setting from "../admin/pages/Setting";
import Transaction from "../admin/pages/Transaction";
import StepTransaction from "../components/Transaction";
import Order from "../pages/Order";
import Result from "../components/Result";
import FavoriteProduct from "../pages/FavoriteProduct";
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/style", component: Style },
  { path: "/contact", component: Contact },
  { path: "/style/men", component: Men },
  { path: "/style/women", component: Women },
  { path: "/register", component: Register, layout: null },
  { path: "/login", component: Login, layout: null },
  { path: "/products/:id", component: ProductPage },
  { path: "/carts", component: ViewCart },
  { path: "/favorite", component: FavoriteProduct },
  { path: "/checkout", component: Checkout },
  { path: "/checkout/result", component: Result },
  { path: "/transaction/:id", component: StepTransaction },
  { path: "/user/order", component: Order },
  { path: "/admin/dashboard", component: Dashboard, layout: "admin" },
  { path: "/admin/transaction", component: Transaction, layout: "admin" },
  { path: "/admin/product", component: Product, layout: "admin" },
  { path: "/admin/account", component: Account, layout: "admin" },
  { path: "/admin/setting", component: Setting, layout: "admin" },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
