import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import styles from "./Header.module.css";
// MUI
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

export default function Header() {
  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.headerWrapper}>
          <img src={logo} alt="logo" />
          <div className={styles.contactWrapper}>
            <PhoneInTalkIcon className={styles.headerIcon} />
            <a href="tel:+380505000505">+38 (050) 500 05 05</a>
          </div>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <FavoriteBorderIcon className={styles.headerIcon} />
            </li>
            <li className={styles.menuItem}>
              <PersonOutlineOutlinedIcon className={styles.headerIcon} />
            </li>
            <li className={styles.menuItem}>
              <Link to='/'>
                <HomeIcon className={styles.headerIcon} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
