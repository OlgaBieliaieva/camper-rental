import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Confirm } from "notiflix";
import useModal from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";
import { refresh, logout } from "../../redux/operations";
import Modal from "../Modal/Modal";
import Auth from "../Auth/Auth";
import logo from "../../assets/images/logo.png";
import styles from "./Header.module.css";
// MUI
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

export default function Header({ cls }) {
  const { ref, onOpen, onClose } = useModal();
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(refresh());
    }
  }, [user, dispatch]);

  return (
    <>
      <header className={`${styles.headerContainer} ${styles[cls]}`}>
        <div className={styles.headerWrapper}>
          <img src={logo} alt="logo" />
          <div className={styles.contactWrapper}>
            <PhoneInTalkIcon className={styles.headerIcon} />
            <a href="tel:+380505000505">+38 (050) 500 05 05</a>
          </div>
          <nav>
            <ul className={styles.menu}>
              <li className={styles.menuItem}>
                <button
                  type="button"
                  onClick={
                    user?.id ? () => navigate("/favorites") : () => onOpen()
                  }
                >
                  {user?.favorites.length > 0 ? (
                    <FavoriteIcon className={styles.headerIcon} />
                  ) : (
                    <FavoriteBorderIcon className={styles.headerIcon} />
                  )}
                </button>
              </li>
              <li className={styles.menuItem}>
                <button
                  type="button"
                  onClick={
                    user?.id
                      ? () =>
                          Confirm.show(
                            "Вихід з акаунту",
                            "Ви дійсно бажаєте вийти з облікового запису?",
                            "Так",
                            "Ні",
                            function okCb() {
                              dispatch(logout());
                            },
                            {
                              width: "280px",
                              borderRadius: "8px",
                            }
                          )
                      : () => onOpen()
                  }
                >
                  {user?.id ? (
                    <PersonIcon className={styles.headerIcon} />
                  ) : (
                    <PersonOutlineOutlinedIcon className={styles.headerIcon} />
                  )}
                </button>
              </li>
              <li className={styles.menuItem}>
                <Link to="/catalog">
                  <FormatListNumberedIcon className={styles.headerIcon} />
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link to="/">
                  <HomeIcon className={styles.headerIcon} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <Modal ref={ref} onClose={onClose} onOpen={onOpen}>
        <Auth onClose={onClose} />
      </Modal>
    </>
  );
}
