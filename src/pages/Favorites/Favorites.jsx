import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  selectFilteredCampers,
  selectIsLoading,
  selectError,
  selectCurrentUser,
} from "../../redux/selectors";
import { filter } from "../../redux/appSlice";
import { fetchAllCampers } from "../../redux/operations";
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
import ProductList from "../../components/ProductList/ProductList";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Favorites.module.css";

const pagOpts = {
  limit: 4,
  defaultPage: 1,
};

let params = {};

export default function Favorites() {
  const [page, setPage] = useState(pagOpts.defaultPage);
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredCampers = useSelector(selectFilteredCampers);
  const user = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
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
            {isLoading && !error ? (
              <Loader />
            ) : (
              <>
                {user?.favorites?.length <= 0 ? (
                  <p>You have no favorite camper</p>
                ) : (
                  <>
                    <h2 className={styles.contentTitle}>
                      {
                        filteredCampers.filter((camper) =>
                          user?.favorites?.includes(camper.id)
                        ).length
                      }
                      &#160;campers available
                    </h2>
                    <div className={styles.content}>
                      <ProductList
                        campers={filteredCampers
                          .filter((camper) =>
                            user?.favorites?.includes(camper.id)
                          )
                          .slice(
                            page * pagOpts.limit - pagOpts.limit,
                            page * pagOpts.limit
                          )}
                      />
                      <Pagination
                        pages={Math.ceil(
                          filteredCampers.filter((camper) =>
                            user?.favorites?.includes(camper.id)
                          ).length / pagOpts.limit
                        )}
                        currentPage={page}
                        onPageChange={setPage}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
