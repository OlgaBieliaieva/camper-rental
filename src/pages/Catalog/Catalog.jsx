import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCampers, selectCampersCount } from "../../redux/selectors";
import { fetchAllCampers, fetchCampers } from "../../redux/operations";
import Header from "../../components/Header/Header";
import ProductList from "../../components/ProductList/ProductList";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Catalog.module.css";

const pagOpts = {
  limit: 4,
  defaultPage: 1,
};

export default function Catalog() {
  const [page, setPage] = useState(pagOpts.defaultPage);
  const campers = useSelector(selectCampers);
  const campersCount = useSelector(selectCampersCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCampers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCampers(page));
  }, [page, dispatch]);

  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.sideBar}></div>
          <div className={styles.contentSpace}>
            <ProductList campers={campers} />
            <Pagination
              pages={Math.ceil(campersCount / pagOpts.limit)}
              currentPage={page}
              onPageChange={setPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
