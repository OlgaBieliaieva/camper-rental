import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../Loader/Loader";
import styles from "./SharedLayout.module.css";

export default function SharedLayout() {
  return (
    <div className={styles.mainContainer}>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
