import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Confirm } from "notiflix";
import useTabs from "../../hooks/useTabs";
import useModal from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";
import { refresh, logout } from "../../redux/operations";
import Modal from "../Modal/Modal";
import Signin from "../Signin/Signin";
import Signup from "../Signup/Signup";
import logo from "../../assets/images/logo.png";
import styles from "./Header.module.css";
// MUI
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

const content = [
  {
    index: 0,
    tab: "Увійти",
  },
  {
    index: 1,
    tab: "Зареєструватися",
  },
];

export default function Header() {
  const { ref, onOpen, onClose } = useModal();
  const { currentItem, changeItem } = useTabs(0, content);
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(refresh());
    }
  }, [user, dispatch]);

  content[0].component = <Signin onClose={onClose} />;
  content[1].component = <Signup changeItem={changeItem} />;

  return (
    <>
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
                            "Ви точно бажаєте вийти з облікового запису?",
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
                <Link to="/">
                  <HomeIcon className={styles.headerIcon} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <Modal ref={ref} onClose={onClose} onOpen={onOpen}>
        <ul className={styles.tabList}>
          {content.map((section) => (
            <button
              className={`${styles.tabBtn} ${
                currentItem.index === section.index ? styles.activeTab : ""
              } `}
              key={section.index}
              onClick={() => changeItem(section.index)}
            >
              {section.tab}
            </button>
          ))}
        </ul>
        <div className={styles.tabContent}>{currentItem.component}</div>
      </Modal>
    </>
  );
}
