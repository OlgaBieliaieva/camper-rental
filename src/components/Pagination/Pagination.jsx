import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import styles from "./Pagination.module.css";

export default function Pagination({ pages, currentPage = 1, onPageChange }) {
  const paginationNumber = [];

  for (let i = 1; i <= pages; i += 1) {
    paginationNumber.push(i);
  }

  return (
    <div className={styles.pagWrapper}>
      <button className={styles.pageBtn} onClick={() => onPageChange(1)}>
        <KeyboardDoubleArrowLeftIcon />
      </button>
      <ul className={styles.pagList}>
        {paginationNumber.map((num, index) => (
          <li key={index}>
            <button
              className={`${styles.pageBtn} ${
                currentPage === num ? styles.active : ""
              }`}
              onClick={() => onPageChange(num)}
            >
              {num}
            </button>
          </li>
        ))}
      </ul>
      <button
        className={styles.pageBtn}
        onClick={() => onPageChange(paginationNumber.length)}
      >
        <KeyboardDoubleArrowRightIcon />
      </button>
    </div>
  );
}
