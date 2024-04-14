import { RotatingLines } from "react-loader-spinner";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <RotatingLines
        height="200"
        width="200"
        strokeColor="grey"
        ariaLabel="otating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
