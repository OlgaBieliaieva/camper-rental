import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchAllCampers } from "../../redux/operations";
import {
  selectFilteredCampers,
  selectError,
  selectIsLoading,
} from "../../redux/selectors";
import { filter } from "../../redux/appSlice";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
import Loader from "../../components/Loader/Loader";
import ProductList from "../../components/ProductList/ProductList";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Catalog.module.css";

const pagOpts = {
  limit: 4,
  defaultPage: 1,
};
let params = {};

export default function Catalog() {
  const [page, setPage] = useState(pagOpts.defaultPage);
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredCampers = useSelector(selectFilteredCampers);
  const error = useSelector(selectError);
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    params = {};
    for (const [key, value] of searchParams.entries()) {
      key !== "equipment"
        ? (params[key] = value)
        : params.equipment
        ? params.equipment.push(value)
        : (params.equipment = [value]);
    }
    dispatch(fetchAllCampers());
    dispatch(filter({ ...params }));
  }, [searchParams, dispatch]);

  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <section className={styles.sideBar}>
            <h2>Filters</h2>
            <Filters
              createSearchParams={setSearchParams}
              onPageChange={setPage}
            />
          </section>
          <section className={styles.contentSpace}>
            {loading && !error ? (
              <Loader />
            ) : (
              <>
                <h2 className={styles.contentTitle}>
                  {filteredCampers.length}&#160;campers available
                </h2>
                <div className={styles.content}>
                  <ProductList
                    campers={filteredCampers.slice(
                      page * pagOpts.limit - pagOpts.limit,
                      page * pagOpts.limit
                    )}
                  />
                  <Pagination
                    pages={Math.ceil(filteredCampers.length / pagOpts.limit)}
                    currentPage={page}
                    onPageChange={setPage}
                  />
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
