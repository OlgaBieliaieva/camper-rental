import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsLoading,
  selectError,
  selectAllCampers,
  selectCurrentUser,
} from "../../redux/selectors";
import { fetchAllCampers } from "../../redux/operations";
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import ProductList from "../../components/ProductList/ProductList";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Favorites.module.css";

const pagOpts = {
  limit: 4,
  defaultPage: 1,
};

export default function Favorites() {
  const [page, setPage] = useState(pagOpts.defaultPage);
  const campers = useSelector(selectAllCampers);
  const user = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCampers());
  }, [page, dispatch]);

  return isLoading && !error ? (
    <Loader />
  ) : (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.sideBar}></div>
          <div className={styles.contentSpace}>
            <ProductList
              campers={campers.filter((camper) =>
                user?.favorites?.includes(camper.id)
              )}
            />
            <Pagination
              pages={Math.ceil(user?.favorites?.length / pagOpts.limit)}
              currentPage={page}
              onPageChange={setPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
