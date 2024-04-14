import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import SharedLayout from "../SharedLayout/SharedLayout";

import styles from "./App.module.css";

const Home = lazy(() => import('../../pages/Home/Home'));
const Catalog = lazy(()=> import('../../pages/Catalog/Catalog'))

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home/>}/>
        <Route path="/catalog" element={<Catalog/>}/>
        <Route path="*" element={<Home/>} />
      </Route>
    </Routes>
  );
}
