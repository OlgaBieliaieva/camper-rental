import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCampers, selectCurrentUser } from "../../redux/selectors";
import { fetchCampers } from "../../redux/operations";
import Header from "../../components/Header/Header";
import ProductList from "../../components/ProductList/ProductList";
import styles from "./Catalog.module.css";

export default function Catalog() {
  const campers = useSelector(selectCampers);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.sideBar}></div>
          <div className={styles.contentSpace}>
            <ProductList campers={campers} fav={user?.favorites} />
          </div>
        </div>
      </main>
    </div>
  );
}
