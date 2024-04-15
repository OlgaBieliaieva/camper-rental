import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";

export default function ProductList({ campers }) {
  return (
    <ul className={styles.list}>
      {campers?.map((item) => (
        <li key={item.id}>
          <ProductCard product={item} />
        </li>
      ))}
    </ul>
  );
}
