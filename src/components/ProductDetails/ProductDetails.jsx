import useTabs from "../../hooks/useTabs";
import Features from "../Features/Features";
import Reviews from "../Reviews/Reviews";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import StarIcon from "../Icons/StarIcon";
import MapPinIcon from "../Icons/MapPinIcon";
import styles from "./ProductDetails.module.css";

const content = [
  {
    index: 0,
    tab: "Features",
  },
  {
    index: 1,
    tab: "Reviews",
  },
];

export default function ProductDetails({
  product,
  onClose,
  showDetailsHandler,
}) {
  const { currentItem, changeItem } = useTabs(0, content);
  content[0].component = <Features product={product} onClose={onClose}/>;
  content[1].component = <Reviews product={product} onClose={onClose}/>;

  function closeHandler() {
    showDetailsHandler(false);
    onClose();
  }

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.cardTitle}>
        <div className={styles.titleRow}>
          <p className={styles.productTitle}>{product.name}</p>
          <button
            type="button"
            onClick={closeHandler}
            className={styles.closeBtn}
          >
            <CloseSharpIcon />
          </button>
        </div>
        <div className={styles.subtitleRow}>
          <div className={styles.rate}>
            <StarIcon className={styles.rateIcon} />
            <p>
              <span>{product.rating}</span>({product.reviews.length} Reviews)
            </p>
          </div>
          <div className={styles.location}>
            <MapPinIcon className={styles.locationIcon} />
            <p>{product.location}</p>
          </div>
        </div>
        <p className={styles.productTitle}>&euro;{product.price}.00</p>
      </div>
      <div className={styles.contentWrapper}>
        <ul className={styles.gallery}>
          {product.gallery.map((item, index) => (
            <li key={index}>
              <div className={styles.imgWrapper}>
                <img className={styles.cardImg} src={item} alt={product.name} />
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.description}>{product.description}</p>
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
    </div>
  );
}
