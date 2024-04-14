import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { refresh } from "../../redux/operations";
import SharedLayout from "../SharedLayout/SharedLayout";

import styles from "./App.module.css";

const Home = lazy(() => import("../../pages/Home/Home"));
const Catalog = lazy(() => import("../../pages/Catalog/Catalog"));
const Favorites = lazy(() => import("../../pages/Favorites/Favorites"));

export default function App() {
  // const { user } = useAuth();
  // const dispatch = useDispatch();
  // console.log(user);

  // useEffect(() => {
  //   if (!user) {
  //     dispatch(refresh());
  //   }
  // }, [user, dispatch]);
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
