import logo from '../../assets/images/logo.png';
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
{/* <div className={styles.logoWrapper}> */}
<img src={logo} alt="logo" />
{/* </div> */}
      </div>
    </div>
  );
}
