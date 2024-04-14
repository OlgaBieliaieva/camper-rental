import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.contentWrapper}>
        <h1 className={styles.mainTitle}>
          Оренда кемперів
          <br />
          для активного відпочинку
        </h1>
        <Link to="/catalog" className={styles.mainLink}>
          Дивитися всі пропозиції
          <ArrowForwardIcon className={styles.linkIcon} />
        </Link>
      </div>
    </div>
  );
}
