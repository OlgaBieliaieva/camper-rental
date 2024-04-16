import useTabs from "../../hooks/useTabs";
import Signin from "../Signin/Signin";
import Signup from "../Signup/Signup";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import styles from "./Auth.module.css";

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

export default function Auth({ onClose }) {
  const { currentItem, changeItem } = useTabs(0, content);
  content[0].component = <Signin onClose={onClose} />;
  content[1].component = <Signup changeItem={changeItem} />;

  return (
    <div className={styles.authWrapper}>
      <button type="button" onClick={onClose} className={styles.closeBtn}>
        <CloseSharpIcon />
      </button>
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
    </div>
  );
}
