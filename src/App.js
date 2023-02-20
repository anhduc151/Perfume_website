import "./assets/style/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import { Fragment, useEffect } from "react";
import "aos/dist/aos.css";
import DefaultLayout from "./Layouts/DefaultLayout";
import { publicRoutes } from "./Routes/index.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { checkQuantity, checkTotalProducts, checkUser } from "./redux/actions";
import AdminLayout from "./admin/AdminLayout";
import PageNotFound from "./pages/NotFound";
function App() {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token")) || {};
  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/v1/auth/current_user",
        data: token,
        headers: { "Content-Type": "application/json" },
      });
      dispatch(checkUser(response.data.data.result));
    };
    getCurrentUser();
  }, []);

  // Get products cart from LocalStorage
  const productsCart = JSON.parse(localStorage.getItem("carts")) || [];
  useEffect(() => {
    dispatch(checkQuantity(productsCart));
  }, [productsCart]);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout =
            route.layout === null
              ? Fragment
              : route.layout === "admin"
              ? AdminLayout
              : DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
         <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
