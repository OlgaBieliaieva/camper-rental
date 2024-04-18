import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCampers, selectCampersCount } from "../../redux/selectors";
import { fetchAllCampers, fetchCampers } from "../../redux/operations";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
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

  function getFilteredCampers(values) {
    console.log(values);
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <section className={styles.sideBar}>
            <h2>Filters</h2>
            <Filters filterCampers={getFilteredCampers} />
          </section>
          <section className={styles.contentSpace}>
            <h2 className={styles.contentTitle}>
              {campersCount} campers available
            </h2>
            <div className={styles.content}>
              <ProductList campers={campers} />
              <Pagination
                pages={Math.ceil(campersCount / pagOpts.limit)}
                currentPage={page}
                onPageChange={setPage}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
