import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../../hooks/useModal";
import { updateUser } from "../../redux/operations";
import { selectCurrentUser } from "../../redux/selectors";
import Modal from "../Modal/Modal";
import Auth from "../Auth/Auth";
import ProductDetails from "../ProductDetails/ProductDetails";
import Chip from "../Chip/Chip";
import HeartIcon from "../Icons/HeartIcon";
import StarIcon from "../Icons/StarIcon";
import MapPinIcon from "../Icons/MapPinIcon";
import ACIcon from "../Icons/ACIcon";
import BedIcon from "../Icons/BedIcon";
import EngineIcon from "../Icons/EngineIcon";
import KitchenIcon from "../Icons/KitchenIcon";
import TransmissionIcon from "../Icons/TransmissionIcon";
import UsersIcon from "../Icons/UsersIcon";
import styles from "./ProductCard.module.css";

const details = [
  {
    name: "adults",    
    icon: <UsersIcon className={styles.detailsIcon} />,
  },
  {
    name: "transmission",    
    icon: <TransmissionIcon className={styles.detailsIcon} />,
  },
  {
    name: "engine",   
    icon: <EngineIcon className={styles.detailsIcon} />,
  },
  {
    name: "kitchen",   
    icon: <KitchenIcon className={styles.detailsIcon} />,
  },
  {
    name: "beds",   
    icon: <BedIcon className={styles.detailsIcon} />,
  },
  {
    name: "airConditioner",   
    icon: <ACIcon className={styles.detailsIcon} />,
  },
];

export default function ProductCard({ product }) {
  const [showDetails, setShowDetails] = useState(false);
  const { ref, onOpen, onClose } = useModal();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  function toggleFav(id) {
    if (!user) {
      onOpen();
    } else {
      let fav = [...user.favorites];
      if (user.favorites.includes(id)) {
        const index = user.favorites.findIndex((i) => i === id);
        fav.splice(index, 1);
        dispatch(updateUser({ ...user, favorites: [...fav] }));
      } else {
        dispatch(updateUser({ ...user, favorites: [...user.favorites, id] }));
      }
    }
  }

  function detailsHandler() {
    setShowDetails(true);
    onOpen();
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imgWrapper}>
        <img
          className={styles.cardImg}
          src={product.gallery[0]}
          alt={product.name}
        />
      </div>
      <div className={styles.cardContentWrapper}>
        <div className={styles.cardTitle}>
          <div className={styles.titleRow}>
            <p>{product.name}</p>
            <div className={styles.wrapper}>
              <p>&euro;{product.price}.00</p>
              <button type="button" onClick={() => toggleFav(product.id)}>
                <HeartIcon
                  className={`${
                    user?.favorites?.length > 0 &&
                    user?.favorites?.includes(product.id)
                      ? styles.fav
                      : styles.notFav
                  }`}
                />
              </button>
            </div>
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
        </div>
        <p className={styles.description}>{product.description}</p>
        <ul className={styles.details}>
          {details.map((item, index) => {
            if (item.name === "kitchen" && product.details.kitchen <= 0) {
              return "";
            } else if (
              item.name === "airConditioner" &&
              product.details.airConditioner <= 0
            ) {
              return "";
            } else {
              return (
                <li key={index}>
                  <Chip>
                    {item.icon}
                    {item.name === "adults" || item.name === "beds" ? (
                      <span>
                        {item.name === "adults"
                          ? `${product.adults} ${item.name}`
                          : `${product.details.beds} ${item.name}`}
                      </span>
                    ) : (
                      ""
                    )}
                    {item.name === "transmission" || item.name === "engine" ? (
                      <span style={{ textTransform: "capitalize" }}>
                        {product[item.name]}
                      </span>
                    ) : (
                      ""
                    )}
                    {item.name === "kitchen" ? (
                      <span style={{ textTransform: "capitalize" }}>
                        {item.name}
                      </span>
                    ) : (
                      ""
                    )}
                    {item.name === "airConditioner" ? (
                      <span style={{ textTransform: "uppercase" }}>ac</span>
                    ) : (
                      ""
                    )}
                  </Chip>
                </li>
              );
            }
          })}
        </ul>
        <button type="button" className={styles.btn} onClick={detailsHandler}>
          Show more
        </button>
      </div>
      <Modal ref={ref} onClose={onClose} onOpen={onOpen}>
        {showDetails ? (
          <ProductDetails
            product={product}
            onClose={onClose}
            showDetailsHandler={setShowDetails}
          />
        ) : (
          <Auth onClose={onClose} />
        )}
      </Modal>
    </div>
  );
}
