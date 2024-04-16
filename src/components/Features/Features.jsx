import Chip from "../Chip/Chip";
import ACIcon from "../Icons/ACIcon";
import BedIcon from "../Icons/BedIcon";
import EngineIcon from "../Icons/EngineIcon";
import KitchenIcon from "../Icons/KitchenIcon";
import TransmissionIcon from "../Icons/TransmissionIcon";
import UsersIcon from "../Icons/UsersIcon";
import CDIcon from "../Icons/CDIcon";
import HobIcon from "../Icons/HobIcon";
import RadioIcon from "../Icons/RadioIcon";
import styles from "./Features.module.css";

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
    name: "airConditioner",
    icon: <ACIcon className={styles.detailsIcon} />,
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
    name: "CD",
    icon: <CDIcon className={styles.detailsIcon} />,
  },
  {
    name: "radio",
    icon: <RadioIcon className={styles.detailsIcon} />,
  },
  {
    name: "hob",
    icon: <HobIcon className={styles.detailsIcon} />,
  },
];

export default function Features({ product }) {
  return (
    <div className={styles.featuresContainer}>
      <div className={styles.featuresWrapper}>
        <ul className={styles.chipsList}>
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
                    {item.name === "adults" ||
                    item.name === "beds" ||
                    item.name === "hob" ? (
                      <span>
                        {item.name === "adults"
                          ? `${product.adults} ${item.name}`
                          : item.name === "beds"
                          ? `${product.details.beds} ${item.name}`
                          : `${product.details.hob} ${item.name}`}
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
        <ul className={styles.propsList}></ul>
      </div>
    </div>
  );
}
